const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


// Auth Service
app.use(
  "/api/auth",
  createProxyMiddleware({
    target: "http://localhost:3001",
    changeOrigin: true,
    pathRewrite: {
      "^/api/auth": "/api/auth",
    },
  })
);

// Interview Service
app.use(
  "/api/interview",
  createProxyMiddleware({
    target: "http://localhost:3002",
    changeOrigin: true,
    pathRewrite: {
      "^/api/interview": "",
    },
  })
);

// Mock Service
app.use(
  "/api/mock",
  createProxyMiddleware({
    target: "http://localhost:3003",
    changeOrigin: true,
    pathRewrite: {
      "^/api/mock": "/api/mock",
    },
  })
);

module.exports = app;