(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.bom.Element": {
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "cboulanger.eventrecorder.MState": {
        "require": true
      },
      "cboulanger.eventrecorder.MHelperMethods": {
        "require": true
      },
      "qx.lang.Type": {},
      "qx.core.Id": {},
      "qx.core.Init": {},
      "qx.event.type.Data": {},
      "qx.data.marshal.Json": {},
      "qxl.dialog.Dialog": {},
      "qx.event.Timer": {},
      "qx.core.Assert": {},
      "qx.bom.storage.Web": {}
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
   * The base class of all player types
   * @require(qx.bom.Element)
   */
  qx.Class.define("cboulanger.eventrecorder.player.Abstract", {
    extend: qx.core.Object,
    include: [cboulanger.eventrecorder.MState, cboulanger.eventrecorder.MHelperMethods],
    statics: {
      utilityFunctions: {
        /**
         * Runs the given function in the interval until it returns true or the
         * given timeout is reached. Returns a promise that will resolve once the
         * function returns true or rejects if the timeout is reached.
         * @param fn {Function} Condition function
         * @param interval {Number} The interval in which to run the function. Defaults to 100 ms.
         * @param timeout {Number} The timeout in milliseconds. Defaults to 10 seconds
         * @param timeoutMsg {String|undefined} An optional addition to the timeout error message
         * @return {Promise}
         */
        waitForCondition: function waitForCondition(fn, interval = 100, timeout = 10000, timeoutMsg) {
          return new Promise((resolve, reject) => {
            let intervalId = setInterval(() => {
              if (fn()) {
                clearInterval(intervalId);
                resolve();
              }
            }, interval);
            setTimeout(() => {
              clearInterval(intervalId);
              reject(new Error(timeoutMsg || "Timeout waiting for condition."));
            }, timeout);
          });
        },

        /**
         * Returns a promise that will resolve (with any potential event data) if
         * the given object fires an event with the given type and will reject if
         * the timeout is reached before that happens.
         *
         * @param qxObjOrId {qx.core.Object|String} If string, assume it is the object id
         * @param type {String} Type of the event
         * @param expectedData {*|undefined} The data to expect. If undefined,
         * resolve. If a regular expression, the event data as a JSON literal will
         * be matched with that regex and the promise will resolve when it matches.
         * Otherwise, the data will be compared with the actual event data both
         * serialized to JSON.
         * @param timeout {Number|undefined} The timeout in milliseconds. Defaults to 10 seconds
         * @param timeoutMsg {String|undefined} An optional addition to the timeout error message
         * @return {Promise}
         */
        waitForEvent: function waitForEvent(qxObjOrId, type, expectedData, timeout, timeoutMsg) {
          let qxObj = qxObjOrId;

          if (qx.lang.Type.isString(qxObjOrId)) {
            qxObj = qx.core.Id.getQxObject(qxObjOrId);

            if (!qxObj) {
              throw new Error("Invalid object id ".concat(qxObjOrId));
            }
          }

          timeout = timeout || this.getTimeout();
          return new Promise((resolve, reject) => {
            // create a timeout
            let timeoutId = setTimeout(() => {
              qxObj.removeListener(type, changeEventHandler);
              reject(new Error(timeoutMsg || "Timeout waiting for event \"".concat(type, ".")));
            }, timeout); // function to create a listener for the change event

            let changeEventHandler = e => {
              let app = qx.core.Init.getApplication();
              let eventdata = e instanceof qx.event.type.Data ? e.getData() : undefined;

              if (expectedData !== undefined) {
                if (eventdata === undefined) {
                  app.warn("\n--- When waiting for event '".concat(type, "' on object ").concat(qxObj, ", received 'undefined'"));
                  qxObj.addListenerOnce(type, changeEventHandler);
                  return;
                }

                if (qx.lang.Type.isArray(expectedData) && qx.lang.Type.isArray(eventdata) && expectedData.length && expectedData[0] instanceof qx.core.Object) {
                  /** a) either match array and check for "live" qooxdoo objects in the array (this is for selections), */
                  for (let [index, expectedItem] of expectedData.entries()) {
                    if (expectedItem !== eventdata[index]) {
                      app.warn("\n--- When waiting for event '".concat(type, "' on object ").concat(qxObj, ", received non-matching array of qooxdoo objects!"));
                      qxObj.addListenerOnce(type, changeEventHandler);
                      return;
                    }
                  }
                } else {
                  // convert event data to JSON
                  try {
                    eventdata = JSON.stringify(e.getData());
                  } catch (e) {
                    throw new Error("\n--- When waiting for event '".concat(type, "' on object ").concat(qxObj, ", could not stringify event data for comparison."));
                  }

                  if (qx.lang.Type.isRegExp(expectedData)) {
                    /** b) or match a regular expression, */
                    if (!eventdata.match(expectedData)) {
                      app.warn("\n--- When waiting for event '".concat(type, "' on object ").concat(qxObj, ", expected data to match '").concat(expectedData.toString(), "', got ").concat(eventdata, "!"));
                      qxObj.addListenerOnce(type, changeEventHandler);
                      return;
                    }
                  } else {
                    /* c) or compare JSON equality */
                    try {
                      expectedData = JSON.stringify(expectedData);
                    } catch (e) {
                      throw new Error("When waiting for event '".concat(type, "' on object ").concat(qxObj, ", could not stringify expected data for comparison."));
                    }

                    if (eventdata !== expectedData) {
                      app.warn("\n--- When waiting for event '".concat(type, "' on object ").concat(qxObj, ", expected '").concat(JSON.stringify(expectedData), "', got '").concat(JSON.stringify(eventdata), "'!\""));
                      qxObj.addListenerOnce(type, changeEventHandler);
                      return;
                    }
                  }
                }
              }

              app.info("\n+++ Received correct event '".concat(type, "' on object ").concat(qxObj, ".\""));
              clearTimeout(timeoutId);
              resolve(eventdata);
            }; // add a listener


            qxObj.addListenerOnce(type, changeEventHandler);
          });
        }
      }
    },
    properties: {
      /**
       * The replay mode. Possible values:
       * "test": The script is executed ignoring the "delay" commands, errors will
       * stop execution and will be thrown.
       * "presentation": The script is executed with user delays, errors will be
       * logged to the console but will not stop execution
       */
      mode: {
        check: ["test", "presentation"],
        event: "changeMode",
        init: "presentation",
        apply: "_applyMode"
      },

      /**
       * The timeout in milliseconds
       */
      timeout: {
        check: "Number",
        init: 10000
      },

      /**
       * The interval between checks if waiting for a condition to fulfil
       */
      interval: {
        check: "Number",
        init: 100
      },

      /**
       * if true, ignore user delays and use defaultDelay
       */
      useDefaultDelay: {
        check: "Boolean",
        nullable: false,
        init: false
      },

      /**
       * The maximun delay between events (limits user-generated delay)
       */
      maxDelay: {
        check: "Number",
        init: 1000
      },

      /**
       * Whether the player can replay the generated script in the browser
       */
      canReplayInBrowser: {
        check: "Boolean",
        nullable: false,
        init: false,
        event: "changeCanReplay"
      },

      /**
       * Whether the player can export code that can be used outside this application
       */
      canExportExecutableCode: {
        check: "Boolean",
        nullable: false,
        init: false,
        event: "changeCanExportExecutableCode"
      },

      /**
       * Macro data
       */
      macros: {
        check: "qx.core.Object",
        init: null,
        event: "changeMacros"
      }
    },
    events: {
      /**
       * Fired with each step of the replayed script. The event data is an array
       * containing the number of the step and the number of steps
       */
      "progress": "qx.event.type.Data"
    },

    /**
     * constructor
     */
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.__P_38_0 = [];
      this._globalRef = "eventrecorder_player";
      window[this._globalRef] = this;
      this.resetMacros(); // inject utility functions in the statics section into the global scope
      // so that they are available in eval()

      for (let [name, fn] of Object.entries(cboulanger.eventrecorder.player.Abstract.utilityFunctions)) {
        window[name] = fn;
      }
    },

    /**
     * The methods and simple properties of this class
     */
    members: {
      /**
       * A globally accessible reference to the player implementation
       */
      _globalRef: null,

      /**
       * A list of available commands
       */
      __P_38_0: null,

      /**
       * An array of object containing information on the macros that are currently
       * being defined (in a nested way)
       * @var {Object[]}
       */
      __P_38_1: null,

      /**
       * The index of the macro in the macro stack that is currently defined
       * @var {Integer}
       */
      __P_38_2: -1,

      /**
       * Variables
       */
      __P_38_3: null,

      /**
       * An array of promises which are to be awaited
       */
      __P_38_4: null,

      /**
       * Last id addressed
       */
      __P_38_5: null,

      /**
       * Last command used
       */
      __P_38_6: null,

      /**
       * Returns the player type
       * @return {String}
       */
      getType() {
        throw new Error("Abstract method which needs to be implemented");
      },

      /**
       * Return the last id used
       * @return {String|null}
       */
      getLastId() {
        return this.__P_38_5;
      },

      /**
       * Return the last command used
       * @return {String|null}
       */
      getLastCommand() {
        return this.__P_38_6;
      },

      /**
       * Stub to be overridden if needed
       * @param value
       * @param old
       * @private
       */
      _applyMode(value, old) {},

      /**
       * NOT IMPLEMENTED
       * Adds the given array of commands
       * @param commands {Object[]}
       */
      _addCommands(commands) {
        this.__P_38_0 = this.__P_38_0.concat(commands).sort((a, b) => a.name > b.name);
      },

      /**
       * NOT IMPLEMENTED
       * Returns the list of availabe commands
       * @return {Object[]}
       */
      getCommands() {
        return this.__P_38_0;
      },

      /**
       * Clears all macro definitions and the macro stack
       */
      resetMacros() {
        if (this.getMacros()) {
          this.getMacros().dispose();
        }

        this.__P_38_1 = [];
        this.__P_38_2 = -1;
        let macros = qx.data.marshal.Json.createModel({
          names: [],
          definitions: [],
          descriptions: []
        }, true);
        this.setMacros(macros);
      },

      /**
       * Returns true if a macro of that name exists.
       * @param name {String}
       * @return {boolean}
       */
      macroExists(name) {
        return this.getMacros().getNames().indexOf(name) >= 0;
      },

      /**
       * Returns the names of the currently defined macros as a qx.data.Array
       * @return {qx.data.Array}
       */
      getMacroNames() {
        return this.getMacros().getNames();
      },

      /**
       * Returns an array with the lines of the macro of that name
       * @param name {String}
       * @return {Array}
       */
      getMacroDefinition(name) {
        let index = this.getMacros().getNames().indexOf(name);

        if (index < 0) {
          throw new Error("Macro '".concat(name, "' does not exist"));
        }

        return this.getMacros().getDefinitions().getItem(index);
      },

      /**
       * Returns the description of the macro
       * @param name {String}
       * @return {String}
       */
      getMacroDescription(name) {
        let index = this.getMacros().getNames().indexOf(name);

        if (index < 0) {
          throw new Error("Macro '".concat(name, "' does not exist"));
        }

        return this.getMacros().getDescriptions().getItem(index);
      },

      /**
       * Adds an empty macro of this name
       * @param name {String}
       * @param description {String|undefined}
       */
      addMacro(name, description) {
        if (this.macroExists(name)) {
          throw new Error("A macro of the name '".concat(name, "' alread exists."));
        }

        let macros = this.getMacros();
        macros.getDefinitions().push([]);
        macros.getDescriptions().push(description || "");
        macros.getNames().push(name);
      },

      /**
       * Begins the definition of a macro of that name.
       * @param name {String}
       */
      beginMacroDefintion(name) {
        let index = ++this.__P_38_2;
        this.__P_38_1[index] = {
          name
        };
      },

      /**
       * Returns true if the player is currently in a macro definition
       * @return {boolean}
       */
      isInMacroDefinition() {
        return this.__P_38_2 >= 0;
      },

      /**
       * Return the name of the macro that is currently being defined
       * @return {String}
       */
      getCurrentMacroName() {
        if (!this.isInMacroDefinition()) {
          throw new Error("No macro is currently defined");
        }

        let {
          name
        } = this.__P_38_1[this.__P_38_2];
        return name;
      },

      /**
       * Leave the current macro, i.e. return to the including script/macro
       */
      leaveMacroDefinition() {
        this.getCurrentMacroName(); // this will throw if none is being defined

        this.__P_38_2--;
      },

      /**
       * Translates a single line from the intermediate code into the target
       * language. To be overridden by subclasses if neccessary. Returns a
       * single line in most cases, an array of lines in case of imports.
       *
       * @param line {String}
       * @return {String|String[]}
       * @ignore(command)
       * @ignore(args)
       */
      async _translateLine(line) {
        line = line.trim();

        if (!line) {
          return null;
        } // comment


        if (line.startsWith("#")) {
          return this.addComment(line.substr(1).trim());
        } // parse command line


        let [command, ...args] = this.tokenize(line);
        command = String(command).toLocaleLowerCase();
        this.__P_38_6 = command;
        this.__P_38_5 = args[0]; // assume first argument is id
        // run command generation implementation

        let method_name = "cmd_" + command.replace(/-/g, "_");

        if (typeof this[method_name] == "function") {
          let translatedLine;

          try {
            translatedLine = this[method_name].apply(this, args); // async function

            if (translatedLine && typeof translatedLine.then == "function") {
              translatedLine = await translatedLine;
            }
          } catch (e) {
            throw new Error("Error translating '".concat(line, "': ").concat(e.message));
          } // imports


          if (Array.isArray(translatedLine)) {
            return translatedLine;
          }

          if (translatedLine && translatedLine.startsWith("(") && this.isInAwaitBlock()) {
            this._addPromiseToAwaitStack(translatedLine);

            return null;
          }

          return translatedLine;
        }

        throw new Error("Unsupported/unrecognized command: '".concat(command, "'"));
      },

      /**
       * Given a script, return an array of lines with all variable and macro
       * declarations registered and removed. Optionally, variables are expanded.
       *
       * @param script {String}
       * @param expandVariables {Boolean} Whether to expand the found variables. Default to true
       * @return {Array}
       * @private
       */
      async _handleMeta(script, expandVariables = true) {
        this.resetMacros();
        this.__P_38_3 = {};
        let lines = [];

        for (let line of script.split(/\n/)) {
          line = line.trim();

          if (!line) {
            continue;
          } // expand variables


          let var_def = line.match(/([^=\s]+)\s*=\s*(.+)/);

          if (var_def) {
            this.__P_38_3[var_def[1]] = var_def[2];
            continue;
          } else if (expandVariables && line.match(/\$([^\s\d\/]+)/)) {
            line = line.replace(/\$([^\s\d\/]+)/g, (...args) => this.__P_38_3[args[1]]);
          } // register macros


          if (line.startsWith("define ")) {
            if (this.isInAwaitBlock()) {
              throw new Error("You cannot use a macro in an await block.");
            }

            await this._translateLine(line);
            continue;
          } // await block


          if (line.startsWith("await-")) {
            await this._translateLine(line);
          } // end await block or macro


          if (line === "end") {
            // macro
            if (!this.isInAwaitBlock()) {
              await this._translateLine(line);
              continue;
            } // await block


            await this._translateLine(line);
          } // add code to macro


          if (this.isInMacroDefinition()) {
            let name = this.getCurrentMacroName();
            this.getMacroDefinition(name).push(line);
            continue;
          }

          lines.push(line);
        } // remove variable registration if they have been expanded


        if (expandVariables) {
          this.__P_38_3 = {};
        }

        return lines;
      },

      /**
       * Returns the lines for the macro of the given name, with the given arguments
       * replaced (1st arg -> $1, 2nd arg -> $2, etc.). If it doesn't exist,
       * return undefined.
       * @param macro_name {String} The name of the macro
       * @param args {Array} An array of arguments to be replaced in the macro code
       * @return {Array|undefined}
       * @private
       */
      _getMacro(macro_name, args) {
        if (!this.macroExists(macro_name)) {
          return undefined;
        }

        let macro_lines = this.getMacroDefinition(macro_name); // argument placeholders

        for (let i = 0; i < args.length; i++) {
          macro_lines = macro_lines.map(l => l.replace(new RegExp("\\$" + (i + 1), "g"), JSON.stringify(args[i])));
        }

        return macro_lines;
      },

      /**
       * Returns an array of lines containing variable declarations
       * @return {string[]}
       * @private
       */
      _defineVariables() {
        return Object.getOwnPropertyNames(this.__P_38_3).map(key => "const ".concat(key, " =\"").concat(this.__P_38_3[key], "\";"));
      },

      /**
       * Translates variables in a line
       * @param line {String}
       * @private
       * @return {String}
       * @ignore(args)
       */
      _translateVariables(line) {
        if (line.match(/\$([^\s\d\/]+)/)) {
          line = line.replace(/\$([^\s\d\/]+)/g, (...args) => {
            let var_name = args[1];
            let var_content = this.__P_38_3[var_name];

            if (var_content === undefined) {
              throw new Error("Variable '".concat(var_name, "' has not been defined."));
            }

            return var_content;
          });
        }

        return line;
      },

      /**
       * Returns the code of utility functions needed for the command implementations.
       * @param script {String} Optional script code to be searched for the function name.
       * If given, omit function if not present in the script code
       * @return {string[]}
       * @private
       * @ignore(fn)
       */
      _generateUtilityFunctionsCode(script) {
        return Object.entries(cboulanger.eventrecorder.player.Abstract.utilityFunctions).filter(([name]) => script ? script.match(new RegExp(name)) : true).map(([name, fn]) => fn.toString().replace(/function \(/, "function ".concat(name, "(")) // remove comments, see https://stackoverflow.com/questions/5989315/regex-for-match-replacing-javascript-comments-both-multiline-and-inline
        .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, "$1").split(/\n/).map(line => line.trim()).filter(line => Boolean(line)).join(""));
      },

      /**
       * Replays a number of script lines
       * @param lines {String[]}
       * @param steps {Integer?}
       * @param step {Integer?}
       * @return {Promise<boolean>}
       * @private
       */
      async _play(lines, steps = 0, step = 0) {
        for (let line of lines) {
          // stop if we're not running (user pressed "stop" button
          if (!this.getRunning()) {
            return false;
          } // ignore comments


          if (line.startsWith("#")) {
            continue;
          } // variables


          line = this._translateVariables(line); // play macros recursively

          let [command, ...args] = this.tokenize(line);

          let macro_lines = this._getMacro(command, args);

          if (macro_lines !== undefined) {
            if (steps) {
              step++;
              this.debug("\n===== Step ".concat(step, " / ").concat(steps, ", executing macro ").concat(command, " ====="));
            }

            await this._play(macro_lines);
            continue;
          } // count steps if given, wait doesn't count as a step


          if (steps && !line.startsWith("wait") && !line.startsWith("delay")) {
            step++; // inform listeners

            this.fireDataEvent("progress", [step, steps]);
            this.debug("\n===== Step ".concat(step, " / ").concat(steps, " ===="));
          } // ignore delay in test mode


          if (this.getMode() === "test" && line.startsWith("delay")) {
            continue;
          } // translate


          let code = await this._translateLine(line); // skip empty lines

          if (!code) {
            continue;
          } // handle multiple lines from imports


          if (Array.isArray(code)) {
            this.debug(">>>>>>>>> Start import >>>>>>>>>>>>>");
            await this._play(code, code.length, 0);
            this.debug("<<<<<<<<< End import ><<<<<<<<<<<<<<");
            continue;
          }

          this.debug("".concat(line, "\n").concat("-".repeat(40), "\n").concat(code)); // execute

          let result = window.eval(code);

          if (result instanceof Promise) {
            try {
              await result;
            } catch (e) {
              throw e;
            }
          }
        }

        return true;
      },

      /**
       * Replays the given script of intermediate code
       * @param scriptOrLines {String|Array}
       *    The script to replay. If String, assume an unhandled script. If Array,
       *    assume that script has already been handled by {@link #_handleMeta) and
       *    split into lines.
       * @return {Promise} Promise which resolves when the script has been replayed, or
       * rejects with an error
       * @todo implement pausing
       */
      async replay(scriptOrLines) {
        this.setRunning(true);
        let lines = Array.isArray(scriptOrLines) ? scriptOrLines : await this._handleMeta(scriptOrLines);
        let steps = 0;
        let await_block = false;

        for (let line of lines) {
          if (line.startsWith("await-")) {
            await_block = true;
            continue;
          }

          if (line.startsWith("end")) {
            await_block = false;
            continue;
          }

          if (!await_block && !line.startsWith("wait ") && !line.startsWith("#") && !line.startsWith("delay")) {
            steps++;
          }
        } // replay it!


        try {
          await this._play(lines, steps, 0);
        } catch (e) {
          switch (this.getMode()) {
            case "test":
              throw e;

            case "presentation":
              this.warn(e);
              qxl.dialog.Dialog.error(e.message);
          }
        }

        this.setRunning(false);
        qx.event.Timer.once(() => this.cmd_hide_info(), null, 100);
      },

      /**
       * Translates the intermediate code into the target language
       * @param scriptOrLines {String|Array}
       *    The script to translate.
       *    If String, assume an unhandled script. If Array. assume that script
       *    has already been handled by {@link #_handleMeta) and split into lines
       * @return {string} executable code
       */
      async translate(scriptOrLines) {
        return this._translate(scriptOrLines);
      },

      /**
       * Implementation for #translate(). Returns the translated lines.
       * @param scriptOrLines {String|Array}
       *    If String, assume an unhandled script. If Array. assume that script
       *    has already been handled by {@link #_handleMeta) and split into lines
       * @param includeUtilityFunctions {Boolean}
       * @return {string}
       * @private
       */
      async _translate(scriptOrLines, includeUtilityFunctions = true) {
        let lines = Array.isArray(scriptOrLines) ? scriptOrLines : await this._handleMeta(scriptOrLines);

        let translatedLines = this._defineVariables();

        for (let line of lines) {
          line = line.trim();

          if (!line) {
            continue;
          }

          let [command, ...args] = this.tokenize(line);

          let macro_lines = this._getMacro(command, args);

          let new_lines = [];

          for (let l of macro_lines || [line]) {
            let code = await this._translateLine(l);

            if (Array.isArray(code)) {
              new_lines = new_lines.concat(code);
            } else {
              new_lines.push(code);
            }
          }

          translatedLines = translatedLines.concat(new_lines.filter(l => Boolean(l)));
        }

        let translation = translatedLines.join("\n");

        if (includeUtilityFunctions) {
          return this._generateUtilityFunctionsCode(translation).concat(translatedLines).join("\n");
        }

        return translation;
      },

      /**
       * Given an async piece of code which checks for a condition or an application state,
       * return code that checks for this condition, throwing an error if the
       * condition hasn't been fulfilled within the set timeout.
       * @param condition {String} The condition expression as a string
       * @param timeoutmsg {String|undefined} An optional message to be shown if the condition hasn't been met before the timeout.
       */
      generateWaitForConditionCode(condition, timeoutmsg) {
        qx.core.Assert.assertString(condition);
        timeoutmsg = timeoutmsg || "Timeout waiting for condition '".concat(condition, "' to fulfil.\"");
        return "(waitForCondition(() => ".concat(condition, ", ").concat(this.getInterval(), ", ").concat(this.getTimeout(), ", \"").concat(timeoutmsg, "\"))");
      },

      /**
       * Generates code that returns a promise which will resolve (with any potential event data) if the given object fires
       * an event with the given type and data (if applicable) and will reject if the timeout is reached before that happens.
       * @param id {String} The id of the object to monitor
       * @param type {String} The type of the event to wait for
       * @param data {*|undefined} The data to expect. Must be serializable to JSON. Exception: if the data is a string that
       * starts with "{verbatim}", the unquoted string is used
       * @param timeoutmsg {String|undefined} An optional message to be shown if the event hasn't been fired before the timeout.
       * @return {String}
       */
      generateWaitForEventCode(id, type, data, timeoutmsg) {
        qx.core.Assert.assertString(id);
        qx.core.Assert.assertString(type);

        if (qx.lang.Type.isString(data) && data.startsWith("{verbatim}")) {
          data = data.substr(10);
        } else {
          data = JSON.stringify(data);
        }

        if (!timeoutmsg) {
          timeoutmsg = "Timeout waiting for event '".concat(type, "' on '").concat(id, "'");
        }

        return "(waitForEvent(\"".concat(id, "\", \"").concat(type, "\",").concat(data, ", ").concat(this.getTimeout(), ", \"").concat(timeoutmsg, "\"))");
      },

      /**
       * Generates code that returns a promise which will resolve (with any
       * potential event data) if the given object fires an event with the given
       * type and data (if applicable). After the timeout, it will execute the
       * given code and restart the timeout.
       *
       * @param id {String} The id of the object to monitor
       * @param type {String} The type of the event to wait for
       * @param data {*|null} The data to expect. Must be serializable to JSON. In case
       * of events that do not have data, you MUST explicitly pass 'undefined' as
       * argument if you use the following arguments
       * @param code {String} The code to execute after the timeout
       * @return {String}
       */
      generateWaitForEventTimoutFunction(id, type, data, code) {
        qx.core.Assert.assertString(id);
        qx.core.Assert.assertString(type);
        return "(new Promise(async (resolve, reject) => { \n        while (true){\n          try {\n            await waitForEvent(qx.core.Id.getQxObject(\"".concat(id, "\"), \"").concat(type, "\", ").concat(data === undefined ? "undefined" : JSON.stringify(data), ", ").concat(this.getTimeout(), ");\n            return resolve(); \n          } catch (e) {\n            console.debug(e.message);\n            ").concat(code, ";\n          }\n        }\n      }))").split(/\n/).map(l => l.trim()).join("");
      },

      /**
       * Adds a line comment to the target script
       * @param comment {String}
       * @return {string}
       */
      addComment(comment) {
        return "// " + comment;
      },

      /**
       * Escapes all characters in a string that are special characters in a regular expression
       * @param s {String} The string to escape
       * @return {String}
       */
      escapeRegexpChars(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      },

      /**
       * Creates a regular expression that matches a json string. In this string, you can use a regular expression
       * enclosed by "<!" and "!>" to replace data that cannot be known in advance, such as tokens or session ids.
       * Example: '{token:"<![A-Za-z0-9]{32}!>",user:"admin">' will match '{"token":"OnBHqQd59VHZYcphVADPhX74q0Sc6ERR","user":"admin"}'
       * @param s {string}
       */
      createRegexpForJsonComparison(s) {
        let searchExp = /<![^<][^!]+!>/g;
        let foundRegExps = s.match(searchExp);

        if (foundRegExps && foundRegExps.length) {
          let index = 0; // remove escape sequence

          foundRegExps = foundRegExps.map(m => m.slice(2, -2)); // replace placeholders

          return this.escapeRegexpChars(s).replace(searchExp, () => foundRegExps[index++]);
        }

        return this.escapeRegexpChars(s);
      },

      /**
       * Adds promise code to a list of promises that need to resolve before the
       * script proceeds
       * @param promiseCode
       */
      _addPromiseToAwaitStack(promiseCode) {
        if (!qx.lang.Type.isArray(this.__P_38_4)) {
          throw new Error("Cannot add promise since no await block has been opened.");
        }

        this.__P_38_4.push(promiseCode);
      },

      /**
       * Returns the file extension of the downloaded file in the target language
       * @return {string}
       */
      getExportFileExtension() {
        throw new Error("Method getExportFileExtension must be impemented in subclass");
      },

      /**
       * Whether the player is in an await block
       * @return {Boolean}
       */
      isInAwaitBlock() {
        return qx.lang.Type.isArray(this.__P_38_4);
      },

      /**
       * Returns the storage object
       * @return {qx.bom.storage.Web}
       * @private
       */
      _getStorage() {
        return qx.bom.storage.Web.getSession();
      },

      /**
       * Saves an imported script
       * @param uri {String}
       * @param script {String}
       */
      _saveImport(uri, script) {
        this._getStorage().setItem("import:" + uri, script);
      },

      /**
       * Retrieves an imported script by its uri, if it exists
       * @param uri {String}
       * @return {String}
       */
      _getImport(uri) {
        return this._getStorage().getItem("import:" + uri);
      },

      /**
       * Removes all imported scripts
       */
      _clearImports() {
        this._getStorage().forEach(key => {
          if (key.startsWith("import:")) {
            this._getStorage().removeItem(key);
          }
        });
      },

      /*
      ============================================================================
         COMMANDS
      ============================================================================
      */

      /**
       * Imports a remote file and caches it locally
       * @param uri {String}
       * @return {Promise<array>}
       */
      async cmd_import(uri) {
        const [type, id] = uri.split(":");

        if (type !== "gist") {
          throw new Error("Currently, only gists can be imported.");
        } // use stored script or load from URI


        let remoteScript = this._getImport(uri);

        if (!remoteScript) {
          remoteScript = await this.getRawGist(id);

          this._saveImport(uri, remoteScript);
        }

        return this._translate(remoteScript, false);
      },

      /**
       * Clears locally cached imported scripts in order to force-reload them
       */
      cmd_clear_imports() {
        this._clearImports();

        return "";
      },

      /**
       * Asserts that the current url matches the given value (RegExp)
       * @param uri {String}
       */
      cmd_assert_uri(uri) {
        return "qx.core.Assert.assertEquals(window.location.href, \"".concat(uri, "\", \"Script is valid on '").concat(uri, "' only'\")");
      },

      /**
       * Asserts that the current url matches the given value (RegExp)
       * @param uri_regexp {String} A string containing a regular expression
       */
      cmd_assert_match_uri(uri_regexp) {
        if (this.getMode() === "presentation") {
          return "if(!window.location.href.match(new RegExp(\"".concat(uri_regexp, "\"))){alert(\"The eventrecorder script is meant to be played on a website that matches '").concat(uri_regexp, "'.\");window[\"").concat(this._globalRef, "\"].stop();}");
        }

        return "qx.core.Assert.assertMatch(window.location.href, \"".concat(uri_regexp, "\", \"Current URL does not match '").concat(uri_regexp, "'\")");
      },

      /**
       * Sets the player mode
       * @param mode
       * @return {string}
       */
      cmd_config_set_mode(mode) {
        return "window[\"".concat(this._globalRef, "\"].setMode(\"").concat(mode, "\");");
      },

      /**
       * Starts the definition of a macro
       * @param macro_name {String}
       * @param macro_description {String|undefined}
       * @return {null}
       */
      cmd_define(macro_name, macro_description) {
        if (this.macroExists(macro_name)) {
          throw new Error("Cannot define macro '".concat(macro_name, "' since a macro of that name already exists."));
        }

        this.addMacro(macro_name, macro_description);
        this.beginMacroDefintion(macro_name);
        return null;
      },

      /**
       * Ends the definition of a macro or a block of awaitable statements
       * @return {null}
       */
      cmd_end() {
        if (this.__P_38_4) {
          let line = this.__P_38_4.length ? "(Promise.all([".concat(this.__P_38_4.join(","), "]))") : null;
          this.__P_38_4 = null;
          return line;
        }

        if (this.__P_38_2 < 0) {
          throw new Error("Unexpected 'end'.");
        }

        this.leaveMacroDefinition();
        return null;
      },

      /**
       * Starts a block of statements that return promises. The player will wait for
       * all of the promises to resolve before proceeding.
       */
      cmd_await_all() {
        this.__P_38_4 = [];
        return null;
      }

    }
  });
  cboulanger.eventrecorder.player.Abstract.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Abstract.js.map?dt=1613267101636