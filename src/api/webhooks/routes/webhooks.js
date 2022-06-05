module.exports = {
  routes: [
    {
      method: "POST",
      path: "/webhooks/video",
      handler: "webhooks.video",
    },
  ],
};
