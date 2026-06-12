require("dotenv").config();

const app = require("./src/app");
const connectToDB = require("./src/config/database");
const logger = require("./src/config/logger");

connectToDB();

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  logger.info(`Interview Service running on port ${PORT}`);
});
