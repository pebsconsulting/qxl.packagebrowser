!function(){var e={dependsOn:{"qx.Class":{usage:"dynamic",require:!0},"widgetbrowser.pages.AbstractPage":{construct:!0,require:!0},"qx.type.Array":{},"qx.ui.table.model.Simple":{},"qx.ui.table.Table":{},"qx.ui.table.selection.Model":{},"qx.ui.table.cellrenderer.Boolean":{},"qx.ui.table.headerrenderer.Icon":{}}};qx.Bootstrap.executePendingDefers(e);qx.Class.define("widgetbrowser.pages.Table",{extend:widgetbrowser.pages.AbstractPage,construct:function(){widgetbrowser.pages.AbstractPage.constructor.call(this);this.initWidgets()},members:{__P_81_0:0,initWidgets:function(){var e=this._widgets=new qx.type.Array,t=this.__P_81_1();t.setFocusedCell(2,5);e.push(t);this.add(t)},__P_81_1:function(){var e=this.__P_81_2(500),t=new qx.ui.table.model.Simple;t.setColumns(["ID","A number","A date","Boolean"]);t.setData(e);t.setColumnEditable(1,!0);t.setColumnEditable(2,!0);t.setColumnSortable(3,!1);var a=new qx.ui.table.Table(t);a.set({width:600,height:400,decorator:null});a.getSelectionModel().setSelectionMode(qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION);var r=a.getTableColumnModel();r.setDataCellRenderer(3,new qx.ui.table.cellrenderer.Boolean);r.setHeaderCellRenderer(2,new qx.ui.table.headerrenderer.Icon("icon/16/apps/office-calendar.png","A date"));return a},__P_81_2:function(e){for(var t=[],a=(new Date).getTime(),r=0;r<e;r++){var n=new Date(a+3456e7*Math.random()-1728e7);t.push([this.__P_81_0++,1e4*Math.random(),n,Math.random()>.5])}return t}}});widgetbrowser.pages.Table.$$dbClassInfo=e}();qx.$$packageData[3]={locales:{},resources:{},translations:{}};
//# sourceMappingURL=package-3.js.map