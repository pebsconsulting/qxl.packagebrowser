(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "require": true
      },
      "qx.event.type.Native": {},
      "qx.lang.Object": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */
  qx.Class.define("qx.test.event.type.Native", {
    extend: qx.dev.unit.TestCase,
    members: {
      testClone: function testClone() {
        var domEvent = {};
        var event = new qx.event.type.Native().init(domEvent, document.body, document.body, true, true);
        var clone = event.clone(); // simulate native event disposal

        qx.lang.Object.empty(domEvent);
        clone.preventDefault();
        event.dispose();
        clone.dispose();
      }
    }
  });
  qx.test.event.type.Native.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Native.js.map?dt=1613267713111