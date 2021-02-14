(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.application.Native": {
        "require": true
      },
      "qx.log.appender.Console": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * The test loader is the base class of a native application, which can be used
   * to run tests from a non-GUI application or from within JSUnit.
   */
  qx.Class.define("qx.dev.unit.TestLoaderNative", {
    extend: qx.application.Native,

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      // overridden
      main: function main() {
        qx.dev.unit.TestLoaderNative.prototype.main.base.call(this); // Dependencies to loggers

        qx.log.appender.Console;
        this.setTestNamespace(this._getClassNameFromUrl());

        if (window.top.jsUnitTestSuite) {
          this.runJsUnit();
          return;
        }

        if (window == window.top) {
          this.runStandAlone();
          return;
        }
      }
    }
  });
  qx.dev.unit.TestLoaderNative.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TestLoaderNative.js.map?dt=1613268323160