(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qookery.internal.components.EditableComponent": {
        "construct": true,
        "require": true
      },
      "qx.ui.form.CheckBox": {}
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
  qx.Class.define("qookery.internal.components.CheckFieldComponent", {
    extend: qookery.internal.components.EditableComponent,
    properties: {
      triState: {
        init: false,
        inheritable: true,
        check: "Boolean",
        nullable: true,
        apply: "__P_12_0"
      }
    },
    construct: function construct(parentComponent) {
      qookery.internal.components.EditableComponent.constructor.call(this, parentComponent);
    },
    members: {
      // Metadata
      getAttributeType: function getAttributeType(attributeName) {
        switch (attributeName) {
          case "check-box-label":
            return "ReplaceableString";

          case "tri-state":
            return "Boolean";
        }

        return qookery.internal.components.CheckFieldComponent.prototype.getAttributeType.base.call(this, attributeName);
      },
      // Creation
      create: function create(attributes) {
        qookery.internal.components.CheckFieldComponent.prototype.create.base.call(this, attributes);

        this._applyAttribute("tri-state", this, "triState");
      },
      _createMainWidget: function _createMainWidget() {
        var checkBox = new qx.ui.form.CheckBox();
        var label = this.getAttribute("check-box-label");
        if (label !== undefined) checkBox.setLabel(label);
        checkBox.addListener("changeValue", function (event) {
          if (this._disableValueEvents) return;
          this.setValue(event.getData());
        }, this); // Below hack works around chechbox shortcomings with triple state values

        if (this.getAttribute("tri-state", false)) {
          checkBox.__P_12_1 = [true, false, null];

          checkBox.toggleValue = function () {
            this.__P_12_2 = this.__P_12_1.indexOf(this.getValue());
            this.__P_12_2 = this.__P_12_2 >= 2 ? 0 : this.__P_12_2 + 1;
            this.setValue(this.__P_12_1[this.__P_12_2]);
          }.bind(checkBox);
        }

        this._applyWidgetAttributes(checkBox);

        return checkBox;
      },
      // Component implementation
      _updateUI: function _updateUI(value) {
        this.getMainWidget().setValue(value);
      },
      _applyEnabled: function _applyEnabled(enabled) {
        var labelWidget = this.getLabelWidget();
        if (labelWidget != null) labelWidget.setEnabled(enabled);

        this.__P_12_3();
      },
      _applyReadOnly: function _applyReadOnly(readOnly) {
        qookery.internal.components.CheckFieldComponent.prototype._applyReadOnly.base.call(this, readOnly);

        this.__P_12_3();
      },
      __P_12_3: function __P_12_3() {
        var isEnabled = this.getEnabled();
        var isReadOnly = this.getReadOnly();
        this.getMainWidget().setEnabled(isEnabled && !isReadOnly);
      },
      // Internals
      __P_12_0: function __P_12_0(triState) {
        this.getMainWidget().setTriState(triState);
        this.getMainWidget().setValue(null);
      }
    }
  });
  qookery.internal.components.CheckFieldComponent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=CheckFieldComponent.js.map?dt=1613267099902