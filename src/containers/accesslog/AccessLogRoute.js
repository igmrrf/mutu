import { Router } from "express";
import { makeInvoker } from "awilix-express";
import AccessLogController from "./AccessLogController";
import CheckAuth from "interfaces/http/middlewares/checkAuthentication";
import MethodNotAllowedHandler from "interfaces/http/middlewares/methodNotAllowed";
import AccessLogValidation from "./AccessLogValidation";
import validateError from "modules/validator.module";

const router = Router();
const api = makeInvoker(AccessLogController);
const Auth = makeInvoker(CheckAuth);
const validate = makeInvoker(AccessLogValidation);

/**
 * @api {post} /accesslog Creates New Access Log
 * @apiGroup Access log
 * @apiName Create Access Log
 * @apiDescription creates a new access log which automatically inherits the current date
 * @apiVersion 0.0.1
 * @apiParam {String} email - Email of accessed personnel
 * @apiParam {String} description - Purpose of access of endpoints accessed
 * @apiSuccessExample Success Response:

 */

/**
 * @api {patch} /accesslog/:id Updates accesslog details
 * @apiGroup Access Log
 * @apiName accesslog
 * @apiDescription Updates accesslog
 * @apiVersion 0.0.1 
 * @apiParam {String} email - Email of accessed personnel
 * @apiParam {String} description - Purpose of access of endpoints accessed
 * @apiSuccessExample Success Response:
 
 */

/**
 * @api {delete} /accesslog/:id Deletes AccessLog
 * @apiGroup Access Log
 * @apiName Delete Access Log
 * @apiDescription Deletes a single Access Log
 * @apiVersion 0.0.1
 * @apiParam {:id} Id - Access Log Id
 * @apiSuccessExample Success Response:

 */

/**
 * @api {get} /accesslog - All Access Logs for the day
 * @apiGroup Access Log
 * @apiName Get Access Log
 * @apiDescription Gets all access logs and populates the users involved
 * @apiVersion 0.0.1
 * @apiSuccessExample Success Response:

 */

/**
 * @api {get} /accesslog/:id Gets one accesslog
 * @apiGroup accesslog
 * @apiName accesslog
 * @apiDescription Gets one accesslog
 * @apiVersion 0.0.1
 * @apiParam {:id} Id - accesslog Id
 * @apiSuccessExample Success Response:

 */

router
  .route("/")
  .get(Auth("isLoggedIn"), api("getAccessLogs"))
  .post(validate("create"), validateError, Auth("isLoggedIn"), api("createAccessLog"))
  .all(MethodNotAllowedHandler);

router
  .route("/:id")
  .delete(Auth("isLoggedIn"), api("deleteAccessLog"))
  .get(Auth("isLoggedIn"), api("getAccessLog"))
  .patch(Auth("isLoggedIn"), api("updateAccessLog"))
  .all(MethodNotAllowedHandler);

export default router;
