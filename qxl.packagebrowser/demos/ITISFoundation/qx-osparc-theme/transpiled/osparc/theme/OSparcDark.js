(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "osparc.theme.osparcdark.Color": {
        "require": true
      },
      "osparc.theme.common.Decoration": {
        "require": true
      },
      "osparc.theme.common.Font": {
        "require": true
      },
      "osparc.theme.common.Appearance": {
        "require": true
      },
      "qx.theme.icon.Tango": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
    OSparc Dark Theme for Qooxdoo
  
    Copyright:
       2018 IT'IS Foundation
  
    License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
    Authors:
      * Tobias Oetiker (oetiker)
  
    Origin:
      This theme is based in large parts on the the Simple
      theme included with Qooxdoo.
  ************************************************************************ */

  /**
   * Simple Theme
   */
  qx.Theme.define("osparc.theme.OSparcDark", {
    title: "OSparc Dark Theme",
    meta: {
      color: osparc.theme.osparcdark.Color,
      decoration: osparc.theme.common.Decoration,
      font: osparc.theme.common.Font,
      appearance: osparc.theme.common.Appearance,
      icon: qx.theme.icon.Tango
    }
  });
  osparc.theme.OSparcDark.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=OSparcDark.js.map?dt=1613267456017