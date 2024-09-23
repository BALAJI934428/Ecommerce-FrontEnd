// const { createProxyMiddleware } = require("http-proxy-middleware");

// module.exports = function (app) {
//   app.use(
//     "/api", // Proxy requests starting with `/api`
//     createProxyMiddleware({
//       target: "https://ecommerce-backend-3phr.onrender.com", // Backend API URL
//       changeOrigin: true,
//       secure: false, // Use `false` if you're working with self-signed SSL certificates
//     })
//   );
// };
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ecommerce-backend-3phr.onrender.com"

});
export default axiosInstance;
