import { createContainer, asClass, InjectionMode, Lifetime, asFunction, asValue } from "awilix";
import { scopePerRequest } from "awilix-express";
import config from "config";
import MongoDB from "base/database/MongoDBManager";
import mongoDBModels from "containers/models";
import logger from "base/logger";
import routes from "interfaces/http/routes/router";
import httpServer from "interfaces/http";
import storageService from "base/storage";
import paymentService from "base/payment";

const container = createContainer({
  injectionMode: InjectionMode.PROXY,
});

container.register({
  config: asValue(config),
  logger: asValue(logger),
  routes: asFunction(routes),
  models: asValue(mongoDBModels),
  httpServer: asClass(httpServer),
  db: asClass(MongoDB).singleton(),
 
  storageService: asClass(storageService).singleton(),
  paymentService: asClass(paymentService).singleton(),
  containerMiddleware: asValue(scopePerRequest(container)),
});

container.loadModules(
  [
    // Load use-cases
    [
      "app/**/*!(index.js).js",
      {
        lifetime: Lifetime.SCOPED,
        register: asClass,
      },
    ],
    // Load repositories
    [
      "containers/*/*Repository.js",
      {
        lifetime: Lifetime.SCOPED,
        register: asClass,
      },
    ],
  ],
  {
    formatName: "camelCase",
    resolverOptions: {},
    cwd: __dirname,
  }
);

container.loadModules(
  [
    // Load entities
    [
      "containers/*/*Entity.js",
      {
        lifetime: Lifetime.SCOPED,
        register: asClass,
      },
    ],
  ],
  {
    resolverOptions: {},
    cwd: __dirname,
  }
);

export default container;
