(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qookery.internal.components.AtomComponent": {
        "construct": true,
        "require": true
      },
      "qx.ui.form.HoverButton": {}
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
  qx.Class.define("qookery.internal.components.HoverButtonComponent", {
    extend: qookery.internal.components.AtomComponent,
    construct: function construct(parentComponent) {
      qookery.internal.components.AtomComponent.constructor.call(this, parentComponent);
    },
    members: {
      // Metadata
      getAttributeType: function getAttributeType(attributeName) {
        switch (attributeName) {
          case "interval":
            return "Integer";
        }

        return qookery.internal.components.HoverButtonComponent.prototype.getAttributeType.base.call(this, attributeName);
      },
      // Construction
      _createAtomWidget: function _createAtomWidget() {
        var button = new qx.ui.form.HoverButton();

        this._applyAttribute("interval", button, "interval");

        this._applyAtomAttributes(button);

        return button;
      },
      // Public methods
      getCommand: function getCommand() {
        return this.getMainWidget().getCommand();
      },
      setCommand: function setCommand(command) {
        this.getMainWidget().setCommand(command);
      },
      execute: function execute() {
        this.getMainWidget().execute();
      }
    }
  });
  qookery.internal.components.HoverButtonComponent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=HoverButtonComponent.js.map?dt=1613267100273