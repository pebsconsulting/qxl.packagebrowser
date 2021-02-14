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
      "qx.log.Logger": {},
      "qx.test.log.fixture.ClassA": {},
      "qx.test.log.fixture.ClassB1": {},
      "qx.test.log.fixture.ClassC1": {},
      "qx.test.log.fixture.ClassB2": {},
      "qx.test.log.fixture.ClassC2": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("qx.test.log.DeprecationMethodOverriding", {
    extend: qx.dev.unit.TestCase,
    members: {
      __P_250_0: null,
      __P_250_1: null,
      __P_250_2: null,
      setUp: function setUp() {
        this.__P_250_1 = qx.log.Logger.warn;
        this.__P_250_2 = qx.log.Logger.trace;
        var that = this;

        qx.log.Logger.warn = function (msg) {
          that.__P_250_0 = msg;
        };

        qx.log.Logger.trace = function () {};
      },
      tearDown: function tearDown() {
        qx.log.Logger.warn = this.__P_250_1;
        qx.log.Logger.trace = this.__P_250_2;
        this.__P_250_1 = null;
        this.__P_250_2 = null;
        this.__P_250_0 = null;
      },
      "testClassA: baseclass": function testClassABaseclass() {
        var instance = new qx.test.log.fixture.ClassA();

        this.__P_250_3(instance, 1, 1, null);

        instance.dispose();
      },
      "testClassB1: overrides method": function testClassB1OverridesMethod() {
        var instance = new qx.test.log.fixture.ClassB1();

        this.__P_250_3(instance, 2, 2, /qx.test.log.fixture.ClassB1.prototype._applyOldProperty()/);

        instance.dispose();
      },
      "testClassC1: doesn't override method": function testClassC1DoesnTOverrideMethod() {
        var instance = new qx.test.log.fixture.ClassC1();

        this.__P_250_3(instance, 2, 3, /qx.test.log.fixture.ClassB1.prototype._applyOldProperty()/);

        instance.dispose();
      },
      "testClassB2: doesn't override method": function testClassB2DoesnTOverrideMethod() {
        var instance = new qx.test.log.fixture.ClassB2();

        this.__P_250_3(instance, 1, 2, null);

        instance.dispose();
      },
      "testClassC2: overrides method": function testClassC2OverridesMethod() {
        var instance = new qx.test.log.fixture.ClassC2();

        this.__P_250_3(instance, 2, 3, /qx.test.log.fixture.ClassC2.prototype._applyOldProperty()/);

        instance.dispose();
      },
      __P_250_3: function __P_250_3(instance, callCountOldProperty, callCountNewProperty, reqExpWarnMsg) {
        instance.setOldProperty("Jo");
        instance.setNewProperty("Do");
        this.assertEquals(callCountOldProperty, instance.getCallCountApplyOldProperty());
        this.assertEquals(callCountNewProperty, instance.getCallCountApplyNewProperty());
      }
    }
  });
  qx.test.log.DeprecationMethodOverriding.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=DeprecationMethodOverriding.js.map?dt=1613269464220