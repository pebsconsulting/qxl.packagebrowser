(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cboulanger.eventrecorder.player.Qooxdoo": {
        "require": true
      },
      "cboulanger.eventrecorder.IPlayer": {
        "require": true
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
   * A player that replays in the browser using qooxdoo code, and which can
   * export TestCafé code
   */
  qx.Class.define("cboulanger.eventrecorder.player.Testcafe", {
    extend: cboulanger.eventrecorder.player.Qooxdoo,
    implement: [cboulanger.eventrecorder.IPlayer],
    properties: {
      /**
       * @inheritDoc
       */
      canExportExecutableCode: {
        refine: true,
        init: true
      }
    },
    members: {
      /**
       * Returns the player type
       * @return {String}
       */
      getType() {
        return "testcafe";
      },

      /**
       * overridden to disallow presentation mode
       * @param value
       * @param old
       * @private
       */
      _applyMode(value, old) {
        if (value === "presentation") {
          this.warn("Presentation mode is not supported, switching to test mode");
          this.setMode("test");
        }
      },

      /**
       * Returns the file extension of the downloaded file in the target language
       * @return {string}
       */
      getExportFileExtension() {
        return "js";
      },

      /**
       * Translates the intermediate code into the target language
       * @param script
       * @return {string} executable code
       */
      async translate(script) {
        let lines = (await this._translate(script)).split(/\n/);
        return ["fixture `Test suite title`", "  .page `" + window.location.href + "`;", "", "test('Test description', async t => {", ...lines.map(line => "  " + line), "});"].join("\n");
      },

      /**
       * @inheritDoc
       */
      _generateUtilityFunctionsCode(script) {
        return cboulanger.eventrecorder.player.Testcafe.prototype._generateUtilityFunctionsCode.base.call(this, script).map(line => "await t.eval(() => {".concat(line, "});"));
      },

      /**
       * Translates a line of intermediate script code to testcafé code
       * @param line
       * @return {*|var}
       * @private
       */
      async translateLine(line) {
        let code = cboulanger.eventrecorder.player.Testcafe.prototype.translateLine.base.call(this, line);

        if (code && !code.startsWith("await t.") && !code.startsWith("//")) {
          code = code.endsWith(";") || code.endsWith("}") ? "await t.eval(()=>{".concat(code, "});") : "await t.eval(()=>".concat(code, ");");
        }

        return code;
      },

      /*
      ============================================================================
         COMMANDS
      ============================================================================
      */

      /**
       * Generates code that causes the given delay (in milliseconds).
       * The delay is capped by the {@link #cboulanger.eventrecorder.player.Abstract#maxDelay} property
       * and will only be caused in presentation mode
       * @param delayInMs {Number}
       * @return {string}
       */
      cmd_delay(delayInMs) {
        delayInMs = Math.min(delayInMs, this.getMaxDelay());
        return this.getMode() === "presentation" && delayInMs > 0 ? "await t.wait(".concat(delayInMs, ");") : "";
      },

      /**
       * Generates code that waits the given time in milliseconds, regardless of player mode
       * @param timeInMs {Number}
       * @return {string}
       */
      cmd_wait(timeInMs) {
        return "await t.wait(".concat(timeInMs, ");");
      }

    }
  });
  cboulanger.eventrecorder.player.Testcafe.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Testcafe.js.map?dt=1613267101734