"use strict";

const WebSocket = require("ws");

module.exports = {
  register() {},

  bootstrap({ strapi }) {
    const wss = new WebSocket.Server({ server: strapi.server.httpServer });
    strapi.sendMessage = (message) =>
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(message));
        }
      });
    strapi.storeMessage = async (message) => {
      const a = await strapi.entityService.create("api::message.message", {
        data: {
          channel: message.channel,
          type: message.type,
          userid: message.userid,
          username: message.username,
          value: message.value,
        },
      });
      console.log(a);
    };
    strapi.wss = wss;

    wss.on("connection", (ws) => {
      ws.on("message", (rawMessage) => {
        let message = null;
        try {
          message = JSON.parse(rawMessage.toString());
        } catch {}
        if (message) {
          strapi.sendMessage(message);
          if (message.store) {
            strapi.storeMessage(message);
          }
        }
      });
    });
  },
};
