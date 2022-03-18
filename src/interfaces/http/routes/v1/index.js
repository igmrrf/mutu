import fs from "fs";
import path from "path";
import { Router } from "express";

const router = Router();
/**
 * Automatically loads all routes and export them
 */
fs.readdirSync(__dirname)
  .filter((file) => file !== path.basename(__filename) && path.extname(file) === ".js")
  .forEach((file) => {
    const endpoint = `/${file.split(".js")[0]}`;
    const route = require(path.join(__dirname, file)).default;
    router.use(endpoint, route);
  });

export default router;
