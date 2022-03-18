/**
 * Automatically loads all configurations and exports them
 */

import fs from "fs";
import path from "path";
import env from "dotenv-extended";
import convict from "convict";

env.load({
  encoding: "utf8",
  silent: true,
  path: ".env",
  defaults: ".env.defaults",
  schema: ".env.schema",
  errorOnMissing: process.env.NODE_ENV === "production",
  errorOnExtra: false,
  errorOnRegex: false,
  includeProcessEnv: true,
  assignToProcessEnv: true,
  overrideProcessEnv: false,
});

let serviceConfig = {};

fs.readdirSync(__dirname)
  .filter(
    (file) => file !== path.basename(__filename) && path.extname(file) === ".js"
  )
  .forEach((file) => {
    const config = require(path.join(__dirname, file));
    serviceConfig = { ...serviceConfig, ...config };
    serviceConfig = Object.assign(serviceConfig, config);
  });

const config = convict(serviceConfig);

config.validate({ allowed: "strict" });

export default config;
