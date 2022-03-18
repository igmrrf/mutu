import express, { Router } from "express";
import cors from "cors";
import RateLimit from "express-rate-limit";
import helmet from "helmet";
import morgan from "morgan";
import errorHandler from "interfaces/http/middlewares/errorHandler";
import v1Routes from "containers/routes";
import error404 from "interfaces/http/middlewares/notFoundHandler";

/**
 * Configures express middlewares
 */

export default ({ config, containerMiddleware }) => {
  const router = Router();
  const limiter = new RateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5,
  });

  router.use(helmet());
  router.use(limiter);

  const NODE_ENV = config.get("app.env");
  router.use(morgan(NODE_ENV === "production" ? "combined" : "dev"));

  const bodyLimit = config.get("app.bodyLimit");
  router.use(express.json({ limit: bodyLimit }));
  router.use(express.urlencoded({ extended: false, limit: bodyLimit }));

  // SETUP CORS
  const allowedOrigins = config.get("app.allowedOrigins");
  router.use(
    cors({
      origin: (origin, cb) => {
        if (allowedOrigins.trim() === "*") {
          cb(null, true);
        } else {
          const origins = allowedOrigins.split(",");
          if (origins.indexOf(origin) !== -1 || !origin) {
            cb(null, true);
          } else {
            cb(new Error(`Origin('${origin}') not allowed`, false));
          }
        }
      },
      optionsSuccessStatus: 200,
    })
  );

  // https://www.npmjs.com/package/awilix-express
  router.use(containerMiddleware);

  router.get("/", (req, res) => res.json({ message: "Mutu API v1" }));

  router.use("/v1", v1Routes);

  router.use(error404);

  router.use(errorHandler);

  return router;
};
