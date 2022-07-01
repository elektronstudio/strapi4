const imageDataURI = require("image-data-uri");
const { writeFile } = require("fs/promises");

module.exports = {
  async index(ctx, _next) {
    ctx.request.accepts("application/json");
    ctx.response.send(strapi.config.get("plugin.upload.providerOptions"));
  },
  async upload(ctx, _next) {
    ctx.request.accepts("application/json");
    const buffer = imageDataURI.decode(ctx.request.body.src).dataBuffer;
    await writeFile("test2.jpg", buffer);
    ctx.response.send(ctx.request.body);
  },
};
