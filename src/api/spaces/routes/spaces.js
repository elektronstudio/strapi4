const body = require("koa-body");

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/spaces",
      handler: "spaces.index",
    },
    {
      method: "POST",
      path: "/spaces/upload",
      handler: "spaces.upload",
      config: {
        middlewares: [
          async (ctx, next) => {
            //await body({ files: true })(ctx, () => {});
            ctx.app.use(body());
            console.log(ctx);
            await next();
          },
        ],
      },
    },
  ],
};
