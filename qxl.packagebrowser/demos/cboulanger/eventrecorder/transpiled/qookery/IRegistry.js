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
   * Facility that handles registration of various Qookery artifacts under well known symbolic names
   */
  qx.Interface.define("qookery.IRegistry", {
    statics: {
      // Constants
      // .	Partitions
      P_ATTRIBUTE: "attribute",
      P_CELL_EDITOR_FACTORY: "cell-editor-factory",
      P_CELL_RENDERER_FACTORY: "cell-renderer-factory",
      P_COMMAND: "command",
      P_COMPONENT: "component",
      P_FORMAT: "format",
      P_FORMAT_FACTORY: "format-factory",
      P_LAYOUT_FACTORY: "layout-factory",
      P_LIBRARY: "library",
      P_MAP: "map",
      P_MEDIA_QUERY: "media-query",
      P_MODEL_PROVIDER: "model-provider",
      P_SERVICE: "service",
      P_VALIDATOR: "validator"
    },
    members: {
      // Partitions

      /**
       * Create a new partition in the registry
       *
       * @param partitionName {String} the name of the partition to create
       *
       * @throws {Error} in case the partition already exists or the name is not acceptable
       */
      createPartition: function createPartition(partitionName) {},
      // Elements

      /**
       * Retrieve an element from the registry
       *
       * @param partitionName {String} the name of the partition to look up
       * @param elementName {String} the name of the element to find in partition
       * @param required {Boolean?} if <code>true</code>, throw an exception when not found
       *
       * @return {any} the element or <code>undefined</code>
       */
      get: function get(partitionName, elementName, required) {},

      /**
       * Return a list of the names of all elements registered in a partition
       *
       * @param partitionName {String} the name of the partition to look up
       *
       * @return {Array} an array of element names
       */
      keys: function keys(partitionName) {},

      /**
       * Put an element into the registry
       *
       * @param partitionName {String} the name of the partition to look up
       * @param elementName {String} the name of the element to put in the partition
       * @param element {any} the element itself, <code>undefined</code> is not a valid value
       */
      put: function put(partitionName, elementName, element) {},

      /**
       * Remove an element from the registry
       *
       * @param partitionName {String} the name of the partition to look up
       * @param elementName {String} the name of the element to remove from the partition
       */
      remove: function remove(partitionName, elementName) {},
      // Services

      /**
       * Register a new service
       *
       * @param serviceName {String} symbolic name of the service
       * @param serviceClass {qx.Class|Object} singleton class of service or any object with a getInstance() member function
       */
      registerService: function registerService(serviceName, serviceClass) {},

      /**
       * Return a service's instance
       *
       * @param serviceName {String} symbolic name of the service
       *
       * @return {Object} the instance of the required service or <code>null</code> if not available
       */
      getService: function getService(serviceName) {},
      // Components

      /**
       * Register a new component type
       *
       * @param componentQName {String} qualified name of the component to register
       * @param componentClass {qx.Class} class that implements (at least) qookery.IComponent
       */
      registerComponentType: function registerComponentType(componentQName, componentClass) {},

      /**
       * Check if a component type is available
      	 * @param componentQName {String} qualified name of a possibly registered component type
       *
       * @return {boolean} <code>true</code> in case the component type is available
       */
      isComponentTypeAvailable: function isComponentTypeAvailable(componentQName) {},

      /**
       * Create a new component instance
       *
       * @param componentQName {String} qualified name of a registered component type
       * @param parentComponent {IComponent?null} component that will contain new component
       *
       * @return {IComponent} newly created component, an exception is thrown on error
       */
      createComponent: function createComponent(componentQName, parentComponent) {},
      // Validators

      /**
       * Register a validator under provided name
       *
       * @param name {String} the name of the validator for subsequent access
       * @param validator {qookery.IValidator} the validator itself
       */
      registerValidator: function registerValidator(name, validator) {},

      /**
       * Get a previously registered validator by name
       *
       * @param name {String} name of the validator
       *
       * @return {qookery.IValidator} the validator or <code>undefined</code> if not found
       */
      getValidator: function getValidator(name) {},
      // Media queries

      /**
       * Get a previously registered media query by name
       *
       * @param name {String} name of the media query
       *
       * @return {qx.bom.MediaQuery} the media query or <code>null</code> if not found
       */
      getMediaQuery: function getMediaQuery(name) {},
      // Model providers

      /**
       * Register a model provider, optionally setting it as the default one
       *
       * @param providerName {String} symbolic name of provider
       * @param providerClass {qx.Class} class of the provider
       * @param setDefault {Boolean} if <code>true</code>, provider will be set as the default one
       */
      registerModelProvider: function registerModelProvider(providerName, providerClass, setDefault) {},

      /**
       * Return a registered model provider
       *
       * @param providerName {String} symbolic name of provider
       */
      getModelProvider: function getModelProvider(providerName) {},
      // Formats

      /**
       * Register an IFormat under a symbolic name
       *
       * @param formatName {String} symbolic name of the format for easy referencing
       * @param format {qx.util.format.IFormat} format class
       */
      registerFormat: function registerFormat(formatName, format) {},

      /**
       * Register an IFormat factory for easy instance creation by XML authors
       *
       * @param factoryName {String} name of the format class for easy referencing
       * @param formatClass {qx.Class} format class
       */
      registerFormatFactory: function registerFormatFactory(factoryName, formatClass) {},

      /**
       * Return a previously registered format
       *
       * @param formatName {String} symbolic name of the wanted format
       */
      getFormat: function getFormat(formatName) {},

      /**
       * Parse a format specification
       *
       * <p>Format specification syntax is:</p>
       *
       * <pre>{formatName} | ( {factoryName} [ ':' {option1} '=' {value1} [ ',' {option2} '=' {value2} ]* ]? )</pre>
       *
       * @param specification {String} a specification according to above syntax
       * @param options {Map} any additional options to pass to the format constructor - forces factory lookup if provided
       *
       * @return {qx.util.format.IFormat} the newly created format instance
       */
      createFormat: function createFormat(specification, options) {},
      // Maps

      /**
       * Register a map
       *
       * @param mapName {String} symbolic name of the map for subsequent access
       * @param map {Map} map object
       */
      registerMap: function registerMap(mapName, map) {},

      /**
       * Return a registered map
       *
       * @param mapName {String} symbolic name of the map sought
       *
       * @return {Map} map object or <code>null</code> if map was not found
       */
      getMap: function getMap(mapName) {},
      // Libraries

      /**
       * Register a library for future use
       *
       * @param libraryName {String} symbolic name of the library
       * @param resourceUris {Array?} array of URIs of resources to load when library is used for the first time
       * @param dependencies {Array?} array of names of other libraries that must be loaded prior to this one
       * @param postLoadCallback {Function?} function that will be called when loading finished for further library initialization
       */
      registerLibrary: function registerLibrary(libraryName, resourceUris, dependencies, postLoadCallback) {},

      /**
       * Request one or more libraries for usage, loading them if needed
       *
       * @param libraryName {String|Array?} symbolic name(s) of libraries to load - may be empty
       * @param continuation {Function} called once finished; on failure, the cause will be found in the first argument as an instance of Error
       * @param thisArg {any} optional <code>this</code> argument for continuation
       */
      loadLibrary: function loadLibrary(libraryName, continuation, thisArg) {}
    }
  });
  qookery.IRegistry.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IRegistry.js.map?dt=1613267099160