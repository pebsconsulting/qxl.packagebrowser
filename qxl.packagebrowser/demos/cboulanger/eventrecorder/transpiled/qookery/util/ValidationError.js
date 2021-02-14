(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      }
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
   * Instances of this class pack helpful information about discovered validation errors
   */
  qx.Class.define("qookery.util.ValidationError", {
    extend: Error,

    /**
     * Construct a new validation error
     *
     * @param source {any} value that represents the source of error
     * @param message {String?} error message
     * @param cause {Array?} array of underlying errors
     */
    construct: function construct(source, message, cause) {
      this.__P_32_0 = source;
      this.__P_32_1 = message;
      this.__P_32_2 = cause;
      Object.defineProperties(this, {
        "message": {
          enumerable: false,
          get: function get() {
            return this.getFormattedMessage();
          }
        }
      });
    },
    members: {
      __P_32_0: null,
      __P_32_1: null,
      __P_32_2: null,

      /**
       * Return the source of this error, if available
       *
       * @return {any} value that represents the source of error, may be <code>null</code>
       */
      getSource: function getSource() {
        return this.__P_32_0;
      },

      /**
       * Return a message for this error
       *
       * @return {String} error message, may be <code>null</code>
       */
      getMessage: function getMessage() {
        return this.__P_32_1;
      },

      /**
       * Return an array of errors that are the underlying cause of this error
       *
       * @return {Array} array of underlying errors or <code>null</code> if not set
       */
      getCause: function getCause() {
        return this.__P_32_2;
      },

      /**
       * Return the computed formatted message which describes this error is more detail
       *
       * @return {String} an error message, <code>null</code> is never returned
       */
      getFormattedMessage: function getFormattedMessage() {
        var message = this.__P_32_1 || "";

        if (this.__P_32_2 != null) {
          if (message) message += ": ";
          message += this.__P_32_2.map(function (cause) {
            return cause.getFormattedMessage();
          }).join("; ");
        }

        if (!message) message = "Nondescript error";
        return message;
      }
    }
  });
  qookery.util.ValidationError.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ValidationError.js.map?dt=1613267101176