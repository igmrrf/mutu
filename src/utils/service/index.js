const fs = require("fs");
const readline = require("readline");
const path = require("path");
const { writeFile } = require("fs/promises");
const folder = process.argv[2] || "";
const Cfolder = process.argv[3] || "";
const routeContent = require("./raw/route")(Cfolder);
const repositoryContent = require("./raw/repository")(Cfolder);
const validationContent = require("./raw/validation")(Cfolder);
const entityContent = require("./raw/entity")(Cfolder);
const modelContent = require("./raw/model")(Cfolder);
const controllerContent = require("./raw/controller")(Cfolder);
const specContent = require("./raw/spec")(Cfolder);
const repositorySpecContent = require("./raw/repository.spec")(Cfolder);
const mockContent = require("./raw/mockdata")(Cfolder);

function writeIntoFile(dir) {
  if (!dir) dir = path.join(process.cwd(), `src/containers/${folder}`);

  fs.readdirSync(dir)
    .filter((file) => file !== "index.js")
    .forEach((file) => {
      if (fs.lstatSync(`${dir}/${file}`).isDirectory()) return writeIntoFile(`${dir}/${file}`);
      file = path.join(dir, file);

      if (file.includes(`MOCK_DATA.js`))
        fs.writeFile(file, mockContent, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      if (file.includes(`${Cfolder}.spec.js`))
        fs.writeFile(file, specContent, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      if (file.includes(`${Cfolder}Repository.spec.js`))
        fs.writeFile(file, repositorySpecContent, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      if (file.includes("Controller.js"))
        fs.writeFile(file, controllerContent, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      if (file.includes("Entity.js"))
        fs.writeFile(file, entityContent, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      if (file.includes("Model.js"))
        fs.writeFile(file, modelContent, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      if (file.includes("Repository.js"))
        fs.writeFile(file, repositoryContent, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      if (file.includes("Route.js"))
        fs.writeFile(file, routeContent, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
      if (file.includes("Validation.js"))
        fs.writeFile(file, validationContent, (err) => {
          if (err) {
            console.error(err);
            return;
          }
        });
    });
}

writeIntoFile();
