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
    },
  ],
};
