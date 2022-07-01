const unparsed = require("koa-body/unparsed.js");
const body = require("koa-body");

module.exports = {
  async index(ctx, _next) {
    //ctx.request.accepts("application/json");
    ctx.response.send("OK");
  },
  async upload(ctx, _next) {
    console.log(ctx.request.body);
    ctx.response.send(ctx.request.body);
  },
};
