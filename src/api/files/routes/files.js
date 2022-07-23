module.exports = {
  routes: [
    {
      method: "GET",
      path: "/files/:path",
      handler: "files.index",
    },
    {
      method: "PUT",
      path: "/files/:path/upload",
      handler: "files.upload",
    },
  ],
};
