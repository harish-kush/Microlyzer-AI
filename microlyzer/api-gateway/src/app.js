require("dotenv").config();

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

const services = {
  auth: process.env.AUTH_SERVICE_URL ,
  interview: process.env.INTERVIEW_SERVICE_URL,
  mock: process.env.MOCK_SERVICE_URL ,
};

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
  ...(process.env.FRONTEND_ORIGINS || "").split(","),
]
  .map((origin) => origin && origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`Origin ${origin} is not allowed by CORS`));
    },
    credentials: true,
  })
);

function normalizeServiceUrl(url) {
  return url.replace(/\/+$/, "");
}

function createServiceProxy(serviceName) {
  return createProxyMiddleware({
    target: normalizeServiceUrl(services[serviceName]),
    changeOrigin: true,
    xfwd: true,
    timeout: 60000,
    proxyTimeout: 60000,
    on: {
      error(err, req, res) {
        if (res.headersSent) {
          return;
        }

        res.writeHead(502, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: `${serviceName} service is unavailable`,
            error: err.message,
          })
        );
      },
    },
  });
}

async function checkServiceHealth(serviceName, serviceUrl) {
  try {
    const response = await axios.get(`${normalizeServiceUrl(serviceUrl)}/health`, {
      timeout: 5000,
    });

    return {
      status: "up",
      data: response.data,
    };
  } catch (err) {
    return {
      service: serviceName,
      status: "down",
      error: err.message,
    };
  }
}

app.get("/", (req, res) => {
  res.json({
    service: "api-gateway",
    status: "running",
  });
});

app.get("/health", async (req, res) => {
  const result = {};

  await Promise.all(
    Object.entries(services).map(async ([name, url]) => {
      result[name] = await checkServiceHealth(name, url);
    })
  );

  res.json({
    service: "api-gateway",
    status: "healthy",
    services: result,
  });
});

app.use("/api/auth", createServiceProxy("auth"));
app.use("/api/interview", createServiceProxy("interview"));
app.use("/api/mock", createServiceProxy("mock"));

module.exports = app;
