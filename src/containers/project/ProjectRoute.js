import { Router } from "express";
import { makeInvoker } from "awilix-express";
import ProjectController from "./ProjectController";
import CheckAuth from "interfaces/http/middlewares/checkAuthentication";
import MethodNotAllowedHandler from "interfaces/http/middlewares/methodNotAllowed";
import ProjectValidation from "./ProjectValidation";
import validateError from "modules/validator.module";

const router = Router();
const api = makeInvoker(ProjectController);
const Auth = makeInvoker(CheckAuth);
const validate = makeInvoker(ProjectValidation);

/**
 * @api {post} /project Creates New Project
 * @apiGroup Project
 * @apiName Create new Project
 * @apiDescription creates a new project which automatically inherits the current date
 * @apiVersion 0.0.1
 * @apiSuccessExample Success Response:

 */

/**
 * @api {patch} /project/:id Updates Project details
 * @apiGroup Project
 * @apiName Updates existing Project
 * @apiDescription Updates Project
 * @apiVersion 0.0.1 
 * @apiSuccessExample Success Response:
 
 */

/**
 * @api {delete} /project/:id Deletes Project
 * @apiGroup Project
 * @apiName Delete Project
 * @apiDescription Deletes a single Project
 * @apiVersion 0.0.1
 * @apiParam {:id} Id - Project Id
 * @apiSuccessExample Success Response:

 */

/**
 * @api {get} /project - All Project for the day
 * @apiGroup Project
 * @apiName Get Project(s)
 * @apiDescription Gets all project and populates the users involved
 * @apiVersion 0.0.1
 * @apiSuccessExample Success Response:

 */

/**
 * @api {get} /project/:id Gets one Project item
 * @apiGroup Project
 * @apiName  Get Project
 * @apiDescription Gets one project
 * @apiVersion 0.0.1
 * @apiParam {:id} Id - Project Id
 * @apiSuccessExample Success Response:

 */

router
  .route("/")
  .get(Auth("isLoggedIn"), api("getProjects"))
  .post(validate("create"), validateError, Auth("isLoggedIn"), api("createProject"))
  .all(MethodNotAllowedHandler);

router
  .route("/:id")
  .delete(Auth("isLoggedIn"), api("deleteProject"))
  .get(Auth("isLoggedIn"), api("getProject"))
  .patch(Auth("isLoggedIn"), api("updateProject"))
  .all(MethodNotAllowedHandler);

export default router;
