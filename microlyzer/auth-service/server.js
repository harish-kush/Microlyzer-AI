require("dotenv").config();
const logger = require('./src/config/logger.js')
const app = require("./src/app");
const connectToDB = require("./src/config/database");

connectToDB();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  logger.info(`Auth Service running on port ${PORT}`);
});
