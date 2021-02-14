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
      "qx.ui.form.Slider": {}
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
  qx.Class.define("qookery.internal.components.SliderComponent", {
    extend: qookery.internal.components.EditableComponent,
    construct: function construct(parentComponent) {
      qookery.internal.components.EditableComponent.constructor.call(this, parentComponent);
    },
    members: {
      _createMainWidget: function _createMainWidget() {
        var widget = new qx.ui.form.Slider();

        this._applyWidgetAttributes(widget);

        this._applyAttribute("minimum", widget, "minimum");

        this._applyAttribute("maximum", widget, "maximum");

        this._applyAttribute("page-step", widget, "pageStep");

        this._applyAttribute("single-step", widget, "singleStep");

        widget.addListener("changeValue", function (event) {
          if (this._disableValueEvents) return;
          this.setValue(event.getData());
        }, this);
        return widget;
      },
      _updateUI: function _updateUI(value) {
        if (!value) this.getMainWidget().resetValue();else this.getMainWidget().setValue(value);
      }
    }
  });
  qookery.internal.components.SliderComponent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=SliderComponent.js.map?dt=1613267100533