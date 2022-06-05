module.exports = {
  async video(ctx, _next) {
    ctx.request.accepts("application/json");
    const message = {
      type: "VIDEO",
      channel: "elektron",
      value: ctx.request.body,
      store: true,
    };
    strapi.storeMessage(message);
    ctx.response.send("OK");
  },
};
