(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.ui.virtual.layer.LayerTestCase": {
        "require": true
      },
      "qx.ui.virtual.layer.GridLines": {}
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
     * Jonathan Weiß (jonathan_rass)
     * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */
  qx.Class.define("qx.test.ui.virtual.layer.GridLinesVertical", {
    extend: qx.test.ui.virtual.layer.LayerTestCase,
    members: {
      _createLayer: function _createLayer() {
        return new qx.ui.virtual.layer.GridLines("vertical");
      },
      _assertCells: function _assertCells(firstRow, firstColumn, rowCount, columnCount, msg) {
        var children = this.layer.getContentElement().getDomElement().childNodes;
        this.assertEquals(columnCount - 1, children.length);
      }
    }
  });
  qx.test.ui.virtual.layer.GridLinesVertical.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=GridLinesVertical.js.map?dt=1613268992640