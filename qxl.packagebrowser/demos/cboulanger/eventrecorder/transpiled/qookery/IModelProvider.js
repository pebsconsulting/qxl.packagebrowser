(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      }
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

  /**
   * Model providers bridge user-provided data functionality with Qookery interfaces
   */
  qx.Interface.define("qookery.IModelProvider", {
    members: {
      /**
       * Return a JavaScript primitive or array of primitives that uniquely identifies model object
       *
       * <p>The result must be such so that if a == b, then identityOf(a) == identityOf(b) and vice-versa.</p>
       * <p>The result must be <code>null</code> when no input was passed.</p>
       *
       * @param object {any} model object - it may be <code>null</code>
       *
       * @return {any} any JavaScript primitive or array of primitives
       */
      identityOf: function identityOf(object) {},

      /**
       * Test two model objects for equality
       *
       * <p>Method must be null-safe:
       *		equals(null, null) -> true and
       *		equals(null, non-null) -> false</p>
       *
       * @param object1 {any} model object, may be <code>null</code>
       * @param object2 {any} model object, may be <code>null</code>
       *
       * @return {Boolean} <code>true</code> if objects are equal or both <code>null</code>
       */
      areEqual: function areEqual(object1, object2) {},

      /**
       * Returns a negative number, zero, or a positive number as object1 is less than, equal to, or greater than object2
       *
       * <p>Method must be null-safe:
       *		compare(null, null) -> 0,
       *		compare(null, non-null) -> -1 and
       *		compare(non-null, null) -> 1</p>
       *
       * @param object1 {any} model object, may be <code>null</code>
       * @param object2 {any} model object, may be <code>null</code>
       *
       * @return {Number} negative number, positive number or zero according to comparison result
       */
      compare: function compare(object1, object2) {},

      /**
       * Convert values from component specific to model objects
       *
       * <p>Provider is expected to convert given component specific value to a model object.</p>
       *
       * @param value {any} component-specific value
       * @param className {String} the name of the value's class
       *
       * @return {any} value if no conversion needed, conversion result, or <code>null</code> if conversion was attempted but failed
       */
      convertFrom: function convertFrom(value, className) {},

      /**
       * Convert values from model objects to component specific values
       *
       * <p>Provider is expected to convert given model object into an object of the required class for component specific needs.</p>
       *
       * @param object {any} model object
       * @param className {String} the name of the wanted value's class
       *
       * @return {any} input if no conversion needed, conversion result, or <code>null</code> if conversion was attempted but failed
       */
      convertTo: function convertTo(object, className) {},

      /**
       * Return a human-friendly label for a model object
       *
       * @param object {any} model object - it may not be <code>null</code>
       * @param labelType {String?} optional symbolic name of needed label type
       *
       * @return {String} any textual label or <code>null</code> if none available
       */
      getLabel: function getLabel(object, labelType) {},

      /**
       * Connect a component to the form's underlying model, in a way specified by second argument
       *
       * @param component {qookery.IEditableComponent} editable component that will receive connection
       * @param specification {String} an implementation specific text that will be parsed by the model provider
       *
       * @return {qookery.internal.util.Connection} new connection instance
       */
      connectComponent: function connectComponent(component, specification) {},

      /**
       * Clone an object
       *
       * @param object {any} model object to clone
       */
      clone: function clone(object) {}
    }
  });
  qookery.IModelProvider.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IModelProvider.js.map?dt=1613267099119