"use strict";

const WebSocket = require("ws");

module.exports = {
  register() {},

  bootstrap({ strapi }) {
    const wss = new WebSocket.Server({ server: strapi.server.httpServer });
    wss.on("connection", (ws) => {
      ws.on("message", (message) => {
        let parsedMessage = null;
        try {
          parsedMessage = JSON.parse(message.toString());
        } catch {}
        if (parsedMessage) {
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify(parsedMessage));
            }
          });
        }
      });
    });
    strapi.wss = wss;

    // strapi.entityService
    //   .findMany("api::project.project")
    //   .then((res) => console.log(res));
  },
};
