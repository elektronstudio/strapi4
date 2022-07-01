module.exports = {
  async index(ctx, _next) {
    //ctx.request.accepts("application/json");
    ctx.response.send("OK");
  },
  async upload(ctx, _next) {
    //ctx.request.accepts("application/json");
    console.log(ctx.request.files);
    console.log(ctx.request.body);
    ctx.response.send("OK");
  },
};
