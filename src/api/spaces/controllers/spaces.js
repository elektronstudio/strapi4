const imageDataURI = require("image-data-uri");
const Spaces = require("do-spaces");
const { writeFile } = require("fs/promises");

const options = strapi.config.get("plugin.upload.providerOptions");
const spaces = new Spaces.Spaces({
  endpoint: options.endpoint,
  accessKey: options.key,
  secret: options.secret,
  bucket: options.space,
});

// https://elektron.fra1.digitaloceanspaces.com/captures/hello.jpg

module.exports = {
  async index(ctx, _next) {
    ctx.request.accepts("application/json");
    const files = await spaces.listFiles({
      path: `captures/`,
    });
    const processFile = (file) => {
      return `https://${options.cdn}/${file.Key}`;
    };
    ctx.response.send(files.Contents.map(processFile));
  },
  async upload(ctx, _next) {
    ctx.request.accepts("application/json");
    const file = imageDataURI.decode(ctx.request.body.src).dataBuffer;
    //await writeFile("test2.jpg", buffer);
    const s = await spaces.uploadFile({
      pathname: "captures/hello2.jpg",
      privacy: "public-read",
      file,
    });
    console.log(s);

    ctx.response.send(ctx.request.body);
  },
};
