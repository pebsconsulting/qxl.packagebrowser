(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "cboulanger.eventrecorder.player.Testcafe": {
        "require": true,
        "defer": "runtime"
      },
      "cboulanger.eventrecorder.InfoPane": {
        "require": true,
        "defer": "runtime"
      },
      "qookery.ace.internal.AceComponent": {
        "require": true,
        "defer": "runtime"
      },
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "defer": "runtime",
        "require": true
      },
      "qx.ui.window.Window": {
        "construct": true,
        "require": true
      },
      "cboulanger.eventrecorder.MHelperMethods": {
        "require": true
      },
      "cboulanger.eventrecorder.editor.MEditor": {
        "require": true
      },
      "qx.util.AliasManager": {
        "construct": true
      },
      "qx.ui.layout.HBox": {
        "construct": true
      },
      "cboulanger.eventrecorder.Recorder": {
        "construct": true
      },
      "qx.core.Id": {
        "construct": true
      },
      "cboulanger.eventrecorder.player.Qooxdoo": {
        "construct": true
      },
      "qx.ui.menu.Menu": {},
      "qx.ui.menu.Button": {},
      "qx.ui.form.SplitButton": {},
      "cboulanger.eventrecorder.SplitToggleButton": {},
      "qx.ui.menu.CheckBox": {},
      "qx.ui.form.Button": {},
      "qx.bom.storage.Web": {},
      "qx.util.Uri": {},
      "qxl.dialog.Dialog": {},
      "qx.bom.Window": {},
      "qx.ui.layout.VBox": {},
      "qx.util.ResourceManager": {
        "defer": "runtime"
      },
      "qx.event.Timer": {},
      "qx.io.request.Jsonp": {},
      "qookery.Qookery": {
        "defer": "runtime"
      },
      "qx.bom.Lifecycle": {
        "defer": "runtime"
      },
      "qx.core.Init": {
        "defer": "runtime"
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "eventrecorder.show_progress": {},
        "eventrecorder.editor.placement": {}
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
   * The UI Controller for the recorder
   * @asset(cboulanger/eventrecorder/*)
   * @asset(qxl/dialog/*)
   * @require(cboulanger.eventrecorder.player.Testcafe)
   * @require(cboulanger.eventrecorder.InfoPane)
   * @require(qookery.ace.internal.AceComponent)
   * @ignore(ace)
   */
  qx.Class.define("cboulanger.eventrecorder.UiController", {
    extend: qx.ui.window.Window,
    include: [cboulanger.eventrecorder.MHelperMethods, cboulanger.eventrecorder.editor.MEditor],
    statics: {
      CONFIG_KEY: {
        SCRIPT: "eventrecorder.script",
        PLAYER_TYPE: "eventrecorder.player_type",
        PLAYER_MODE: "eventrecorder.player_mode",
        GIST_ID: "eventrecorder.gist_id",
        AUTOPLAY: "eventrecorder.autoplay",
        SHOW_PROGRESS: "eventrecorder.show_progress",
        SCRIPTABLE: "eventrecorder.scriptable",
        RELOAD_BEFORE_REPLAY: "eventrecorder.reload_before_replay",
        SCRIPT_URL: "eventrecorder.script_url"
      },
      FILE_INPUT_ID: "eventrecorder-fileupload",
      aliases: {
        "eventrecorder.icon.record": "cboulanger/eventrecorder/media-record.png",
        "eventrecorder.icon.start": "cboulanger/eventrecorder/media-playback-start.png",
        "eventrecorder.icon.pause": "cboulanger/eventrecorder/media-playback-pause.png",
        "eventrecorder.icon.stop": "cboulanger/eventrecorder/media-playback-stop.png",
        "eventrecorder.icon.edit": "cboulanger/eventrecorder/document-properties.png",
        "eventrecorder.icon.save": "cboulanger/eventrecorder/document-save.png",
        "eventrecorder.icon.load": "cboulanger/eventrecorder/document-open.png",
        "eventrecorder.icon.export": "cboulanger/eventrecorder/emblem-symbolic-link.png",
        // need a way to automatically include this
        "qxl.dialog.icon.cancel": "qxl/dialog/icon/IcoMoonFree/272-cross.svg",
        "qxl.dialog.icon.ok": "qxl/dialog/icon/IcoMoonFree/273-checkmark.svg",
        "qxl.dialog.icon.info": "qxl/dialog/icon/IcoMoonFree/269-info.svg",
        "qxl.dialog.icon.error": "qxl/dialog/icon/IcoMoonFree/270-cancel-circle.svg",
        "qxl.dialog.icon.warning": "qxl/dialog/icon/IcoMoonFree/264-warning.svg"
      }
    },
    properties: {
      /**
       * Current mode
       */
      recorderMode: {
        check: ["player", "recorder"],
        event: "changeMode",
        init: "recorder",
        apply: "_applyRecorderMode"
      },

      /**
       * The recorder instance
       */
      recorder: {
        check: "cboulanger.eventrecorder.Recorder",
        event: "changeRecorder",
        nullable: true
      },

      /**
       * The player instance
       */
      player: {
        check: "cboulanger.eventrecorder.IPlayer",
        event: "changePlayer",
        apply: "_applyPlayer",
        nullable: true
      },

      /**
       * The recorded script
       */
      script: {
        check: "String",
        nullable: true,
        deferredInit: true,
        event: "changeScript",
        apply: "_applyScript"
      },

      /**
       * Whether the stored script should start playing after the
       * application loads
       */
      autoplay: {
        check: "Boolean",
        nullable: false,
        deferredInit: true,
        event: "changeAutoplay",
        apply: "_applyAutoplay"
      },

      /**
       * Whether the application is reloaded before the script is replayed
       */
      reloadBeforeReplay: {
        check: "Boolean",
        nullable: false,
        deferredInit: true,
        event: "changeReloadBeforeReplay",
        apply: "_applyReloadBeforeReplay"
      },

      /**
       * The id of a gist to replay a script from, if any
       */
      gistId: {
        check: "String",
        nullable: true,
        deferredInit: true,
        event: "changeGistId",
        apply: "_applyGistId"
      },

      /**
       * Whether the event recorder is scriptable
       * (only useful for demos of the eventrecorder itself)
       */
      scriptable: {
        check: "Boolean",
        nullable: false,
        deferredInit: true,
        event: "changeScriptable"
      }
    },

    /**
     * Constructor
     * @param caption {String} The caption of the window. Will be used to create
     * an object id.
     * @ignore(env)
     * @ignore(storage)
     * @ignore(uri_params)
     * @ignore(caption)
     */
    construct: function construct(caption = "Event Recorder") {
      qx.ui.window.Window.constructor.call(this); // workaround until icon theme can be mixed into application theme

      const aliasMgr = qx.util.AliasManager.getInstance();
      const aliases = aliasMgr.getAliases();

      for (let [alias, base] of Object.entries(cboulanger.eventrecorder.UiController.aliases)) {
        if (!aliases[alias]) {
          aliasMgr.add(alias, base);
        }
      } //


      this.set({
        caption,
        modal: false,
        showMinimize: false,
        showMaximize: false,
        height: 90,
        layout: new qx.ui.layout.HBox(5),
        allowGrowX: false,
        allowGrowY: false
      });
      const recorder = new cboulanger.eventrecorder.Recorder();
      this.setRecorder(recorder); // initialize application parameters

      let {
        script,
        reloadBeforeReplay,
        autoplay,
        gistId,
        scriptable,
        playerType,
        playerMode
      } = this._getParamsFromEnvironment();

      this.initScript(script);
      this.initReloadBeforeReplay(reloadBeforeReplay === null ? false : reloadBeforeReplay);
      this.initAutoplay(autoplay);
      this.initGistId(gistId);
      this.initScriptable(scriptable); // assign id to this widget from caption

      const objectId = caption.replace(/ /g, "").toLocaleLowerCase();
      this.setQxObjectId(objectId);
      qx.core.Id.getInstance().register(this, objectId); // do not record events for this widget unless explicitly requested

      if (!this.getScriptable()) {
        recorder.excludeIds(objectId);
      } // caption


      this.bind("recorder.running", this, "caption", {
        converter: v => v ? "Recording ..." : caption
      });
      this.bind("player.running", this, "caption", {
        converter: v => v ? "Replaying ..." : caption
      }); // this creates the buttons in this order and adds them to the window

      this._createControl("load");

      this._createControl("replay");

      this._createControl("record");

      let stopButton = this._createControl("stop");

      this._createControl("edit");

      this._createControl("save"); // stop button special handling


      const stopButtonState = () => {
        stopButton.setEnabled(recorder.isRunning() || Boolean(this.getPlayer()) && this.getPlayer().isRunning());
      };

      recorder.addListener("changeRunning", stopButtonState);
      this.addListener("changePlayer", e => {
        if (e.getData()) {
          this.getPlayer().addListener("changeRunning", stopButtonState);
        }
      }); // form for file uploads

      var form = document.createElement("form");
      form.setAttribute("visibility", "hidden");
      document.body.appendChild(form);
      let input = document.createElement("input");
      input.setAttribute("id", cboulanger.eventrecorder.UiController.FILE_INPUT_ID);
      input.setAttribute("type", "file");
      input.setAttribute("name", "file");
      input.setAttribute("visibility", "hidden");
      form.appendChild(input); // Player configuration

      let player = this.getPlayerByType(playerType);
      player.setMode(playerMode);

      const {
        storage
      } = this._getPersistenceProviders();

      player.addListener("changeMode", e => {
        storage.setItem(cboulanger.eventrecorder.UiController.CONFIG_KEY.PLAYER_MODE, e.getData());
      });
      this.setPlayer(player); // Autoplay

      if (script && !this._scriptUrlMatches()) {
        script = null;
        this.setScript("");
        this.setAutoplay(false);
      }

      if (gistId && !script) {
        this.getRawGist(gistId).then(gist => {
          // if the eventrecorder itself is scriptable, run the gist in a separate player without GUI
          if (this.getScriptable()) {
            let gistplayer = new cboulanger.eventrecorder.player.Qooxdoo();
            gistplayer.setMode(playerMode);

            if (autoplay) {
              this.setAutoplay(false);
              gistplayer.replay(gist);
            }
          } else {
            this.setScript(gist);

            if (autoplay) {
              this.setAutoplay(false);
              this.replay();
            }
          }
        }).catch(e => {
          throw new Error("Gist ".concat(gistId, " cannot be loaded: ").concat(e.message, "."));
        });
      } else if (script && autoplay) {
        this.setAutoplay(false);
        this.replay();
      }
    },

    /**
     * The methods and simple properties of this class
     */
    members: {
      /**
       * @var {qx.ui.window.Window}
       */
      __P_2_0: null,

      /**
       * Internal method to create child controls
       * @param id
       * @return {qx.ui.core.Widget}
       * @private
       */
      _createControl(id) {
        let control;
        let recorder = this.getRecorder();

        switch (id) {
          /**
           * Load Button
           */
          case "load":
            {
              let loadMenu = new qx.ui.menu.Menu();
              let loadUserGistButton = new qx.ui.menu.Button("Load user gist");
              loadUserGistButton.addListener("execute", this.loadUserGist, this);
              loadUserGistButton.setQxObjectId("fromUserGist");
              loadMenu.add(loadUserGistButton);
              let loadGistByIdButton = new qx.ui.menu.Button("Load gist by id");
              loadGistByIdButton.addListener("execute", this.loadGistById, this);
              loadGistByIdButton.setQxObjectId("fromGistById");
              loadMenu.add(loadGistByIdButton);
              control = new qx.ui.form.SplitButton();
              control.set({
                enabled: false,
                icon: "eventrecorder.icon.load",
                toolTipText: "Load script",
                menu: loadMenu
              });
              control.addOwnedQxObject(loadUserGistButton);
              control.addOwnedQxObject(loadGistByIdButton);
              control.addListener("execute", this.load, this); // enable load button only if player can replay scripts in the browser

              this.bind("recorder.running", control, "enabled", {
                converter: v => !v
              });
              break;
            }

          /**
           * Replay button
           */

          case "replay":
            {
              control = new cboulanger.eventrecorder.SplitToggleButton();
              let replayMenu = new qx.ui.menu.Menu();
              control.addOwnedQxObject(replayMenu, "menu");
              let macroButton = new qx.ui.menu.Button("Macros");
              replayMenu.add(macroButton);
              replayMenu.addOwnedQxObject(macroButton, "macros");
              let macroMenu = new qx.ui.menu.Menu();
              macroButton.setMenu(macroMenu);
              macroButton.addOwnedQxObject(macroMenu, "menu");
              this.addListener("changePlayer", () => {
                let player = this.getPlayer();

                if (!player) {
                  return;
                }

                player.addListener("changeMacros", () => {
                  this._updateMacroMenu();

                  player.getMacros().getNames().addListener("change", this._updateMacroMenu, this);
                });
              });
              replayMenu.addSeparator();
              replayMenu.add(new qx.ui.menu.Button("Options:"));
              let optionReload = new qx.ui.menu.CheckBox("Reload page before replay");
              this.bind("reloadBeforeReplay", optionReload, "value");
              optionReload.bind("value", this, "reloadBeforeReplay");
              replayMenu.add(optionReload);
              control.addListener("execute", this._startReplay, this);
              control.set({
                enabled: false,
                icon: "eventrecorder.icon.start",
                toolTipText: "Replay script",
                menu: replayMenu
              }); // show replay button only if player is attached and if it can replay a script in the browser

              this.bind("player", control, "visibility", {
                converter: player => Boolean(player) && player.getCanReplayInBrowser() ? "visible" : "excluded"
              });
              this.bind("recorder.running", control, "enabled", {
                converter: v => !v
              });
              this.bind("player.running", control, "value");
              break;
            }

          /**
           * Record Button
           */

          case "record":
            {
              let recordMenu = new qx.ui.menu.Menu();
              recordMenu.add(new qx.ui.menu.Button("Options:"));
              let debugEvents = new qx.ui.menu.CheckBox("Log event data");
              debugEvents.bind("value", this, "recorder.logEvents");
              recordMenu.add(debugEvents);
              control = new cboulanger.eventrecorder.SplitToggleButton();
              control.setIcon("eventrecorder.icon.record");
              control.setMenu(recordMenu);
              control.addListener("changeValue", this._toggleRecord, this);
              recorder.bind("running", control, "value");
              recorder.bind("running", control, "enabled", {
                converter: v => !v
              });
              this.bind("recorderMode", control, "enabled", {
                converter: v => v === "recorder"
              });
              break;
            }

          /**
           * Stop Button
           */

          case "stop":
            {
              control = new qx.ui.form.Button();
              control.set({
                enabled: false,
                icon: "eventrecorder.icon.stop",
                toolTipText: "Stop recording"
              });
              control.addListener("execute", this.stop, this);
              break;
            }

          /**
           * Edit Button
           */

          case "edit":
            {
              let editMenu = new qx.ui.menu.Menu();
              let qxWinBtn = new qx.ui.menu.Button("Open editor in this window");
              qxWinBtn.addListener("execute", () => this.edit("inside"));
              editMenu.add(qxWinBtn);
              let nativeWinBtn = new qx.ui.menu.Button("Open editor in browser window");
              nativeWinBtn.addListener("execute", () => this.edit("outside"));
              editMenu.add(nativeWinBtn);
              control = new qx.ui.form.SplitButton();
              control.set({
                enabled: true,
                icon: "eventrecorder.icon.edit",
                toolTipText: "Edit script",
                menu: editMenu
              });
              control.addListener("execute", () => this.edit());
              this.bind("recorder.running", control, "enabled", {
                converter: v => !v
              }); // this.bind("script", editButton, "enabled", {
              //   converter: v => Boolean(v)
              // });

              break;
            }

          /**
           * Save Button
           */

          case "save":
            {
              control = new qx.ui.form.Button();
              control.set({
                enabled: false,
                icon: "eventrecorder.icon.save",
                toolTipText: "Save script"
              });
              control.addListener("execute", this.save, this);
              this.bind("recorder.running", control, "enabled", {
                converter: v => !v
              });
              break;
            }

          default:
            throw new Error("Control '".concat(id, " does not exist.'"));
        } // add to widget and assign object id


        this.add(control);
        this.addOwnedQxObject(control, id);
        return control;
      },

      async _updateMacroMenu() {
        const macroMenu = this.getQxObject("replay/menu/macros/menu");
        const player = this.getPlayer();
        macroMenu.removeAll();

        for (let name of player.getMacroNames().toArray()) {
          let description = player.getMacroDescription(name);
          let label = description.trim() ? name + ": " + description : name;
          let menuButton = new qx.ui.menu.Button(label);
          menuButton.addListener("execute", async () => {
            let lines = player.getMacroDefinition(name);
            await player.replay(lines);
            cboulanger.eventrecorder.InfoPane.getInstance().hide();
          });
          macroMenu.add(menuButton);
        }
      },

      /**
       * Returns a map with object providing persistence
       * @return {{env: qx.core.Environment, storage: qx.bom.storage.Web, uri_params: {}}}
       * @private
       */
      _getPersistenceProviders() {
        return {
          env: qx.core.Environment,
          storage: qx.bom.storage.Web.getSession(),
          uri_params: qx.util.Uri.parseUri(window.location.href)
        };
      },

      /**
       * Get application parameters from from environment, which can be query params,
       * local storage, or qooxdoo environment variables
       * @private
       * @ignore(env)
       * @ignore(storage)
       * @ignore(uri_params)
       */
      _getParamsFromEnvironment() {
        let {
          env,
          storage,
          uri_params
        } = this._getPersistenceProviders();

        let script = storage.getItem(cboulanger.eventrecorder.UiController.CONFIG_KEY.SCRIPT) || "";
        let autoplay = uri_params.queryKey.eventrecorder_autoplay || storage.getItem(cboulanger.eventrecorder.UiController.CONFIG_KEY.AUTOPLAY) || env.get(cboulanger.eventrecorder.UiController.CONFIG_KEY.AUTOPLAY) || false;
        let reloadBeforeReplay = storage.getItem(cboulanger.eventrecorder.UiController.CONFIG_KEY.RELOAD_BEFORE_REPLAY);
        let gistId = uri_params.queryKey.eventrecorder_gist_id || env.get(cboulanger.eventrecorder.UiController.CONFIG_KEY.GIST_ID) || null;
        let scriptable = Boolean(uri_params.queryKey.eventrecorder_scriptable) || qx.core.Environment.get(cboulanger.eventrecorder.UiController.CONFIG_KEY.SCRIPTABLE) || false;
        let playerType = uri_params.queryKey.eventrecorder_type || env.get(cboulanger.eventrecorder.UiController.CONFIG_KEY.PLAYER_TYPE) || "qooxdoo";
        let playerMode = uri_params.queryKey.eventrecorder_player_mode || storage.getItem(cboulanger.eventrecorder.UiController.CONFIG_KEY.PLAYER_MODE) || env.get(cboulanger.eventrecorder.UiController.CONFIG_KEY.PLAYER_MODE) || "presentation";
        let info = {
          script,
          autoplay,
          reloadBeforeReplay,
          gistId,
          scriptable,
          scriptUrl: this._getScriptUrl(),
          playerType,
          playerMode
        }; //console.debug(info);

        return info;
      },

      _applyRecorderMode(value, old) {
        if (value === "player" && !this.getPlayer()) {
          throw new Error("Cannot switch to player mode: no player has been set");
        }
      },

      /**
       * When setting the script property, store it in the browser
       * @param value
       * @param old
       * @private
       */
      _applyScript(value, old) {
        qx.bom.storage.Web.getSession().setItem(cboulanger.eventrecorder.UiController.CONFIG_KEY.SCRIPT, value);
        this.getRecorder().setScript(value);

        if (!this._getScriptUrl()) {
          this._saveScriptUrl();
        }

        if (!this.getPlayer()) {
          this.addListenerOnce("changePlayer", async () => {
            await this.getPlayer().translate(value);

            this._updateMacroMenu();
          });
        }
      },

      _getScriptUrl() {
        return qx.bom.storage.Web.getSession().getItem(cboulanger.eventrecorder.UiController.CONFIG_KEY.SCRIPT_URL);
      },

      _saveScriptUrl() {
        qx.bom.storage.Web.getSession().setItem(cboulanger.eventrecorder.UiController.CONFIG_KEY.SCRIPT_URL, document.location.href);
      },

      _scriptUrlMatches() {
        return this._getScriptUrl() === document.location.href;
      },

      _applyGistId(value, old) {// to do: add to URI
      },

      /**
       * Apply the "autoplay" property and store it in local storage
       * @param value
       * @param old
       * @private
       */
      _applyAutoplay(value, old) {
        qx.bom.storage.Web.getSession().setItem(cboulanger.eventrecorder.UiController.CONFIG_KEY.AUTOPLAY, value);
      },

      /**
       * Apply the "reloadBeforeReplay" property and storeit in local storage
       * @param value
       * @param old
       * @private
       */
      _applyReloadBeforeReplay(value, old) {
        qx.bom.storage.Web.getSession().setItem(cboulanger.eventrecorder.UiController.CONFIG_KEY.RELOAD_BEFORE_REPLAY, value);
      },

      /**
       * Event handler for record toggle button
       * @param e
       */
      _toggleRecord(e) {
        if (e.getData()) {
          this.record();
        }
      },

      /**
       * Event handler for replay button
       * @private
       */
      _startReplay() {
        // start
        if (this.getScript() || this.getGistId()) {
          if (this.getReloadBeforeReplay()) {
            // reload
            this.setAutoplay(true);
            window.location.reload();
          } else if (this.getScript()) {
            this.replay();
          } else {
            this.getQxObject("replay").setValue(false);
          }
        }
      },

      /**
       * Uploads content to the browser. Returns the content of the file.
       * @return {Promise<String>}
       * @private
       */
      async _upload() {
        return new Promise((resolve, reject) => {
          let input = document.getElementById(cboulanger.eventrecorder.UiController.FILE_INPUT_ID);
          input.addEventListener("change", e => {
            let file = e.target.files[0];

            if (!file.name.endsWith(".eventrecorder")) {
              reject(new Error("Not an eventrecorder script"));
            }

            let reader = new FileReader();
            reader.addEventListener("loadend", () => {
              resolve(reader.result);
            });
            reader.addEventListener("error", reject);
            reader.readAsText(file);
          });
          input.click();
        });
      },

      /**
       * Donwload content
       * @param filename
       * @param text
       * @private
       */
      _download(filename, text) {
        var element = document.createElement("a");
        element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));
        element.setAttribute("download", filename);
        element.style.display = "none";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      },

      /**
       * Returns the name of the application by using the parent directory of the
       * index.html script
       * @return {string}
       * @private
       */
      _getApplicationName() {
        return window.document.location.pathname.split("/").slice(-2, -1).join("");
      },

      /*
       ===========================================================================
         PUBLIC API
       ===========================================================================
       */

      /**
       * Return an array of object ids that have been assigned in the recorded application
       * @return {[]}
       */
      getObjectIds() {
        return this.getRecorder().getObjectIds();
      },

      /**
       * Starts recording
       */
      async record() {
        let recorder = this.getRecorder();

        if (this.getScript().trim() !== "" && !this.getScriptable()) {
          let mode = await qxl.dialog.Dialog.select("Do you want to overwrite your script or append new events?", [{
            label: "Append",
            value: "append"
          }, {
            label: "Overwrite",
            value: "overwrite"
          }]).promise();

          if (!mode) {
            this.getQxObject("record").setValue(false);
            return;
          }

          recorder.setMode(mode);
        }

        recorder.start();
      },

      /**
       * Stops recording/replaying
       */
      stop() {
        if (this.getRecorder().isRunning()) {
          this.getRecorder().stop();
          let script = this.getRecorder().getScript();

          this._saveScriptUrl();

          this.setScript(script);
        }

        if (this.getPlayer() && this.getPlayer().isRunning()) {
          this.getPlayer().stop();
        }
      },

      /**
       * Replays the current script
       * @return {Promise<void>}
       */
      async replay() {
        if (!this.getScript()) {
          throw new Error("No script to replay");
        }

        let player = this.getPlayer();

        if (!player) {
          throw new Error("No player has been set");
        }

        this.setRecorderMode("player");
        let infoPane = cboulanger.eventrecorder.InfoPane.getInstance();
        infoPane.useIcon("waiting");

        if (qx.core.Environment.get("eventrecorder.show_progress")) {
          player.addListener("progress", e => {
            let [step, steps] = e.getData();
            infoPane.display("Replaying ... (".concat(step, "/").concat(steps, ")"));
          });
        }

        let error = null;

        try {
          await player.replay(this.getScript());
        } catch (e) {
          error = e;
        }

        infoPane.hide();
        this.setRecorderMode("recorder");

        if (error) {
          throw error;
        }
      },

      __P_2_1: null,

      /**
       * Edits the current script, either using the in-window editor or the
       * external editor window.
       * @param mode {String|undefined}
       */
      async edit(mode) {
        const defaultMode = qx.core.Environment.get("eventrecorder.editor.placement");

        if (mode === undefined && (this.__P_2_1 || defaultMode)) {
          mode = this.__P_2_1 || defaultMode;
        }

        if (this.__P_2_0) {
          //console.debug({mode, lastMode:this.__lastMode});
          if (mode === this.__P_2_1) {
            if (mode === "inside") {
              //console.debug("Opening existing qooxdoo window.");
              this.__P_2_0.open();

              return;
            } else if (qx.bom.Window.isClosed(this.__P_2_0)) {
              //console.debug("Destroying existing closed native window and recreating it.");
              this.__P_2_0 = null;
            } else {
              //console.debug("Bringing existing native window to front.");
              this.__P_2_0.focus();

              return;
            }
          } else {
            //console.debug("Windows mode has changed, creating new window...");
            try {
              this.removeOwnedQxObject("editor");
            } catch (e) {}

            if (this.__P_2_1 === "inside") {
              //console.debug("Destroying existing qooxdoo native window.");
              this.__P_2_0.close();

              this.__P_2_0.dispose();
            } else if (qx.bom.Window.isClosed(this.__P_2_0)) {
              //console.debug("Destroying existing closed native window.");
              this.__P_2_0 = null;
            } else {
              //console.debug("Closing existing open native window...");
              this.__P_2_0.close();
            }
          }
        }

        switch (mode) {
          case "outside":
            this.__P_2_0 = await this.__P_2_2();
            break;

          case "inside":
          default:
            this.__P_2_0 = await this.__P_2_3();
            break;
        }

        this.__P_2_1 = mode;
      },

      __P_2_4: null,
      __P_2_5: false,

      async __P_2_2() {
        let popup = qx.bom.Window.open(this.getApplicationParentDir() + "/eventrecorder_scripteditor", Math.random(), {
          width: 800,
          height: 600,
          dependent: true,
          menubar: false,
          status: false,
          scrollbars: false,
          toolbar: false
        });
        window.addEventListener("beforeunload", () => {
          popup.close();
          popup = null;
        });

        const sendMessage = data => {
          if (qx.bom.Window.isClosed(popup)) {
            // remove listeners instead!!
            return;
          }

          popup.postMessage(data, "*"); //console.debug(">>> Message sent:");
          //console.debug(data);
        };

        window.addEventListener("message", e => {
          if (e.source !== popup) {
            this.warn("Ignoring message from unknown source...");
            return;
          }

          const data = e.data;
          this.__P_2_4 = data; //console.debug(">>> Message received:");
          //console.debug(data);

          if (data.script === null) {
            //console.debug("Received initialization message from external editor.");
            // initialization message
            sendMessage({
              script: this.getScript(),
              playerType: this.getPlayer().getType(),
              objectIds: this.getObjectIds()
            });
            this.__P_2_4 = {};

            if (!this.__P_2_5) {
              this.addListener("changeScript", e => {
                const script = e.getData();

                if (this.__P_2_4.script !== script) {
                  sendMessage({
                    script
                  });
                }
              });
              this.addListener("changePlayer", e => {
                sendMessage({
                  playerType: e.getData().getType()
                });
              });
              this.__P_2_5 = true;
            }

            return;
          }

          this.set(e.data);
        });
        return popup;
      },

      /**
       * Sets up an editor in the given window itself
       * @private
       */
      async __P_2_3() {
        let win = new qx.ui.window.Window("Edit script");
        win.set({
          layout: new qx.ui.layout.VBox(5),
          showMinimize: false,
          width: 800,
          height: 600
        });
        win.addListener("appear", () => {
          win.center();
        });
        const formUrl = qx.util.ResourceManager.getInstance().toUri("cboulanger/eventrecorder/forms/editor.xml");
        const formComponent = await this.createQookeryComponent(formUrl);
        this.addOwnedQxObject(formComponent, "editor");
        const editorWidget = formComponent.getMainWidget();
        win.add(editorWidget);
        formComponent.addOwnedQxObject(win, "window");
        editorWidget.addListener("appear", this._updateEditor, this);
        this.bind("script", formComponent.getModel(), "leftEditorContent");
        let formModel = formComponent.getModel();
        formModel.bind("leftEditorContent", this, "script");
        formModel.addListener("changeTargetScriptType", e => this.translateTo(formModel.getTargetScriptType(), formModel.getTargetMode()));
        formModel.addListener("changeTargetMode", e => this.translateTo(formModel.getTargetScriptType(), formModel.getTargetMode()));
        win.open();
        qx.event.Timer.once(this._setupAutocomplete, this, 2000);
        return win;
      },

      /**
       * Save the current script to the local machine
       */
      save() {
        qx.event.Timer.once(() => {
          let filename = this._getApplicationName() + ".eventrecorder";

          this._download(filename, this.getScript());
        }, null, 0);
      },

      /**
       * Load a script from the local machine
       * @return {Promise<void>}
       */
      async load() {
        try {
          let script = await this._upload();
          this.setScript(script);
        } catch (e) {
          qxl.dialog.Dialog.error(e.message);
        }
      },

      /**
       * Loads a gist selected from a github user's gists
       * @return {Promise<void>}
       */
      loadUserGist: async function loadUserGist() {
        let formData = {
          username: {
            type: "Textfield",
            label: "Username"
          },
          show_all: {
            type: "Checkbox",
            value: false,
            label: "Show all scripts (even if URL does not match)"
          }
        };
        let answer = await qxl.dialog.Dialog.form("Please enter the GitHub username", formData).promise();

        if (!answer || !answer.username.trim()) {
          return;
        }

        let username = answer.username;
        cboulanger.eventrecorder.InfoPane.getInstance().useIcon("waiting").display("Retrieving data from GitHub...");
        let gist_data = await new Promise((resolve, reject) => {
          let url = "https://api.github.com/users/".concat(username, "/gists");
          let req = new qx.io.request.Jsonp(url);
          req.addListener("success", e => {
            cboulanger.eventrecorder.InfoPane.getInstance().hide();
            let response = req.getResponse();

            if (response.data && response.message) {
              reject(response.message);
            } else if (response.data) {
              resolve(response.data);
            }

            reject(new Error("Invalid response."));
          });
          req.addListener("statusError", reject);
          req.send();
        });
        let suffix = ".eventrecorder";

        if (!answer.show_all) {
          suffix = "." + this._getApplicationName() + suffix;
        }

        let options = gist_data.filter(entry => entry.description && Object.values(entry.files).some(file => file.filename.endsWith(suffix))).map(entry => ({
          label: entry.description,
          value: entry.id
        }));

        if (options.length === 0) {
          qxl.dialog.Dialog.error("No matching gists were found.");
          return;
        }

        formData = {
          id: {
            type: "SelectBox",
            label: "Script",
            options
          }
        };
        answer = await qxl.dialog.Dialog.form("Please select from the following scripts:", formData).promise();

        if (!answer || !answer.id) {
          return;
        }

        this.setScript(await this.getRawGist(answer.id));
      },

      /**
       * Loads a gist by its id.
       * @return {Promise<void>}
       */
      async loadGistById() {
        let answer = await qxl.dialog.Dialog.prompt("Please enter the id of the gist to replay");

        if (!answer || !answer.id) {
          return;
        }

        this.setScript(await this.getRawGist(answer.id));
        this.setGistId(answer.id);
      }

    },

    /**
     * Will be called after class has been loaded, before application startup
     */
    defer: function defer() {
      let qookeryExternalLibsUrl = qx.util.ResourceManager.getInstance().toUri("cboulanger/eventrecorder/js");
      qookery.Qookery.setOption(qookery.Qookery.OPTION_EXTERNAL_LIBRARIES, qookeryExternalLibsUrl); // called when application is ready

      qx.bom.Lifecycle.onReady(async function onReady() {
        let infoPane = cboulanger.eventrecorder.InfoPane.getInstance();
        infoPane.useIcon("waiting");
        infoPane.display("Initializing Event Recorder, please wait...");
        let dispayedText = infoPane.getDisplayedText(); // assign object ids if object id generator has been included

        if (qx.Class.isDefined("cboulanger.eventrecorder.ObjectIdGenerator")) {
          await new Promise(resolve => {
            const objIdGen = qx.Class.getByName("cboulanger.eventrecorder.ObjectIdGenerator").getInstance();
            objIdGen.addListenerOnce("done", resolve);
          });
        } // hide splash screen if it hasn't used by other code yet


        if (infoPane.getDisplayedText() === dispayedText) {
          infoPane.hide();
        } // create controller


        let controller = new cboulanger.eventrecorder.UiController();
        qx.core.Init.getApplication().getRoot().add(controller, {
          top: 0,
          right: 10
        });
        {
          controller.show();
        }
      });
    }
  });
  cboulanger.eventrecorder.UiController.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=UiController.js.map?dt=1613267098591