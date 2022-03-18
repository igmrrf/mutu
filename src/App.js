/**
 * Manages application interfaces e.g REST server, gRPC server
 */
class App {
  constructor({ httpServer, logger, db, aiRecommend }) {
    this.httpServer = httpServer;
    this.logger = logger;
    this.db = db;
    this.aiRecommend = aiRecommend;
  }

  /**
   * Starts the application interfaces to begin handling user requests
   */

  async start() {
    await this.db.connect();
    await this.httpServer.start();
    await this.aiRecommend.start();
  }

  /**
   * Closes the application's interfaces
   */
  shutdown() {
    this.httpServer.close(async (err) => {
      this.logger.info("Shutting down REST server");
      if (err) {
        this.logger.error("Error while shutting down server", {
          error: err.toString(),
        });
      }
      await this.aiRecommend.stop();
      await this.db.close();
      process.exit(err ? 1 : 0);
    });
  }
}

export default App;
