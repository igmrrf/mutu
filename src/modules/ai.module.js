/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/named */
/* eslint-disable no-unused-vars */
import dayjs from "dayjs";
import Axios from "axios";
import isoweek from "dayjs/plugin/isoWeek";
import weekday from "dayjs/plugin/weekday";
import ResourceNotFoundError from "interfaces/http/errors/ResourceNotFoundError";
import ConflictError from "interfaces/http/errors/ConflictError";
import { pick } from "lodash";
import BaseRepository from "base/repositories";
import Cron from "node-cron";
import { makeInvoker } from "awilix-express";

dayjs.extend(isoweek);
dayjs.extend(weekday);

class WeeklyRecommendation extends BaseRepository {
  constructor({ models: { User } }) {
    super({ Model: User });

    this.cronJob = Cron.schedule("0 23 * * 0", async () => {
      console.log("helllo");
    });
  }

  async stop() {
    this.cronJob.stop();
  }

  async start() {
    this.cronJob.start();
  }
}
export default WeeklyRecommendation;
