require("dotenv").config();
const app = require("./src/app");

app.get("/health", (req, res) => {
  res.json({
    service: "api-gateway",
    status: "healthy",
  });
});

app.listen(5000, () => {
  console.log("Gateway running on 5000");
});