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
   * Interface providing access to some internals of the Qookery XML parser
   */
  qx.Interface.define("qookery.IFormParser", {
    members: {
      /**
       * Parse and generate a Qookery form
       *
       * @param xmlDocument {qx.xml.Document} input DOM XML document structured according to the form.xsd schema
       * @param parentComponent {qookery.IContainerComponent} an optional parent component that will hold generated results or <code>null</code>
       *
       * @return {qookery.IComponent} the root of the generated component hierarchy - typically a form component
       */
      parseXmlDocument: function parseXmlDocument(xmlDocument, parentComponent) {}
    }
  });
  qookery.IFormParser.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IFormParser.js.map?dt=1613267099064