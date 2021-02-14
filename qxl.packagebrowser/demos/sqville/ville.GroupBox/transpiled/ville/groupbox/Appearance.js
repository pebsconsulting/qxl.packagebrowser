(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     Copyright: 2021 sqville
  
     License: MIT
  
     Authors: Chris Eskew (sqville)
  
  ************************************************************************ */
  qx.Theme.define("ville.groupbox.Appearance", {
    appearances: {
      /*
      ---------------------------------------------------------------------------
        VILLE GROUP BOX
      ---------------------------------------------------------------------------
      */
      "ville-groupbox": {},
      "ville-groupbox/legend": {
        alias: "atom",
        style: function style(states) {
          return {
            paddingRight: 35,
            margin: 4
          };
        }
      },
      "ville-groupbox/frame": {
        style: function style(states) {
          return {
            backgroundColor: "background",
            padding: [6, 9],
            margin: [18, 2, 2, 2],
            decorator: "white-box"
          };
        }
      },
      "ville-groupbox/open": {
        include: "image",
        style: function style(states) {
          return {
            height: 30,
            decorator: states.opened ? "ville-groupbox-open" : "ville-groupbox-closed"
          };
        }
      },
      "ville-groupbox-connected": {
        alias: "groupbox",
        style: function style(states) {
          return {
            decorator: "white-box",
            contentPadding: 10
          };
        }
      },
      "ville-groupbox-connected/legend": {
        include: "groupbox/legend",
        style: function style(states) {
          return {
            font: "area-header",
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 12
          };
        }
      },
      "ville-groupbox-connected/frame": {
        include: "groupbox/frame",
        style: function style(states) {
          return {
            marginTop: 30,
            decorator: "ville-connected-top-box"
          };
        }
      },
      "ville-groupbox-connected/open": {
        include: "ville-groupbox/open",
        style: function style(states) {
          return {
            height: 60
          };
        }
      }
    }
  });
  ville.groupbox.Appearance.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Appearance.js.map?dt=1613269808626