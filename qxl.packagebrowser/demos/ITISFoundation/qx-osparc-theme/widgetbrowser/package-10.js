!function(){var e={dependsOn:{"qx.Class":{usage:"dynamic",require:!0},"widgetbrowser.pages.AbstractPage":{construct:!0,require:!0},"qx.ui.layout.Canvas":{construct:!0},"qx.util.ResourceManager":{},"qx.ui.splitpane.Pane":{},"qx.ui.basic.Label":{},"qx.ui.container.Composite":{},"qx.ui.embed.Iframe":{},"qx.ui.embed.ThemedIframe":{}}};qx.Bootstrap.executePendingDefers(e);qx.Class.define("widgetbrowser.pages.EmbedFrame",{extend:widgetbrowser.pages.AbstractPage,construct:function(){widgetbrowser.pages.AbstractPage.constructor.call(this);this.setLayout(new qx.ui.layout.Canvas(10));this.initWidgets()},members:{initWidgets:function(){var e,t,a,i=this._widgets,s=qx.util.ResourceManager.getInstance().toUri("widgetbrowser/blank.html"),r=new qx.ui.splitpane.Pane("horizontal");r.getChildControl("splitter").setBackgroundColor(null);this.add(r);e=new qx.ui.basic.Label("Iframe");t=new qx.ui.container.Composite(new qx.ui.layout.Canvas);var n=(new qx.ui.embed.Iframe).set({source:s,width:300,height:200});i.push(n);t.add(e,{top:0,left:5});t.add(n,{top:20,left:0,right:0});e=new qx.ui.basic.Label("ThemedIframe");a=new qx.ui.container.Composite(new qx.ui.layout.Canvas);var o=(new qx.ui.embed.ThemedIframe).set({source:s,width:300,height:200});i.push(o);a.add(e,{top:0,left:5});a.add(o,{top:20,left:0,right:0});r.add(t);r.add(a)}}});widgetbrowser.pages.EmbedFrame.$$dbClassInfo=e}();qx.$$packageData[10]={locales:{},resources:{},translations:{}};
//# sourceMappingURL=package-10.js.map