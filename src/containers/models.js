/**
 * Automatically loads all models and exports them
 */

import fs from "fs";
import path from "path";

const getModel = (file) => require(path.join(__dirname, file)).default;
const modelsvalues = {};

fs.readdirSync(__dirname)
  .filter((folder) => folder !== "models.js" && fs.lstatSync(`${__dirname}/${folder}`).isDirectory())
  .forEach((folder) => {
    const newDir = `${__dirname}/${folder}`;
    fs.readdirSync(newDir)
      .filter((file) => file.indexOf("Model.js") > -1)
      .forEach((file) => {
        const model = require(path.join(newDir, file)).default;
        modelsvalues[model.modelName] = model;
      });
  });

export default modelsvalues;
