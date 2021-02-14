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
      "qookery.IValidator": {
        "require": true
      },
      "qx.locale.Manager": {},
      "qookery.util.ValidationError": {}
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
  qx.Class.define("qookery.internal.validators.NotNullValidator", {
    extend: qx.core.Object,
    implement: [qookery.IValidator],
    type: "singleton",
    construct: function construct() {
      qx.core.Object.constructor.call(this);
    },
    members: {
      createValidation: function createValidation(component, invalidMessage, options) {
        return function (value) {
          if (value !== null) return null;
          if (!invalidMessage) invalidMessage = qx.locale.Manager.tr("qookery.internal.validators.NotNullValidator.invalidMessage");
          return new qookery.util.ValidationError(component, invalidMessage, null);
        };
      }
    }
  });
  qookery.internal.validators.NotNullValidator.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=NotNullValidator.js.map?dt=1613267101121