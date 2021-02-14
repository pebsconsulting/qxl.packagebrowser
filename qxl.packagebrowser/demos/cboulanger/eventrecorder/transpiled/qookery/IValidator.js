(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
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
   * Validators are used by components to instanciate validation functions
   */
  qx.Interface.define("qookery.IValidator", {
    members: {
      /**
       * Create a validation function
       *
       * @param component {qookery.IComponent} component that will receive the new validation
       * @param invalidMessage {String?} message that will be displayed when validation fails
       * @param options {Map?} optional map with validator-specific arguments
       */
      createValidation: function createValidation(component, invalidMessage, options) {}
    }
  });
  qookery.IValidator.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IValidator.js.map?dt=1613267099190