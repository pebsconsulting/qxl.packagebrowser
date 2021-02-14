(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.window.Window": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.Grow": {
        "construct": true
      },
      "qx.xml.Document": {},
      "qookery.Qookery": {},
      "qx.lang.Object": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /*
  	Qookery - Declarative UI Building for Qooxdoo
  
  	Copyright (c) Ergobyte Informatics S.A., www.ergobyte.gr
  
  	Licensed under the Apache License, Version 2.0 (the "License");
  	you may not use this file except in compliance with the License.
  	You may obtain a copy of the License at
  
  		http://www.apache.org/licenses/LICENSE-2.0
  
  	Unless required by applicable law or agreed to in writing, software
  	distributed under the License is distributed on an "AS IS" BASIS,
  	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  	See the License for the specific language governing permissions and
  	limitations under the License.
  */

  /**
   * Window implementation that uses a Qookery form for its contents
   */
  qx.Class.define("qookery.impl.FormWindow", {
    extend: qx.ui.window.Window,

    /**
     * Create a new Qookery form window
     *
     * @param title { String } title of the window
     * @param icon { uri } icon of the window
     * @param options {Map ? null} options as defined below
     * @param thisArg {Object ? null} an object to set as <code>this</code> for callbacks
     *
     * @option caption {String ? null} a caption for the created Window instance
     * @option icon {String ? null} an icon for the created Window instance
     * @option onClose {Function ? null} a callback that will receive the form's result property when window is closed
     */
    construct: function construct(caption, icon, options, thisArg) {
      qx.ui.window.Window.constructor.call(this, caption, icon);
      this.setLayout(new qx.ui.layout.Grow());
      this.set({
        modal: true,
        showMinimize: false,
        showMaximize: false,
        contentPadding: 10
      });

      if (options) {
        if (options["icon"] !== undefined) this.setIcon(options["icon"]);
        if (options["caption"] !== undefined) this.setCaption(options["caption"]);
        if (options["allowClose"] !== undefined) this.setAllowClose(options["allowClose"]);
        if (options["onClose"] !== undefined) this.__P_7_0 = options["onClose"].bind(thisArg);
        if (options["showMaximize"] !== undefined) this.setShowMaximize(options["showMaximize"]);
        if (options["contentPadding"] !== undefined) this.setContentPadding(options["contentPadding"]);
        if (options["openMaximized"] === true) this.maximize();
      }
    },
    members: {
      __P_7_1: null,
      __P_7_2: false,
      __P_7_0: null,

      /**
       * Create and open Qookery window
       *
       * @param formXml {String} the XML source of the form to create
       * @param model {Object} an initial model to set, or <code>null</code> if not needed
       */
      createAndOpen: function createAndOpen(formXml, model, variables) {
        var xmlDocument = qx.xml.Document.fromString(formXml);
        var parser = qookery.Qookery.createFormParser(this.__P_7_3(variables));

        try {
          this.__P_7_1 = parser.parseXmlDocument(xmlDocument);
          this.__P_7_2 = true;
          this.openForm(this.__P_7_1, model);
        } catch (e) {
          this.error("Error creating form window", e);
        } finally {
          parser.dispose();
        }
      },
      openForm: function openForm(formComponent, model) {
        this.__P_7_1 = formComponent;
        this.getContentElement().setAttribute("qkid", formComponent.getId());
        this.addListenerOnce("appear", function (event) {
          formComponent.focus();
        }, this);
        formComponent.addListenerOnce("close", function (event) {
          formComponent.setModel(null);
          if (this.__P_7_0) this.__P_7_0(event.getData());
          this.destroy();
        }, this);
        formComponent.addListener("changeTitle", function (event) {
          if (event.getData()) this.setCaption(event.getData());
        }, this);

        if (!this.getCaption()) {
          var formTitle = formComponent.getTitle();
          if (formTitle) this.setCaption(formTitle);else this.setCaption(this._getFallbackCaption());
        }

        var formIcon = formComponent.getIcon();
        if (formIcon && !this.getIcon()) this.setIcon(formIcon);
        if (model) formComponent.setModel(model);
        this.add(formComponent.getMainWidget());
        this.open();
        this.addListenerOnce("appear", function () {
          this.center();
        }, this);
      },
      getFormComponent: function getFormComponent() {
        return this.__P_7_1;
      },
      _getFallbackCaption: function _getFallbackCaption() {
        // Override to provide a fallback caption
        return "";
      },
      _onCloseButtonTap: function _onCloseButtonTap(event) {
        this.__P_7_1.close();
      },
      __P_7_3: function __P_7_3(variables) {
        variables = variables != null ? qx.lang.Object.clone(variables, false) : {};
        if (variables.hasOwnProperty("window")) throw new Error("Variable named 'window' is reserved");
        variables["window"] = this;
        return variables;
      }
    },
    destruct: function destruct() {
      if (this.__P_7_2) this._disposeObjects("__P_7_1");else this.remove(this.__P_7_1.getMainWidget());
    }
  });
  qookery.impl.FormWindow.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=FormWindow.js.map?dt=1613267099535