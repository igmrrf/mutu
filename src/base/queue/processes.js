import logger from "base/logger";

export const sendEmail = async (data, done) => {
  logger.info({ queue: "This is sendEmail Queued Job" });
  logger.info({ data });
  done();
};

export const getAnalytics = async (data, done) => {
  logger.info({ queue: "This is getAnalytics Queued Job" });
  logger.info({ data });
  done();
};
