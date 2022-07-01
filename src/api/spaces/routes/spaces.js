const body = require("koa-body");

module.exports = {
  routes: [
    {
      method: "GET",
      path: "/spaces",
      handler: "spaces.index",
    },
    {
      method: "PUT",
      path: "/spaces/upload",
      handler: "spaces.upload",
      // config: {
      //   middlewares: [
      //     {
      //       name: "strapi::body",
      //       config: {
      //         formLimit: "256mb",
      //         jsonLimit: "256mb",
      //         textLimit: "256mb",
      //         formLimit: "256mb",
      //         formidable: {
      //           maxFileSize: 256 * 1024 * 1024,
      //         },
      //       },
      //     },
      //   ],
      // },
    },
  ],
};
