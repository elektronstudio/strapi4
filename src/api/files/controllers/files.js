const imageDataURI = require("image-data-uri");
const Spaces = require("do-spaces");

const options = strapi.config.get("plugin.upload.providerOptions");
const spaces = new Spaces.Spaces({
  endpoint: options.endpoint,
  accessKey: options.key,
  secret: options.secret,
  bucket: options.space,
});

const dir = "files";

module.exports = {
  async index(ctx, _next) {
    ctx.request.accepts("application/json");
    const path = ctx.request.params.path;
    const files = await spaces.listFiles({
      path: path + "/",
    });
    const processFile = (file) => {
      const filename = file.Key.replace(/.*\//, "");
      return { filename, src: `https://${options.cdn}/${file.Key}` };
    };
    ctx.response.send(
      files.Contents.filter((f) => !f.Key.endsWith("/"))
        .map(processFile)
        .reverse()
    );
  },

  async upload(ctx, _next) {
    ctx.request.accepts("application/json");
    const filename = ctx.request.body.filename;
    const file = imageDataURI.decode(ctx.request.body.src).dataBuffer;
    // { ETag: '"c3882c1a618aecef4faa3683be86c7a4"' }
    await spaces.uploadFile({
      pathname: `${dir}/${filename}`,
      file,
      privacy: "public-read",
    });
    ctx.response.send(ctx.request.body);
  },
};
