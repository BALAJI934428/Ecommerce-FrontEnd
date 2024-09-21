const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://ecommerce-backend-csq5.onrender.com",
      changeOrigin: true,
    })
  );
};
