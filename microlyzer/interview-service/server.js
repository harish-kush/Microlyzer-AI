require("dotenv").config();

const app = require("./src/app");
const connectToDB = require("./src/config/database");
const logger = require("./src/config/logger");

const PORT = process.env.PORT || 3002;

async function start() {
  try {
    await connectToDB();
    app.listen(PORT, () => {
      logger.info(`Interview Service running on port ${PORT}`);
    });
  } catch (error) {
    logger.error(`Interview Service failed to start: ${error.message}`);
    process.exit(1);
  }
}

start();
