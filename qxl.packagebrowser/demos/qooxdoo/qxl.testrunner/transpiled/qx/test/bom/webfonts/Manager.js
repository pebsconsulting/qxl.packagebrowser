(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.bom.webfonts.Abstract": {
        "require": true
      },
      "qx.dev.unit.MRequirements": {
        "require": true
      },
      "qx.util.ResourceManager": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.webfonts.Manager": {},
      "qx.bom.webfonts.WebFont": {},
      "qx.event.Timer": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
  ************************************************************************ */

  /* ************************************************************************
  ************************************************************************ */

  /**
   *
   * @asset(qx/test/webfonts/*)
   */
  qx.Class.define("qx.test.bom.webfonts.Manager", {
    extend: qx.test.bom.webfonts.Abstract,
    include: [qx.dev.unit.MRequirements],
    members: {
      __P_26_0: {
        finelinerScript: {
          family: "FinelinerScriptRegular",
          source: [qx.util.ResourceManager.getInstance().toUri("qx/test/webfonts/fineliner_script-webfont.woff"), qx.util.ResourceManager.getInstance().toUri("qx/test/webfonts/fineliner_script-webfont.ttf"), qx.util.ResourceManager.getInstance().toUri("qx/test/webfonts/fineliner_script-webfont.eot")]
        },
        fontawesome: {
          family: "FontAwesome",
          source: [qx.util.ResourceManager.getInstance().toUri("qx/test/webfonts/fontawesome-webfont.woff"), qx.util.ResourceManager.getInstance().toUri("qx/test/webfonts/fontawesome-webfont.ttf"), qx.util.ResourceManager.getInstance().toUri("qx/test/webfonts/fontawesome-webfont.eot")]
        },
        invalid: {
          family: "MonkeypooBold",
          source: ["404.woff", "404.ttf", "404.eot"]
        }
      },
      __P_26_1: function __P_26_1(familyName) {
        var reg = new RegExp("@font-face.*?" + familyName, "m");

        var helper = function helper(cssText) {
          cssText = cssText.replace(/\n/g, "").replace(/\r/g, "");

          if (reg.exec(cssText)) {
            return true;
          }

          return false;
        };

        for (var i = 0, l = document.styleSheets.length; i < l; i++) {
          var sheet = document.styleSheets[i];

          if (sheet.cssText) {
            if (helper(sheet.cssText)) {
              return true;
            }
          } else if (sheet.cssRules) {
            for (var j = 0, m = sheet.cssRules.length; j < m; j++) {
              if (helper(sheet.cssRules[j].cssText)) {
                return true;
              }
            }
          }
        }

        return false;
      },
      setUp: function setUp() {
        this.require(["webFontSupport"]);

        this.__P_26_2 = document.body.childNodes.length;
        this.__P_26_3 = document.styleSheets.length;
        this.__P_26_4 = qx.bom.webfonts.Manager.getInstance();
      },
      tearDown: function tearDown() {
        this.__P_26_4.dispose();

        qx.bom.webfonts.Manager.VALIDATION_TIMEOUT = 5000;
        delete qx.bom.webfonts.Manager.$$instance;
        this.__P_26_4 = null;
        this.assertEquals(this.__P_26_2, document.body.childNodes.length, "Manager did not remove all nodes!");
        this.assertEquals(this.__P_26_3, document.styleSheets.length, "Manager did not remove stylesheet!");
      },
      "test: create rule for valid font": function testCreateRuleForValidFont() {
        var font = new qx.bom.webfonts.WebFont();
        font.set({
          size: 18,
          family: ["monospace"],
          sources: [this.__P_26_0.finelinerScript]
        });
        qx.event.Timer.once(function () {
          this.resume(function () {
            var foundRule = this.__P_26_1(this.__P_26_0.finelinerScript.family);

            this.assertTrue(foundRule, "@font-face rule not found in document styles!");
          }, this);
        }, this, 2000);
        this.wait(3000);
      },
      "test: do not create rule for invalid font": function testDoNotCreateRuleForInvalidFont() {
        qx.bom.webfonts.Manager.VALIDATION_TIMEOUT = 100;
        var font = new qx.bom.webfonts.WebFont();
        font.set({
          family: ["monospace"],
          sources: [this.__P_26_0.invalid]
        });
        var that = this;
        window.setTimeout(function () {
          that.resume(function () {
            var foundRule = this.__P_26_1(this.__P_26_0.invalid.family);

            this.assertFalse(foundRule, "@font-face rule for invalid font found in document styles!");
          }, that);
        }, 2000);
        this.wait(3000);
      },
      "test: load webfont whith custom comparisonString": function testLoadWebfontWhithCustomComparisonString() {
        qx.bom.webfonts.Manager.VALIDATION_TIMEOUT = 100;
        var font = new qx.bom.webfonts.WebFont();
        font.set({
          family: ["fontawesome"],
          comparisonString: "\uF206\uF1E3\uF118\uF2A7",
          sources: [this.__P_26_0.fontawesome]
        });
        var that = this;
        window.setTimeout(function () {
          that.resume(function () {
            var foundRule = this.__P_26_1(this.__P_26_0.fontawesome.family);

            this.assertTrue(foundRule, "@font-face rule for custom comparisonString font not found in document styles!");
          }, that);
        }, 2000);
        this.wait(3000);
      },
      "test: load webfont with custom version": function testLoadWebfontWithCustomVersion() {
        var font = new qx.bom.webfonts.WebFont();
        font.set({
          family: ["monospace"],
          version: "1.0",
          sources: [this.__P_26_0.finelinerScript]
        });
        qx.event.Timer.once(function () {
          this.resume(function () {
            var foundRule = false; // it is browser dependent which type of font is loaded (woff, eot or ttf) so we have to
            // check all given types, stopping the loop if the font rule was found

            for (var n = 0; n < this.__P_26_0.finelinerScript.source.length && foundRule === false; n++) {
              foundRule = this.__P_26_1(this.__P_26_0.finelinerScript.source[n] + "\\?1\\.0");
            }

            this.assertTrue(foundRule, "@font-face rule for custom version not found in document styles!");
          }, this);
        }, this, 2000);
        this.wait(3000);
      }
    }
  });
  qx.test.bom.webfonts.Manager.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Manager.js.map?dt=1613268423053