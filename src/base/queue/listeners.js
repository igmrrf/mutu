import logger from "base/logger";
import { QueueEvents } from "bullmq";

const queueEvents = new QueueEvents("Paint");

queueEvents.on("completed", ({ jobId }) => {
  logger.info("Done with a job ", jobId);
});

queueEvents.on("failed", ({ jobId, failedReason }) => {
  logger.error(`error with a job: ${jobId} with Reason: ${failedReason}`);
});
