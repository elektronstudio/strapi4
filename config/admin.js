module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'c7f3098a9f1ecb1d9a1395ededbe4227'),
  },
});
