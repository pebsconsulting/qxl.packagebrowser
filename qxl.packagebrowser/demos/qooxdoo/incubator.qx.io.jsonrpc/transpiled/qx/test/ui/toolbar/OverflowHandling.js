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
      "qx.ui.container.Composite": {},
      "qx.ui.layout.VBox": {},
      "qx.ui.toolbar.ToolBar": {},
      "qx.ui.toolbar.Button": {},
      "qx.ui.core.Spacer": {},
      "qx.ui.basic.Label": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2010 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */
  qx.Class.define("qx.test.ui.toolbar.OverflowHandling", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      __P_330_0: null,
      __P_330_1: null,
      __P_330_2: null,
      __P_330_3: null,
      __P_330_4: null,
      __P_330_5: null,
      setUp: function setUp() {
        qx.test.ui.toolbar.OverflowHandling.prototype.setUp.base.call(this);
        this.__P_330_0 = new qx.ui.container.Composite();

        this.__P_330_0.setLayout(new qx.ui.layout.VBox());

        this.getRoot().add(this.__P_330_0);

        this.__P_330_0.setWidth(100);

        this.__P_330_1 = new qx.ui.toolbar.ToolBar();

        this.__P_330_0.add(this.__P_330_1);

        this.__P_330_2 = new qx.ui.toolbar.Button("B1");
        this.__P_330_3 = new qx.ui.toolbar.Button("B2");
        this.__P_330_4 = new qx.ui.toolbar.Button("B3");
      },
      tearDown: function tearDown() {
        qx.test.ui.toolbar.OverflowHandling.prototype.tearDown.base.call(this);
        var self = this;

        this.__P_330_2.destroy();

        this.__P_330_3.destroy();

        this.__P_330_4.destroy();

        this.__P_330_1.destroy();

        this.__P_330_0.destroy();

        if (self.__P_330_5) {
          this.__P_330_5.destroy();
        }
      },
      __P_330_6: function __P_330_6() {
        this.__P_330_1.add(this.__P_330_2);

        this.__P_330_1.add(this.__P_330_3);

        this.__P_330_1.add(this.__P_330_4);
      },
      testShow: function testShow() {
        this.__P_330_6();

        this.__P_330_1.setShow("label");

        this.assertEquals(this.__P_330_1.getShow(), this.__P_330_2.getShow());
        this.assertEquals(this.__P_330_1.getShow(), this.__P_330_3.getShow());
        this.assertEquals(this.__P_330_1.getShow(), this.__P_330_4.getShow());

        this.__P_330_1.setShow("icon");

        this.assertEquals(this.__P_330_1.getShow(), this.__P_330_2.getShow());
        this.assertEquals(this.__P_330_1.getShow(), this.__P_330_3.getShow());
        this.assertEquals(this.__P_330_1.getShow(), this.__P_330_4.getShow());
      },
      testSpacing: function testSpacing() {
        this.__P_330_1.setSpacing(123);

        this.assertEquals(this.__P_330_1.getSpacing(), this.__P_330_1._getLayout().getSpacing());
      },
      testSpacer: function testSpacer() {
        this.__P_330_1.addSpacer();

        this.assertTrue(this.__P_330_1.getChildren()[0] instanceof qx.ui.core.Spacer);
      },
      testHideItem: function testHideItem() {
        this.__P_330_6();

        this.flush();

        this.__P_330_1.setOverflowHandling(true);

        var self = this;
        this.assertEventFired(this.__P_330_1, "hideItem", function () {
          self.__P_330_0.setWidth(60);

          self.flush();
        }, function (e) {
          self.assertEquals(self.__P_330_4, e.getData());
          self.assertEquals("excluded", self.__P_330_4.getVisibility());
        });
      },
      testShowItem: function testShowItem() {
        this.__P_330_6();

        this.flush();

        this.__P_330_1.setOverflowHandling(true);

        this.__P_330_0.setWidth(60);

        this.flush();
        var self = this;
        this.assertEventFired(this.__P_330_1, "showItem", function () {
          self.__P_330_0.setWidth(100);

          self.flush();
        }, function (e) {
          self.assertEquals(self.__P_330_4, e.getData());
          self.assertEquals("visible", self.__P_330_4.getVisibility());
        });
      },
      testHideItemPriority: function testHideItemPriority() {
        this.__P_330_6();

        this.flush();

        this.__P_330_1.setOverflowHandling(true);

        this.__P_330_1.setRemovePriority(this.__P_330_3, 2);

        var self = this;
        this.assertEventFired(this.__P_330_1, "hideItem", function () {
          self.__P_330_0.setWidth(60);

          self.flush();
        }, function (e) {
          self.assertEquals(self.__P_330_3, e.getData());
          self.assertEquals("excluded", self.__P_330_3.getVisibility());
        });
      },
      testShowItemPriority: function testShowItemPriority() {
        this.__P_330_6();

        this.flush();

        this.__P_330_1.setOverflowHandling(true);

        this.__P_330_1.setRemovePriority(this.__P_330_3, 2);

        this.__P_330_0.setWidth(60);

        this.flush();
        var self = this;
        this.assertEventFired(this.__P_330_1, "showItem", function () {
          self.__P_330_0.setWidth(100);

          self.flush();
        }, function (e) {
          self.assertEquals(self.__P_330_3, e.getData());
          self.assertEquals("visible", self.__P_330_3.getVisibility());
        });
      },
      testShowIndicator: function testShowIndicator(attribute) {
        this.__P_330_6();

        this.flush();

        this.__P_330_1.setOverflowHandling(true);

        this.__P_330_5 = new qx.ui.basic.Label(".");

        this.__P_330_1.add(this.__P_330_5);

        this.__P_330_1.setOverflowIndicator(this.__P_330_5);

        this.assertEquals("excluded", this.__P_330_5.getVisibility());

        this.__P_330_5.addListener("changeVisibility", function () {
          this.resume(function () {
            this.assertEquals("visible", this.__P_330_5.getVisibility());
          }, this);
        }, this);

        this.__P_330_0.setWidth(60);

        this.wait();
      },
      testHideIndicator: function testHideIndicator(attribute) {
        this.__P_330_6();

        this.flush();

        this.__P_330_1.setOverflowHandling(true);

        this.__P_330_5 = new qx.ui.basic.Label(".");

        this.__P_330_1.add(this.__P_330_5);

        this.__P_330_1.setOverflowIndicator(this.__P_330_5);

        this.assertEquals("excluded", this.__P_330_5.getVisibility());

        this.__P_330_0.setWidth(60);

        this.flush();

        this.__P_330_5.addListener("changeVisibility", function () {
          this.resume(function () {
            this.assertEquals("excluded", this.__P_330_5.getVisibility());
          }, this);
        }, this);

        this.__P_330_0.setWidth(160);

        this.wait();
      },
      testShowIndicatorHuge: function testShowIndicatorHuge(attribute) {
        this.__P_330_6();

        this.flush();

        this.__P_330_1.setOverflowHandling(true);

        this.__P_330_5 = new qx.ui.basic.Label(".....");

        this.__P_330_1.add(this.__P_330_5);

        this.__P_330_1.setOverflowIndicator(this.__P_330_5);

        this.assertEquals("excluded", this.__P_330_5.getVisibility());

        this.__P_330_3.addListener("changeVisibility", function () {
          this.resume(function () {
            this.assertEquals("visible", this.__P_330_5.getVisibility()); // check if both buttons have been removed

            this.assertEquals("excluded", this.__P_330_4.getVisibility(), "1");
            this.assertEquals("excluded", this.__P_330_3.getVisibility(), "2");
          }, this);
        }, this);

        this.__P_330_0.setWidth(60);

        this.wait();
      },
      testHideItemRemoved: function testHideItemRemoved() {
        this.__P_330_6();

        this.flush();

        this.__P_330_1.setOverflowHandling(true);

        this.__P_330_1.remove(this.__P_330_4);

        var self = this;
        this.assertEventNotFired(this.__P_330_1, "hideItem", function () {
          self.__P_330_0.setWidth(60);

          self.flush();
        });
      },
      testShowItemRemoved: function testShowItemRemoved() {
        this.__P_330_6();

        this.flush();

        this.__P_330_1.setOverflowHandling(true);

        this.__P_330_0.setWidth(60);

        this.flush();
        var self = this;
        this.assertEventFired(this.__P_330_1, "showItem", function () {
          self.__P_330_1.remove(self.__P_330_4);

          self.flush();
        }, function (e) {
          self.assertEquals(self.__P_330_4, e.getData());
          self.assertEquals("visible", self.__P_330_4.getVisibility());
        });
      },
      testAddItem: function testAddItem() {
        this.__P_330_5 = new qx.ui.basic.Label(".");

        this.__P_330_1.add(this.__P_330_5);

        this.__P_330_1.setOverflowIndicator(this.__P_330_5);

        this.__P_330_1.setOverflowHandling(true);

        this.__P_330_0.setWidth(60);

        this.flush();
        var self = this;
        this.assertEventFired(this.__P_330_5, "changeVisibility", function () {
          self.__P_330_6();

          self.flush();
        }, function (e) {
          self.assertEquals("visible", self.__P_330_5.getVisibility());
          self.assertEquals("excluded", self.__P_330_4.getVisibility());
        });
      }
    }
  });
  qx.test.ui.toolbar.OverflowHandling.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=OverflowHandling.js.map?dt=1613267717848