(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Bootstrap": {
        "usage": "dynamic",
        "require": true
      },
      "qookery.Qookery": {
        "defer": "runtime"
      },
      "qookery.ace.internal.AceComponent": {
        "defer": "runtime"
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
  qx.Bootstrap.define("qookery.ace.Bootstrap", {
    defer: function defer() {
      qookery.Qookery.getRegistry().registerLibrary("ace", ["${q:external-libraries}/ace/ace.js"]);
      qookery.Qookery.getRegistry().registerLibrary("aceLanguageTools", ["${q:external-libraries}/ace/ext-language_tools.js"]);
      qookery.Qookery.getRegistry().registerComponentType("{http://www.qookery.org/ns/Form/Ace}editor", qookery.ace.internal.AceComponent);
    }
  });
  qookery.ace.Bootstrap.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Bootstrap.js.map?dt=1613267099250