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
      },
      "qookery.Qookery": {
        "construct": true
      },
      "qx.lang.String": {
        "construct": true
      },
      "qx.data.Conversion": {}
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
  qx.Class.define("qookery.internal.formats.MapFormat", {
    extend: qx.core.Object,
    implement: [qx.util.format.IFormat],
    construct: function construct(options) {
      qx.core.Object.constructor.call(this);
      var mapName = options["map"];
      this.__P_27_0 = qookery.Qookery.getRegistry().getMap(mapName);
      if (!this.__P_27_0) throw new Error(qx.lang.String.format("Map '%1' not registered", [mapName]));
      this.__P_27_1 = options["fallback"];
    },
    members: {
      __P_27_0: null,
      __P_27_1: null,
      format: function format(value) {
        if (value == null) return "";
        var mappedValue = this.__P_27_0[value];
        if (mappedValue != null) value = mappedValue;else if (this.__P_27_1 != null) value = this.__P_27_1;
        return qx.data.Conversion.toString(value);
      },
      parse: function parse(text) {
        return text;
      }
    }
  });
  qookery.internal.formats.MapFormat.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MapFormat.js.map?dt=1613267100874