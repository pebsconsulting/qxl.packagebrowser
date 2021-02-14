(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.ui.LayoutTestCase": {
        "require": true
      },
      "qx.ui.window.Manager": {},
      "qx.ui.window.Desktop": {},
      "qx.ui.window.Window": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
   qooxdoo - the new era of web development
  
   http://qooxdoo.org
  
   Copyright:
   2004-2009 1&1 Internet AG, Germany, http://www.1und1.de
  
   License:
       MIT: https://opensource.org/licenses/MIT
   See the LICENSE file in the project's top-level directory for details.
  
   Authors:
   * Fabian Jakobs (fjakobs)
  
   ************************************************************************ */
  qx.Class.define("qx.test.ui.window.Desktop", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      setUp: function setUp() {
        qx.test.ui.window.Desktop.prototype.setUp.base.call(this);
        var windowManager = new qx.ui.window.Manager();
        var desktop = new qx.ui.window.Desktop(windowManager);
        this.getRoot().add(desktop);
        this.desktop = desktop;
      },
      tearDown: function tearDown() {
        this.desktop.destroy();
        qx.test.ui.window.Desktop.prototype.tearDown.base.call(this);
        this.flush();
      },
      testEvents: function testEvents() {
        var window = new qx.ui.window.Window("Window");
        window.set({
          width: 300,
          height: 200,
          showClose: false,
          showMinimize: false
        });
        this.assertEventFired(this.desktop, "windowAdded", function () {
          this.desktop.add(window);
        }.bind(this));
        this.assertEventFired(this.desktop, "windowRemoved", function () {
          this.desktop.remove(window);
        }.bind(this));
      },
      destruct: function destruct() {
        this.desktop = null;
      }
    }
  });
  qx.test.ui.window.Desktop.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Desktop.js.map?dt=1613268794457