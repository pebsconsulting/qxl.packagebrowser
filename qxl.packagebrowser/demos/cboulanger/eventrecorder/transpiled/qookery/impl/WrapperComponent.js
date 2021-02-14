(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qookery.internal.components.Component": {
        "construct": true,
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
   * Class wrapping Qooxdoo widgets as Qookery components
   */
  qx.Class.define("qookery.impl.WrapperComponent", {
    extend: qookery.internal.components.Component,
    construct: function construct(widgetClass, parentComponent) {
      qookery.internal.components.Component.constructor.call(this, parentComponent);
      this.__P_8_0 = widgetClass;
    },
    members: {
      __P_8_0: null,
      _createWidgets: function _createWidgets() {
        var mainWidget = new this.__P_8_0(this);

        this._applyWidgetAttributes(mainWidget);

        return [mainWidget];
      }
    }
  });
  qookery.impl.WrapperComponent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=WrapperComponent.js.map?dt=1613267099549