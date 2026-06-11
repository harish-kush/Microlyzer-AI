require("dotenv").config();

const app = require("./src/app");
const connectToDB = require("./src/config/database");
const logger = require("./src/config/logger");

connectToDB();

app.listen(3003, () => {
  logger.info("Mock Service running on port 3003");
});