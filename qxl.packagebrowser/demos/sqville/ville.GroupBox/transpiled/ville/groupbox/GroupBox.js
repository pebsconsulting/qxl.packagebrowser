(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.groupbox.GroupBox": {
        "construct": true,
        "require": true
      },
      "qx.ui.tree.core.FolderOpenButton": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
  Ville Software (SQville)
  
  Copyright: 2021 sqville
  
  License: MIT
  
  Authors: Chris Eskew (SQville) chris.eskew@sqville.com
  
  ************************************************************************ */

  /**
  *
  * @childControl open {qx.ui.tree.core.FolderOpenButton} button to open/close a subtree
  */
  qx.Class.define("ville.groupbox.GroupBox", {
    extend: qx.ui.groupbox.GroupBox,
    construct: function construct(legend, icon, collapsable, open, scale) {
      qx.ui.groupbox.GroupBox.constructor.call(this);

      this._createChildControl("open"); // Processing parameters


      if (legend != null) {
        this.setLegend(legend);
      }

      if (icon != null) {
        this.setIcon(icon);

        if (scale !== undefined) {
          this.getChildControl("legend").getChildControl("icon").set({
            scale: scale
          });
        }
      }

      if (collapsable != null) {
        this.setCollapsable(collapsable);
      }

      if (open != null) {
        this.setOpen(open);
      }

      this.initOpen();
      this.initCollapsable();
      this.set({
        allowStretchX: [true, true],
        allowStretchY: [true, true]
      });
    },

    /*
    *****************************************************************************
    PROPERTIES
    *****************************************************************************
    */
    properties: {
      // overridden
      appearance: {
        refine: true,
        init: "ville-groupbox"
      },

      /** Enables or disables the collapsabile feature of the groupbox. 
       * If false then the groupbox acts as a regular groupbox
       */
      collapsable: {
        nullable: true,
        check: "Boolean",
        init: false,
        apply: "_applyCollapsable"
      },

      /**
      * Whether the groupbox is opened.
      */
      open: {
        check: "Boolean",
        init: false,
        event: "changeOpen",
        apply: "_applyOpen"
      }
    },

    /*
    *****************************************************************************
    MEMBERS
    *****************************************************************************
    */
    members: {
      // property apply
      _applyCollapsable: function _applyCollapsable(value, old) {
        this.getChildControl("open").setVisibility(value ? "visible" : "excluded");
      },

      /**
      * Event handler, which listens to open state changes of the open button
      *
      * @param e {qx.event.type.Data} The event object
      */
      _onChangeOpen: function _onChangeOpen(e) {
        this.setOpen(e.getData());
      },
      // property apply
      _applyOpen: function _applyOpen(value, old) {
        var open = this.getChildControl("open", true);

        if (open) {
          open.setOpen(value);
        }

        if (value) {
          this.addState("opened");
        } else {
          this.removeState("opened");
        } //if (this.hasChildren()) {


        if (this.getCollapsable()) {
          this.getChildrenContainer().setVisibility(value ? "visible" : "excluded");
        } //}

      },
      // Overriden
      _createChildControlImpl: function _createChildControlImpl(id) {
        var control;

        switch (id) {
          case "open":
            control = new qx.ui.tree.core.FolderOpenButton().set({
              allowStretchX: [true, true],
              allowStretchY: [true, true]
            });
            control.addListener("changeOpen", this._onChangeOpen, this);

            this._add(control, {
              right: 4,
              width: "100%"
            });

            break;
        }

        return control || ville.groupbox.GroupBox.prototype._createChildControlImpl.base.call(this, id);
      }
    }
  });
  ville.groupbox.GroupBox.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=GroupBox.js.map?dt=1613269809772