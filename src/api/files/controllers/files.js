const imageDataURI = require("image-data-uri");
const Spaces = require("do-spaces");

const options = strapi.config.get("plugin.upload.providerOptions");
const spaces = new Spaces.Spaces({
  endpoint: options.endpoint,
  accessKey: options.key,
  secret: options.secret,
  bucket: options.space,
});

module.exports = {
  async index(ctx, _next) {
    ctx.request.accepts("application/json");
    const path = ctx.request.params.path;
    const files = await spaces.listFiles({
      path: path + "/",
    });
    const processFile = (file) => {
      const filename = file.Key.replace(/.*\//, "");
      return {
        filename,
        src: `https://${options.cdn}/${file.Key}`,
        modified_at: file.LastModified,
      };
    };
    ctx.response.send(
      files.Contents.filter((f) => !f.Key.endsWith("/"))
        .map(processFile)
        .reverse()
    );
  },

  async upload(ctx, _next) {
    ctx.request.accepts("application/json");
    const path = ctx.request.params.path;
    const filename = ctx.request.body.filename;
    const file = imageDataURI.decode(ctx.request.body.src).dataBuffer;
    await spaces.uploadFile({
      pathname: `${path}/${filename}`,
      file,
      privacy: "public-read",
    });
    ctx.response.send(ctx.request.body);
  },
};
