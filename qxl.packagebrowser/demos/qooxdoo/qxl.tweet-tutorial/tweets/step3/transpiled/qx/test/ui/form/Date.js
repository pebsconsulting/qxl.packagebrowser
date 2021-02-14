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
      "qx.ui.form.IDateForm": {},
      "qx.ui.form.DateField": {},
      "qx.ui.control.DateChooser": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */
  qx.Class.define("qx.test.ui.form.Date", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      __P_293_0: function __P_293_0(widget) {
        // check if the interface is implemented
        this.assertTrue(qx.Class.hasInterface(widget.constructor, qx.ui.form.IDateForm), "Interface is not implemented."); // check for the init value

        this.assertNull(widget.getValue(), "Wrong init value set."); // just check if the method is available

        widget.resetValue(); // check the getter and setter

        var date = new Date(1981, 1, 10);
        widget.setValue(date);
        this.assertEquals(date.toString(), widget.getValue().toString(), "Set or get does not work.");
        var date2 = new Date(2009, 4, 1);
        this.assertEventFired(widget, "changeValue", function () {
          widget.setValue(date2);
        }, function (e) {// do nothing
        }, "Event is wrong!"); // test for null values

        widget.setValue(null);
        widget.destroy();
      },
      testDateField: function testDateField() {
        var df = new qx.ui.form.DateField();

        this.__P_293_0(df);

        df.dispose();
      },
      testDateChooser: function testDateChooser() {
        var dc = new qx.ui.control.DateChooser();

        this.__P_293_0(dc);

        dc.dispose();
      },
      testDateFieldIsEmpty: function testDateFieldIsEmpty() {
        var field = new qx.ui.form.DateField();
        this.assertTrue(field.isEmpty(), "DateField should be empty on initialization.");
        field.dispose();
      },
      testDateFieldPopupState: function testDateFieldPopupState() {
        var field = new qx.ui.form.DateField();
        this.getRoot().add(field);
        this.flush();
        field.open();
        this.flush();
        this.assertTrue(field.hasState("popupOpen"));
        field.close();
        this.flush();
        this.assertFalse(field.hasState("popupOpen"));
        this.getRoot().remove(field);
        this.flush();
        field.dispose();
        field = null;
      }
    }
  });
  qx.test.ui.form.Date.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Date.js.map?dt=1613268888413