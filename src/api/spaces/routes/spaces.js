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
    },
  ],
};
