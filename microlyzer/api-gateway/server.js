require("dotenv").config();
const app = require("./src/app");

const axios = require("axios");

app.get("/health", async (req, res) => {
  const services = {
    auth: "http://localhost:3001/health",
    interview: "http://localhost:3002/health",
    mock: "http://localhost:3003/health",
  };

  const result = {};

  await Promise.all(
    Object.entries(services).map(async ([name, url]) => {
      try {
        const response = await axios.get(url);
        result[name] = response.data;
      } catch {
        result[name] = {
          service: name,
          status: "down",
        };
      }
    })
  );

  res.json({
    service: "api-gateway",
    status: "healthy",
    services: result,
  });
});

app.listen(5000, () => {
  console.log("Gateway running on 5000");
});