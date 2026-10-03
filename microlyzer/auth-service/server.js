require("dotenv").config();
const logger = require('./src/config/logger.js')
const app = require("./src/app");
const connectToDB = require("./src/config/database");

const PORT = process.env.PORT || 3001;

async function start() {
  try {
    await connectToDB();
    app.listen(PORT, () => {
      logger.info(`Auth Service running on port ${PORT}`);
    });
  } catch (error) {
    logger.error(`Auth Service failed to start: ${error.message}`);
    process.exit(1);
  }
}

start();
