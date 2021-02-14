(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      },
      "qookery.ILayoutFactory": {
        "require": true
      },
      "qookery.Qookery": {},
      "qx.ui.layout.Flow": {}
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
  qx.Class.define("qookery.internal.layouts.FlowLayoutFactory", {
    extend: qx.core.Object,
    implement: [qookery.ILayoutFactory],
    type: "singleton",
    members: {
      createLayout: function createLayout(attributes) {
        var defaultSpacingX = qookery.Qookery.getOption(qookery.Qookery.OPTION_DEFAULT_LAYOUT_SPACING_X, 0);
        var defaultSpacingY = qookery.Qookery.getOption(qookery.Qookery.OPTION_DEFAULT_LAYOUT_SPACING_Y, 0);
        var layout = new qx.ui.layout.Flow(defaultSpacingX, defaultSpacingY, "left");
        var alignX = attributes.getAttribute("layout-align-x");
        if (alignX != null) layout.setAlignX(alignX);
        var alignY = attributes.getAttribute("layout-align-y");
        if (alignY != null) layout.setAlignY(alignY);
        var reversed = attributes.getAttribute("reversed");
        if (reversed != null) layout.setReversed(reversed);
        var spacing = attributes.getAttribute("spacing");

        if (spacing != null) {
          layout.setSpacingX(spacing);
          layout.setSpacingY(spacing);
        }

        var spacingX = attributes.getAttribute("spacing-x");
        if (spacingX != null) layout.setSpacingX(spacingX);
        var spacingY = attributes.getAttribute("spacing-y");
        if (spacingY != null) layout.setSpacingY(spacingY);
        return layout;
      }
    }
  });
  qookery.internal.layouts.FlowLayoutFactory.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=FlowLayoutFactory.js.map?dt=1613267100927