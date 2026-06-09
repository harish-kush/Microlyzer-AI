require("dotenv").config();

const app = require("./src/app");
const connectToDB = require("./src/config/database");
const logger = require("./src/config/logger");

connectToDB();

app.listen(3002, () => {
  logger.info("Interview Service running on port 3002");
});