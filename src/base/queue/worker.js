import { Worker } from "bullmq";
import { sendEmail } from "./processes";

const worker = new Worker("Paint", async (job) => {
  if (job.name === "sendEmail") {
    await sendEmail(job.data);
  }
});
