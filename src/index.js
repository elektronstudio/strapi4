"use strict";

const WebSocket = require("ws");
const { $fetch } = require("ohmyfetch");
// const { $fetch } = ohmyfetch.default;

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

    const url =
      "https://vds27aojo9.execute-api.eu-north-1.amazonaws.com/default/GetElektronStats";
    const xApiKey = "ftLPhkyMwY8ilqqrmzd9n9HyeYsgXKq7aROIucY9";

    const getStats = async () => {
      const stats = await $fetch(url, { headers: { "x-api-key": xApiKey } });
      if (stats.length) {
        const message = {
          type: "STATS",
          value: stats,
          channel: "elektron",
        };
        strapi.sendMessage(message);
        strapi.storeMessage(message);
      }
    };
    getStats();
    setInterval(getStats, 1000 * 60);
  },
};
