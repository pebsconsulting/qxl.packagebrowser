(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "usage": "dynamic",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.event.IEventHandler": {
        "require": true
      },
      "qx.core.IDisposable": {
        "require": true
      },
      "qx.lang.Function": {
        "construct": true
      },
      "qx.event.Registration": {
        "defer": "runtime",
        "require": true
      },
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.core.ObjectRegistry": {},
      "qx.bom.Event": {},
      "qx.event.GlobalError": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.type.Event": {},
      "qx.bom.client.CssAnimation": {
        "defer": "load",
        "require": true
      },
      "qx.bom.client.CssTransition": {
        "defer": "load",
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "load": true,
          "className": "qx.bom.client.Engine"
        },
        "css.animation": {
          "defer": true,
          "className": "qx.bom.client.CssAnimation"
        },
        "css.transition": {
          "defer": true,
          "className": "qx.bom.client.CssTransition"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tino Butz (tbtz)
  
     ======================================================================
  
     This class contains code based on the following work:
  
     * Unify Project
  
       Homepage:
         http://unify-project.org
  
       Copyright:
         2009-2010 Deutsche Telekom AG, Germany, http://telekom.com
  
       License:
         MIT: http://www.opensource.org/licenses/mit-license.php
  
  ************************************************************************ */

  /**
   *
   * This class provides support for HTML5 transition and animation events.
   * Currently only WebKit and Firefox are supported.
   * 
   * NOTE: Instances of this class must be disposed of after use
   *
   */
  qx.Class.define("qx.event.handler.Transition", {
    extend: qx.core.Object,
    implement: [qx.event.IEventHandler, qx.core.IDisposable],

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * Create a new instance
     *
     * @param manager {qx.event.Manager} Event manager for the window to use
     */
    construct: function construct(manager) {
      qx.core.Object.constructor.call(this);
      this.__P_176_0 = {};
      this.__P_176_1 = qx.lang.Function.listener(this._onNative, this);
    },

    /*
    *****************************************************************************
       STATICS
    *****************************************************************************
    */
    statics: {
      /** @type {Integer} Priority of this handler */
      PRIORITY: qx.event.Registration.PRIORITY_NORMAL,

      /** @type {Map} Supported event types */
      SUPPORTED_TYPES: {
        transitionEnd: 1,
        animationEnd: 1,
        animationStart: 1,
        animationIteration: 1
      },

      /** @type {Integer} Which target check to use */
      TARGET_CHECK: qx.event.IEventHandler.TARGET_DOMNODE,

      /** @type {Integer} Whether the method "canHandleEvent" must be called */
      IGNORE_CAN_HANDLE: true,

      /** Mapping of supported event types to native event types */
      TYPE_TO_NATIVE: null,

      /** Mapping of native event types to supported event types */
      NATIVE_TO_TYPE: null
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      __P_176_1: null,
      __P_176_0: null,

      /*
      ---------------------------------------------------------------------------
        EVENT HANDLER INTERFACE
      ---------------------------------------------------------------------------
      */
      // interface implementation
      canHandleEvent: function canHandleEvent(target, type) {// Nothing needs to be done here
      },
      // interface implementation

      /**
       * This method is called each time an event listener, for one of the
       * supported events, is added using {@link qx.event.Manager#addListener}.
       *
       * @param target {var} The target to, which the event handler should
       *     be attached
       * @param type {String} event type
       * @param capture {Boolean} Whether to attach the event to the
       *         capturing phase or the bubbling phase of the event.
       * @signature function(target, type, capture)
       */
      registerEvent: qx.core.Environment.select("engine.name", {
        "webkit": function webkit(target, type, capture) {
          var hash = qx.core.ObjectRegistry.toHashCode(target) + type;
          var nativeType = qx.event.handler.Transition.TYPE_TO_NATIVE[type];
          this.__P_176_0[hash] = {
            target: target,
            type: nativeType
          };
          qx.bom.Event.addNativeListener(target, nativeType, this.__P_176_1);
        },
        "gecko": function gecko(target, type, capture) {
          var hash = qx.core.ObjectRegistry.toHashCode(target) + type;
          var nativeType = qx.event.handler.Transition.TYPE_TO_NATIVE[type];
          this.__P_176_0[hash] = {
            target: target,
            type: nativeType
          };
          qx.bom.Event.addNativeListener(target, nativeType, this.__P_176_1);
        },
        "mshtml": function mshtml(target, type, capture) {
          var hash = qx.core.ObjectRegistry.toHashCode(target) + type;
          var nativeType = qx.event.handler.Transition.TYPE_TO_NATIVE[type];
          this.__P_176_0[hash] = {
            target: target,
            type: nativeType
          };
          qx.bom.Event.addNativeListener(target, nativeType, this.__P_176_1);
        },
        "default": function _default() {}
      }),
      // interface implementation

      /**
       * This method is called each time an event listener, for one of the
       * supported events, is removed by using {@link qx.event.Manager#removeListener}
       * and no other event listener is listening on this type.
       *
       * @param target {var} The target from, which the event handler should
       *     be removed
       * @param type {String} event type
       * @param capture {Boolean} Whether to attach the event to the
       *         capturing phase or the bubbling phase of the event.
       * @signature function(target, type, capture)
       */
      unregisterEvent: qx.core.Environment.select("engine.name", {
        "webkit": function webkit(target, type, capture) {
          var events = this.__P_176_0;

          if (!events) {
            return;
          }

          var hash = qx.core.ObjectRegistry.toHashCode(target) + type;

          if (events[hash]) {
            delete events[hash];
          }

          qx.bom.Event.removeNativeListener(target, qx.event.handler.Transition.TYPE_TO_NATIVE[type], this.__P_176_1);
        },
        "gecko": function gecko(target, type, capture) {
          var events = this.__P_176_0;

          if (!events) {
            return;
          }

          var hash = qx.core.ObjectRegistry.toHashCode(target) + type;

          if (events[hash]) {
            delete events[hash];
          }

          qx.bom.Event.removeNativeListener(target, qx.event.handler.Transition.TYPE_TO_NATIVE[type], this.__P_176_1);
        },
        "mshtml": function mshtml(target, type, capture) {
          var events = this.__P_176_0;

          if (!events) {
            return;
          }

          var hash = qx.core.ObjectRegistry.toHashCode(target) + type;

          if (events[hash]) {
            delete events[hash];
          }

          qx.bom.Event.removeNativeListener(target, qx.event.handler.Transition.TYPE_TO_NATIVE[type], this.__P_176_1);
        },
        "default": function _default() {}
      }),

      /*
      ---------------------------------------------------------------------------
        EVENT-HANDLER
      ---------------------------------------------------------------------------
      */

      /**
       * Global handler for the transition event.
       *
       * @signature function(domEvent)
       * @param domEvent {Event} DOM event
       */
      _onNative: qx.event.GlobalError.observeMethod(function (nativeEvent) {
        qx.event.Registration.fireEvent(nativeEvent.target, qx.event.handler.Transition.NATIVE_TO_TYPE[nativeEvent.type], qx.event.type.Event);
      })
    },

    /*
    *****************************************************************************
       DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      var event;
      var events = this.__P_176_0;

      for (var id in events) {
        event = events[id];

        if (event.target) {
          qx.bom.Event.removeNativeListener(event.target, event.type, this.__P_176_1);
        }
      }

      this.__P_176_0 = this.__P_176_1 = null;
    },

    /*
    *****************************************************************************
       DEFER
    *****************************************************************************
    */
    defer: function defer(statics) {
      var aniEnv = qx.core.Environment.get("css.animation") || {};
      var transEnv = qx.core.Environment.get("css.transition") || {};
      var n2t = qx.event.handler.Transition.NATIVE_TO_TYPE = {};
      var t2n = qx.event.handler.Transition.TYPE_TO_NATIVE = {
        transitionEnd: transEnv["end-event"] || null,
        animationStart: aniEnv["start-event"] || null,
        animationEnd: aniEnv["end-event"] || null,
        animationIteration: aniEnv["iteration-event"] || null
      };

      for (var type in t2n) {
        var nate = t2n[type];
        n2t[nate] = type;
      }

      qx.event.Registration.addHandler(statics);
    }
  });
  qx.event.handler.Transition.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Transition.js.map?dt=1613267112345