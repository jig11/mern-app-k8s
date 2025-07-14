const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use('/api/user', createProxyMiddleware({
  target: 'http://user-service',
  changeOrigin: true,
  pathRewrite: {
    '^/api/user': '',
  },
}));

app.use('/api/order', createProxyMiddleware({
  target: 'http://order-service',
  changeOrigin: true,
  pathRewrite: {
    '^/api/order': '',
  },
}));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
