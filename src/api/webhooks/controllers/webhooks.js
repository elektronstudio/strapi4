module.exports = {
  async test(ctx, _next) {
    ctx.body = "test";
    strapi.wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify({ message: "test" }));
      }
    });
  },
};
