const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://ecommerce-backend-3phr.onrender.com",
      changeOrigin: true,
    })
  );
};
