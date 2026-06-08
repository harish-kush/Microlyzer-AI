require("dotenv").config();
const logger = require('./src/config/logger.js')
const app = require("./src/app");
const connectToDB = require("./src/config/database");

connectToDB();

app.listen(3001, () => {
  logger.info("Auth Service running on port 3001");
});