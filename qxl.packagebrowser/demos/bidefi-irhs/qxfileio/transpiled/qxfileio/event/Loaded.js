(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.type.Data": {
        "construct": true,
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   * Event fired when loading file ends successfully.
   *
   * Map the HTML FileReader onload event.
   */
  qx.Class.define("qxfileio.event.Loaded", {
    extend: qx.event.type.Data,
    construct: function construct() {
      qx.event.type.Data.constructor.call(this);
    }
  });
  qxfileio.event.Loaded.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Loaded.js.map?dt=1613267068736