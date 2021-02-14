(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qookery.internal.components.EditableComponent": {
        "construct": true,
        "require": true
      },
      "qx.ui.table.Table": {},
      "qx.ui.table.columnmodel.Resize": {},
      "qx.ui.table.selection.Model": {},
      "qookery.util.Xml": {},
      "qx.lang.Type": {},
      "qookery.Qookery": {},
      "qookery.IRegistry": {},
      "qookery.impl.DefaultTableModel": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /*
  	Qookery - Declarative UI Building for Qooxdoo
  
  	Copyright (c) Ergobyte Informatics S.A., www.ergobyte.gr
  
  	Licensed under the Apache License, Version 2.0 (the "License");
  	you may not use this file except in compliance with the License.
  	You may obtain a copy of the License at
  
  		http://www.apache.org/licenses/LICENSE-2.0
  
  	Unless required by applicable law or agreed to in writing, software
  	distributed under the License is distributed on an "AS IS" BASIS,
  	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  	See the License for the specific language governing permissions and
  	limitations under the License.
  */
  qx.Class.define("qookery.internal.components.TableComponent", {
    extend: qookery.internal.components.EditableComponent,
    events: {
      "changeSelection": "qx.event.type.Data"
    },
    construct: function construct(parentComponent) {
      qookery.internal.components.EditableComponent.constructor.call(this, parentComponent);
      this.__P_22_0 = [];
    },
    properties: {
      value: {
        refine: true,
        init: []
      }
    },
    members: {
      __P_22_0: null,
      __P_22_1: null,
      // Metadata
      getAttributeType: function getAttributeType(attributeName) {
        switch (attributeName) {
          case "column-visibility-button-visible":
            return "Boolean";

          case "editable":
            return "Boolean";

          case "flex":
            return "Integer";

          case "header-cells-visible":
            return "Boolean";

          case "header-click":
            return "ReplaceableString";

          case "header-icon":
            return "String";

          case "row-height":
            return "Number";

          case "show-cell-focus-indicator":
            return "Boolean";

          case "sortable":
            return "Boolean";

          case "status-bar-visible":
            return "Boolean";

          default:
            return qookery.internal.components.TableComponent.prototype.getAttributeType.base.call(this, attributeName);
        }
      },
      // Creation
      _createMainWidget: function _createMainWidget() {
        var table = new qx.ui.table.Table(null, {
          tableColumnModel: function tableColumnModel(_table) {
            return new qx.ui.table.columnmodel.Resize(_table);
          }
        });
        var selectionMode;

        switch (this.getAttribute("selection-mode", "single")) {
          case "none":
            selectionMode = qx.ui.table.selection.Model.NO_SELECTION;
            break;

          case "single":
            selectionMode = qx.ui.table.selection.Model.SINGLE_SELECTION;
            break;

          case "single-interval":
            selectionMode = qx.ui.table.selection.Model.SINGLE_INTERVAL_SELECTION;
            break;

          case "multiple-interval":
            selectionMode = qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION;
            break;

          case "multiple-interval-toggle":
            selectionMode = qx.ui.table.selection.Model.MULTIPLE_INTERVAL_SELECTION_TOGGLE;
            break;
        }

        var selectionModel = table.getSelectionModel();
        selectionModel.setSelectionMode(selectionMode);
        selectionModel.addListener("changeSelection", function (event) {
          var isSingleSelection = event.getTarget().getSelectionMode() === qx.ui.table.selection.Model.SINGLE_SELECTION;
          var eventData = isSingleSelection ? this.getSingleSelection() : this.getSelection();
          this.fireDataEvent("changeSelection", eventData);
        }, this);

        this._applyWidgetAttributes(table);

        this._applyAttribute("column-visibility-button-visible", table, "columnVisibilityButtonVisible");

        this._applyAttribute("row-height", table, "rowHeight");

        this._applyAttribute("status-bar-visible", table, "statusBarVisible");

        this._applyAttribute("show-cell-focus-indicator", table, "showCellFocusIndicator");

        this._applyAttribute("header-cells-visible", table, "headerCellsVisible");

        return table;
      },
      parseXmlElement: function parseXmlElement(elementName, xmlElement) {
        switch (elementName) {
          case "{http://www.qookery.org/ns/Form}table-model":
            if (this.__P_22_1) throw new Error("Table model has already been created");
            var tableModelClassName = qookery.util.Xml.getAttribute(xmlElement, "class", Error);
            var tableModelClass = qx.Class.getByName(tableModelClassName);
            this.__P_22_1 = new tableModelClass(this, xmlElement);
            return true;

          case "{http://www.qookery.org/ns/Form}table-column":
            var column = qookery.util.Xml.parseAllAttributes(this, xmlElement);
            this.addColumn(column);
            return true;
        }

        return false;
      },
      setup: function setup() {
        if (this.__P_22_0.length === 0) throw new Error("Table must have at least one column");
        var table = this.getMainWidget();
        var tableModel = this.getTableModel();

        if (qx.lang.Type.isFunction(tableModel["setup"])) {
          // Give model a chance to perform last minute changes
          tableModel["setup"].call(tableModel, table, this.__P_22_0);
        }

        table.setTableModel(tableModel);
        var columnModel = table.getTableColumnModel();
        var resizeBehavior = columnModel.getBehavior();

        for (var i = 0; i < this.__P_22_0.length; i++) {
          var column = this.__P_22_0[i];
          if (column["visibility"] == "excluded") continue;

          if (column["width"] != null || column["flex"] != null) {
            var width = column["width"];
            if (width == null) width = undefined;else if (qx.lang.Type.isNumber(width)) ;else if (qx.lang.Type.isString(width)) {
              if (width.endsWith("*") || width.endsWith("%")) ;else width = parseInt(width, 10);
            } else throw new Error("Illegal value set as column width");
            var flex = column["flex"];
            if (flex == null) flex = undefined;else if (qx.lang.Type.isNumber(flex)) ;else if (qx.lang.Type.isString(flex)) flex = parseInt(flex, 10);else throw new Error("Illegal value set as column flex");
            resizeBehavior.setWidth(i, width, flex);
          }

          if (column["min-width"]) {
            resizeBehavior.setMinWidth(i, column["min-width"]);
          }

          if (column["max-width"]) {
            resizeBehavior.setMaxWidth(i, column["max-width"]);
          }

          var headerWidget = table.getPaneScroller(0).getHeader().getHeaderWidgetAtColumn(i);

          if (column["header-icon"]) {
            headerWidget.setIcon(column["header-icon"]);
          }

          if (column["tool-tip-text"]) {
            headerWidget.setToolTipText(column["tool-tip-text"]);
          }

          if (column["header-click"]) {
            headerWidget.addListener("tap", function (event) {
              column["header-click"](event);
            });
          }

          if (column["text-align"]) {
            headerWidget.getChildControl("label").setTextAlign(column["text-align"]);
          }

          if (column["cell-editor"]) {
            var cellEditorName = this.resolveQName(column["cell-editor"]);
            var cellEditorFactory = qookery.Qookery.getRegistry().get(qookery.IRegistry.P_CELL_EDITOR_FACTORY, cellEditorName, true);
            var cellEditor = cellEditorFactory(this, column);
            columnModel.setCellEditorFactory(i, cellEditor);
          }

          var cellRendererName = this.resolveQName(column["cell-renderer"] || "{http://www.qookery.org/ns/Form}model");
          var cellRendererFactory = qookery.Qookery.getRegistry().get(qookery.IRegistry.P_CELL_RENDERER_FACTORY, cellRendererName, true);
          var cellRenderer = cellRendererFactory(this, column);
          columnModel.setDataCellRenderer(i, cellRenderer);

          if (column["visibility"] == "hidden") {
            columnModel.setColumnVisible(i, false);
          }
        }

        qookery.internal.components.TableComponent.prototype.setup.base.call(this);
      },
      // Public methods
      getTableModel: function getTableModel() {
        if (this.__P_22_1 == null) this.__P_22_1 = new qookery.impl.DefaultTableModel(this);
        return this.__P_22_1;
      },
      setTableModel: function setTableModel(tableModel) {
        if (this.__P_22_1 != null) this.__P_22_1.dispose();
        this.__P_22_1 = tableModel;
      },
      addColumn: function addColumn(column) {
        this.__P_22_0.push(column);
      },
      getColumns: function getColumns() {
        return this.__P_22_0;
      },
      setColumns: function setColumns(columns) {
        this.__P_22_0 = columns;
      },
      isSelectionEmpty: function isSelectionEmpty() {
        var selectionModel = this.getMainWidget().getSelectionModel();
        return selectionModel.isSelectionEmpty();
      },
      getSelection: function getSelection() {
        var selection = [];
        if (!this.__P_22_1) return selection;
        var selectionModel = this.getMainWidget().getSelectionModel();
        selectionModel.iterateSelection(function (rowIndex) {
          var rowData = this.__P_22_1.getRowData(rowIndex);

          if (rowData !== null) selection.push(rowData);
        }, this);
        return selection;
      },
      resetSelection: function resetSelection() {
        this.getMainWidget().getSelectionModel().resetSelection();
      },
      getSingleSelection: function getSingleSelection() {
        var selection = this.getSelection();
        if (selection.length !== 1) return null;
        return selection[0];
      },
      getSelectedRowIndex: function getSelectedRowIndex() {
        var selectedRowIndex = null;
        this.getMainWidget().getSelectionModel().iterateSelection(function (rowIndex) {
          selectedRowIndex = rowIndex;
        });
        return selectedRowIndex;
      },
      setSelectedRowIndex: function setSelectedRowIndex(rowIndex, setFocus) {
        this.getMainWidget().getSelectionModel().setSelectionInterval(rowIndex, rowIndex);
        if (setFocus) this.getMainWidget().setFocusedCell(0, rowIndex, true);
      },
      selectAll: function selectAll() {
        this.getMainWidget().getSelectionModel().setSelectionInterval(0, this.getTableModel().getRowCount() - 1);
      },
      // Component overrides
      _updateUI: function _updateUI(value) {
        // Setting the model data requires some cooperation from the model implementation
        var tableModel = this.getTableModel();

        if (tableModel && tableModel.setData && typeof tableModel.setData == "function") {
          tableModel.setData(value);
        }
      },
      addEventHandler: function addEventHandler(eventName, handler, onlyOnce) {
        switch (eventName) {
          case "dataChanged":
            var methodName = onlyOnce ? "addListenerOnce" : "addListener";
            this.getTableModel()[methodName]("dataChanged", handler, this);
            return;
        }

        qookery.internal.components.TableComponent.prototype.addEventHandler.base.call(this, eventName, handler, onlyOnce);
      },
      _applyValid: function _applyValid() {// Overriden in order to prevent default handling
      },
      _applyRequired: function _applyRequired() {// Overriden in order to prevent default handling
        // TODO Qookery: Add a validator that checks that table is not empty
      }
    },
    destruct: function destruct() {
      this.__P_22_0.length = 0;

      this._disposeObjects("__P_22_1");
    }
  });
  qookery.internal.components.TableComponent.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TableComponent.js.map?dt=1613267100705