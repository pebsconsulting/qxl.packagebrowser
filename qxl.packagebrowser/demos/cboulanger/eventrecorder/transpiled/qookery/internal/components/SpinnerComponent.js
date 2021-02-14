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
      "qx.ui.form.Spinner": {}
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
  qx.Class.define("qookery.internal.components.SpinnerComponent", {
    extend: qookery.internal.components.EditableComponent,
    construct: function construct(parentComponent) {
      qookery.internal.components.EditableComponent.constructor.call(this, parentComponent);
    },
    members: {
      // Metadata
      getAttributeType: function getAttributeType(attributeName) {
        switch (attributeName) {
          case "content-padding":
            return "IntegerList";

          case "content-padding-bottom":
            return "Integer";

          case "content-padding-left":
            return "Integer";

          case "content-padding-right":
            return "Integer";

          case "content-padding-top":
            return "Integer";
        }

        return qookery.internal.components.SpinnerComponent.prototype.getAttributeType.base.call(this, attributeName);
      },
      // Construction
      _createMainWidget: function _createMainWidget() {
        var spinner = new qx.ui.form.Spinner();

        this._applyWidgetAttributes(spinner);

        spinner.setMinimum(this.getAttribute("minimum", 0));
        spinner.setMaximum(this.getAttribute("maximum", 100));
        spinner.setPageStep(this.getAttribute("page-step", 10));
        spinner.setSingleStep(this.getAttribute("single-step", 1));
        spinner.addListener("changeValue", function (event) {
          if (this._disableValueEvents) return;
          var value = event.getData();
          if (value !== null) value = parseInt(value, 10);

          this._setValueSilently(value);
        }, this);
        spinner.getChildControl("textfield").setTextAlign(this.getAttribute("text-align", null));

        this._applyAttribute("content-padding", spinner, "contentPadding");

        this._applyAttribute("content-padding-top", spinner, "contentPaddingTop");

        this._applyAttribute("content-padding-right", spinner, "contentPaddingRight");

        this._applyAttribute("content-padding-bottom", spinner, "contentPaddingBottom");

        this._applyAttribute("content-padding-left", spinner, "contentPaddingLeft");

        return spinner;
      },
      _updateUI: function _updateUI(value) {
        if (value === null) this.getMainWidget().resetValue();else this.getMainWidget().setValue(parseInt(value, 10));
      },
      _applyFormat: function _applyFormat(format) {
        this.getMainWidget().setNumberFormat(format);
      }
    }
  });
  qookery.internal.components.SpinnerComponent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=SpinnerComponent.js.map?dt=1613267100564