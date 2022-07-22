module.exports = {
  routes: [
    {
      method: "GET",
      path: "/files",
      handler: "files.index",
    },
    {
      method: "PUT",
      path: "/files/upload",
      handler: "files.upload",
    },
  ],
};
