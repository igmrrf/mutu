import mongoose from "mongoose";
/**
 * Manages connection to MongoDB
 */

class MongoDBManager {
  constructor({ config, logger }) {
    this.config = config;
    this.logger = logger;

    const user = encodeURIComponent(config.get("db.user"));
    const password = encodeURIComponent(config.get("db.password"));
    const host = config.get("db.host");
    const name = config.get("db.name");
    const auth = config.get("db.auth");

    let connectionString = config.get("db.url");
    console.log("Stirng: ", connectionString);

    if (auth && !connectionString)
      connectionString = `mongodb+sv://${user}:${password}@${host}/${name}?retryWrites=true&w=majority`;

    this.connectionString = connectionString;
    this.connection = mongoose.connection;

    if (this.config.get("app.env")) mongoose.set("debug", true);

    this.connection.on("open", () => this.logger.info("Successfully connected to MongoDB"));
    this.connection.on("disconnected", () => this.logger.info("Disconnected from MongoDB"));
    this.connection.on("error", (error) => this.logger.error("Error while connecting to MongoDB: ", error));
  }

  /**
   * Cnnects to MongoDB
   * @param {number} poolSize - Connection pool size
   * @param {boolean} autoIndex - Use autoIndex
   * @param {number} numOfRetries - Number of connection retry attempts
   */

  async connect(poolSize = 10, autoIndex = true, numOfRetries = 3) {
    try {
      await mongoose.connect(this.connectionString, {
        maxPoolSize: poolSize,
        autoIndex,
      });
    } catch (error) {
      this.logger.error("Failed to connect to MongoDB: ", this.config.get("db.host"));
      if (numOfRetries <= 0) {
        this.logger.error("Exhausted max number of retries for connection to MongoDB");
        process.exit(1);
      }
      setTimeout(() => {
        this.connect(poolSize, autoIndex, numOfRetries - 1);
      }, 1000);
    }
  }

  async close() {
    this.logger.info("Closing database connection...");

    await mongoose.connection.close().catch((error) => {
      this.logger.error("Error while closing MongoDB database connection", { error });
      process.exit(1);
    });
  }
}

export default MongoDBManager;
