(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.application.Standalone": {
        "require": true
      },
      "cboulanger.eventrecorder.window.MRemoteBinding": {
        "require": true
      },
      "qx.ui.container.Composite": {},
      "qx.ui.layout.VBox": {},
      "qx.ui.basic.Label": {},
      "qx.ui.form.Button": {},
      "qx.ui.form.TextField": {},
      "qx.data.marshal.Json": {},
      "cboulanger.eventrecorder.window.RemoteApplication": {},
      "qx.ui.list.List": {},
      "qx.ui.form.CheckBox": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     Copyright: 2018 Christian Boulanger
  
     License: MIT license
  
     Authors: Christian Boulanger (cboulanger) info@bibliograph.org
  
  ************************************************************************ */

  /**
   * This is the main application class of "UI Event Recorder"
   */
  qx.Class.define("cboulanger.eventrecorder.window.TestApplication", {
    extend: qx.application.Standalone,
    include: cboulanger.eventrecorder.window.MRemoteBinding,
    properties: {
      chatMessage: {
        check: "String",
        init: "",
        event: "changeChatMessage"
      },
      listModel: {
        check: "qx.data.Array",
        nullable: true,
        event: "changeListModel"
      }
    },
    members: {
      main: function main() {
        cboulanger.eventrecorder.window.TestApplication.prototype.main.base.call(this);
        var container = new qx.ui.container.Composite(new qx.ui.layout.VBox(5));
        container.add(new qx.ui.basic.Label("<h3>Remote databinding demo</h3>").set({
          rich: true
        }));
        var button1 = new qx.ui.form.Button("1. Open a new window");
        container.add(button1);
        container.add(new qx.ui.basic.Label("2. Type a message:"));
        var chatbox = new qx.ui.form.TextField();
        chatbox.setLiveUpdate(true);
        this.bind("chatMessage", chatbox, "value");
        chatbox.bind("value", this, "chatMessage");
        container.add(chatbox);
        container.add(new qx.ui.basic.Label("3. Tick & Click:"));

        var list = this.__P_465_0(); // setup databinding


        this.bind("listModel", list, "model");
        list.bind("model", this, "listModel");
        container.add(list);
        var button2 = new qx.ui.form.Button("Add item at the top");
        var counter = 1;
        button2.addListener("execute", function () {
          list.getModel().unshift(qx.data.marshal.Json.createModel({
            name: "New item " + counter++,
            online: true
          }));
        });
        container.add(button2);
        var button3 = new qx.ui.form.Button("Delete first three items");
        button3.addListener("execute", function () {
          list.getModel().splice(0, 3);
        });
        container.add(button3);
        this.getRoot().add(container, {
          left: 50,
          top: 0
        }); // communicate with a new browser window

        button1.addListener("execute", function () {
          var remoteWin = new cboulanger.eventrecorder.window.RemoteApplication("remote_binding_test", {
            width: 300,
            height: 500
          });
          this.syncProperties(remoteWin);
        }, this);

        if (window.opener) {
          // if we're in a new window, sync properties with the window that opened us
          this.syncProperties(window.opener);
        } else {
          // we are the main window, create the data for the list to be sync'ed
          var rawData = [];

          for (var i = 0; i < 20; i++) {
            var entry = {
              name: "Item " + i,
              online: i % 3 === 0
            };
            rawData.push(entry);
          }

          var data = qx.data.marshal.Json.createModel(rawData, true);
          list.setModel(data);
        }
      },
      __P_465_0: function __P_465_0() {
        // create the widgets
        var list = new qx.ui.list.List();
        list.setWidth(150); // create the delegate to change the bindings

        var delegate = {
          configureItem: function configureItem(item) {
            item.setPadding(3);
          },
          createItem: function createItem() {
            return new qx.ui.form.CheckBox();
          },
          bindItem: function bindItem(controller, item, id) {
            controller.bindProperty("name", "label", null, item, id);
            controller.bindProperty("online", "value", null, item, id);
            controller.bindPropertyReverse("online", "value", null, item, id);
          }
        };
        list.setDelegate(delegate);
        return list;
      }
    }
  });
  cboulanger.eventrecorder.window.TestApplication.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TestApplication.js.map?dt=1613267132549