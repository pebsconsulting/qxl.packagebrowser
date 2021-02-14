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
      "qx.util.format.IFormat": {
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
  qx.Class.define("qookery.internal.formats.CustomFormat", {
    extend: qx.core.Object,
    implement: [qx.util.format.IFormat],
    construct: function construct(options) {
      qx.core.Object.constructor.call(this);
      var expression = options["expression"];

      if (expression) {
        this.__P_26_0 = new Function(["value"], "return(" + expression + ");");
        return;
      }

      var format = options["format"];

      if (format) {
        this.__P_26_0 = format;
        return;
      }

      throw new Error("An expression or function must be provided");
    },
    members: {
      __P_26_0: null,
      format: function format(obj) {
        if (!this.__P_26_0) return obj;

        try {
          return this.__P_26_0.apply(this, [obj]);
        } catch (e) {
          this.error("Error applying custom format", e);
          return "";
        }
      },
      parse: function parse(str) {
        throw new Error("Parsing is not supported");
      }
    }
  });
  qookery.internal.formats.CustomFormat.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=CustomFormat.js.map?dt=1613267100846