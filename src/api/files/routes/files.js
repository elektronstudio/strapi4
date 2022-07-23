module.exports = {
  routes: [
    {
      method: "GET",
      path: "/files/:path",
      handler: "files.index",
    },
    {
      method: "PUT",
      path: "/files/upload",
      handler: "files.upload",
    },
  ],
};
