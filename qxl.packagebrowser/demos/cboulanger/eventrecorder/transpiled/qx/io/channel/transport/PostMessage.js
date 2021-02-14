(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.io.channel.transport.Abstract": {
        "construct": true,
        "require": true
      },
      "qx.io.channel.transport.ITransport": {
        "require": true
      },
      "qx.bom.Window": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   * Transports based the postMessage API, for use in contexts such as
   *  - Window and Iframe objects (https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
   *  - Workers (https://developer.mozilla.org/en-US/docs/Web/API/Worker/postMessage)
   */
  qx.Class.define("qx.io.channel.transport.PostMessage", {
    extend: qx.io.channel.transport.Abstract,
    implement: qx.io.channel.transport.ITransport,

    /**
     * Instantiate a new postMessage transport
     * @param endpoint {Object}
     *    An endpoint object that implements the postMessage API
     * @param endpointName {String}
     *    An optional human-readable name of the endpoint
     * @ignore(self)
     */
    construct: function construct(endpoint, endpointName) {
      qx.io.channel.transport.Abstract.constructor.call(this);

      if (typeof endpoint.postMessage !== "function" || endpoint.onmessage === undefined) {
        throw new Error("Endpoint must be an object implementing the postMessage API.");
      }

      var endpointIsWindow = endpoint.window === endpoint;

      if (endpointIsWindow && qx.bom.Window.isClosed(this.endpoint)) {
        throw new Error("Cannot use closed window as endpoint.");
      }

      this.set({
        endpoint: endpoint,
        endpointName: endpointName
      });
      (window || self).addEventListener("message", function (message) {
        if (message.source === endpoint) {
          this.fireDataEvent("message", message);
        }
      }.bind(this));

      if (endpointIsWindow) {
        endpoint.attachEventListener("close", function () {
          this.close();
        });
      }
    },
    members: {
      /**
       * Send a message into the channel
       * @param messageObj {Object}
       */
      sendMessage: function sendMessage(messageObj) {
        this.getEndpoint().postMessage(messageObj, "*");
      }
    }
  });
  qx.io.channel.transport.PostMessage.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=PostMessage.js.map?dt=1613267113541