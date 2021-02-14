(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.application.Standalone": {
        "require": true
      },
      "cboulanger.eventrecorder.MHelperMethods": {
        "require": true
      },
      "cboulanger.eventrecorder.editor.MEditor": {
        "require": true
      },
      "qx.util.ResourceManager": {
        "defer": "runtime"
      },
      "qookery.Qookery": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
    UI Event Recorder
  
    Copyright:
      2018 Christian Boulanger
  
    License:
      MIT license
      See the LICENSE file in the project's top-level directory for details.
  
    Authors: Christian Boulanger
  
  
  ************************************************************************ */

  /**
   * The Script Editor running in a separate browser window
   * @asset(cboulanger/eventrecorder/*)
   * @asset(dialog/*)
   * @ignore(ace)
   */
  qx.Class.define("cboulanger.eventrecorder.editor.Application", {
    extend: qx.application.Standalone,
    include: [cboulanger.eventrecorder.MHelperMethods, cboulanger.eventrecorder.editor.MEditor],
    properties: {
      /**
       * The window with the UI controller
       */
      controllerWindow: {
        check: "Window",
        event: "changeControllerWindow"
      },

      /**
       * The script in the editor
       */
      script: {
        check: "String",
        event: "changeScript",
        nullable: true,
        init: ""
      },

      /**
       * The type of the script player
       */
      playerType: {
        check: "String",
        event: "changePlayerType",
        init: "qooxdoo" //apply: "_applyPlayerType"

      },

      /**
       * The object ids defined in the recorded application
       */
      objectIds: {
        check: "Array",
        event: "changeObjectIds"
      }
    },
    members: {
      __P_37_0: null,

      main() {
        cboulanger.eventrecorder.editor.Application.prototype.main.base.call(this);
        this.set({
          objectIds: []
        });
        this.__P_37_0 = {}; // establish communication with the window

        if (!window.opener) {
          alert("This application works only if opened from the main application.");
          return;
        }

        this.setControllerWindow(window.opener); // create qookery components

        const formUrl = qx.util.ResourceManager.getInstance().toUri("cboulanger/eventrecorder/forms/editor.xml");
        this.createQookeryComponent(formUrl).then(formComponent => {
          this.addOwnedQxObject(formComponent, "editor");
          const editorWidget = formComponent.getMainWidget();
          editorWidget.addListener("appear", this._updateEditor, this);
          editorWidget.set({
            allowStretchX: true,
            allowStretchY: true
          });
          this.getRoot().add(editorWidget, {
            edge: 0
          });
          const formModel = formComponent.getModel();
          this.bind("script", formModel, "leftEditorContent");
          formModel.bind("leftEditorContent", this, "script");
          formModel.addListener("changeTargetScriptType", this.__P_37_1, this);
          formModel.addListener("changeTargetMode", this.__P_37_1, this);

          this.__P_37_2();
        });
      },

      __P_37_2() {
        window.addEventListener("message", e => {
          console.debug(">>> Message received:");
          console.debug(e.data);
          this.__P_37_0 = e.data;

          if (e.source !== this.getControllerWindow()) {
            this.warn("Ignoring message from unknown source!");
            return;
          }

          this.set(e.data);
        });
        this.addListener("changeScript", e => {
          const script = e.getData();

          if (this.__P_37_0 === null && script === "") {
            // do not transmit initial state
            return;
          }

          if (this.__P_37_0.script === script) {
            // do not retransmit received script data
            return;
          }

          const data = {
            script
          };
          this.getControllerWindow().postMessage(data, "*");
          console.debug(">>> Message sent:");
          console.debug(data);
        });
        this.addListenerOnce("changeObjectIds", this._setupAutocomplete, this); // request remote state

        this.setScript(null);
      },

      getPlayer() {
        return this.getPlayerByType(this.getPlayerType());
      },

      async __P_37_1() {
        const formModel = this.getQxObject("editor").getModel();
        const playerType = formModel.getTargetScriptType();
        const targetMode = formModel.getTargetMode();
        this.translateTo(playerType, targetMode);
      }

    },

    /**
     * Will be called after class has been loaded, before application startup
     */
    defer: function defer() {
      const externalLibraries = qx.util.ResourceManager.getInstance().toUri("cboulanger/eventrecorder/js");
      qookery.Qookery.setOption(qookery.Qookery.OPTION_EXTERNAL_LIBRARIES, externalLibraries);
    }
  });
  cboulanger.eventrecorder.editor.Application.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Application.js.map?dt=1613267101448