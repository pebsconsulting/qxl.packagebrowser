(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.data.IProxy": {
        "require": true
      },
      "qx.data.MRemoteBinding": {
        "require": true
      },
      "qx.util.Validate": {
        "construct": true
      },
      "qx.bom.Window": {
        "construct": true
      },
      "qx.io.channel.transport.PostMessage": {
        "construct": true
      },
      "qx.io.channel.Channel": {
        "construct": true
      },
      "qx.util.Uri": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2018 The authors
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Boulanger (cboulanger)
  
  ************************************************************************ */

  /**
   * A proxy for an application running in a different browser window or tab
   *
   */
  qx.Class.define("qx.ui.window.RemoteApplication", {
    extend: qx.core.Object,
    implement: qx.data.IProxy,
    include: [qx.data.MRemoteBinding],

    /**
     * Constructor
     * @param uri {String}
     *    The uri of the remote web application, usually a URL, can also be the
     *    name of a subdirectory of the parent directory of the running
     *    application.
     * @param config {Object}
     *    Window configuration, see {@link  qx.bom.Window#open}.
     * @param name {String}
     *    An option name/id of thw window, which must be unique
     */
    construct: function construct(uri, config, name) {
      qx.core.Object.constructor.call(this);
      this.__P_438_0 = uri;

      var url = this._computeApplicationUrl(uri);

      qx.util.Validate.checkUrl(url);

      var window_name = name || "window-" + this._createUuid();

      config = this._computeWindowConfig(config);
      this.__P_438_1 = qx.bom.Window.open(url, window_name, config); // close popup window when main application unloads

      window.addEventListener("beforeunload", () => {
        if (!this.isClosed()) {
          this.close();
        }

        this.stopPropertySync();
        this.__P_438_1 = null;
      });
      var transport = new qx.io.channel.transport.PostMessage(this.__P_438_1, window_name);
      this.__P_438_2 = new qx.io.channel.Channel(transport);
    },
    members: {
      __P_438_2: null,
      __P_438_1: null,

      /**
       * Returns the map that is passed into {@link qx.bom.Window#open}, using
       * default values and overriding them with values in the map.
       * @param config {Object|undefined}
       * @return {Object}
       */
      _computeWindowConfig(config = {}) {
        var defaultConfig = this._getWindowDefaultConfig();

        for (var key in defaultConfig) {
          if (config[key] === undefined) {
            config[key] = defaultConfig[key];
          }
        }

        return config;
      },

      /**
       * Exposes the internal window object
       * @return {Window}
       */
      getWindow: function getWindow() {
        return this.__P_438_1;
      },

      /**
       * Returns default values for {@link qx.bom.Window#open}. Can be overridden
       * to set other values.
       * @return {Object}
       */
      _getWindowDefaultConfig() {
        return {
          width: 800,
          height: 600,
          dependent: true,
          menubar: false,
          status: false,
          scrollbars: false,
          toolbar: false
        };
      },

      /**
       * Given an identifier (either a complete URL or an application name as stated
       * in compile.json), return the URL to the application.
       * @param uri
       * @return {String}
       * @private
       */
      _computeApplicationUrl(uri) {
        if (!uri.startsWith("http")) {
          // if this isn't a valid URL, prepend parente directory
          var appUrl = qx.util.Uri.parseUri(location.href);
          var parentDir = appUrl.protocol + "://" + appUrl.authority + appUrl.directory.split("/").slice(0, -2).join("/");
          uri = parentDir + "/" + uri;
        }

        return uri;
      },

      /**
       * Interface method, see {@link qx.data.IProxy#startPropertySync}
       * @param options see {@link qx.data.IProxy#_syncProperties}
       */
      startPropertySync: function startPropertySync(options) {
        this._syncProperties(this.__P_438_2, options);
      },

      /**
       * Returns the uri of the remote application
       * @return {String}
       */
      getUri: function getUri() {
        return this.__P_438_0;
      },
      open: function open() {
        this.__P_438_1.focus();
      },
      close: function close() {
        this.__P_438_1.close();
      },
      isClosed: function isClosed() {
        return qx.bom.Window.isClosed(this.__P_438_1);
      }
    },
    destruct: function destruct() {
      qx.ui.window.RemoteApplication.prototype.$$destructor.base.call(this);

      if (!qx.bom.Window.isClosed(this.__P_438_1)) {
        this.__P_438_1.close();
      }

      this._disposeObjects("__P_438_1", "__P_438_2");
    }
  });
  qx.ui.window.RemoteApplication.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=RemoteApplication.js.map?dt=1613267131139