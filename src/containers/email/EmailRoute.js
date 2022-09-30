import { Router } from "express";
import { makeInvoker } from "awilix-express";
import validateError from "modules/validator.module";
import CheckAuth from "interfaces/http/middlewares/checkAuthentication";
import MethodNotAllowedHandler from "interfaces/http/middlewares/methodNotAllowed";
import EmailController from "./EmailController";
import EmailValidation from "./EmailValidation";

const router = Router();
const api = makeInvoker(EmailController);
const Auth = makeInvoker(CheckAuth);
const validate = makeInvoker(EmailValidation);

/**
 * @api {post} /email Creates New Email
 * @apiGroup Email
 * @apiName Create new Email
 * @apiDescription creates a new email which automatically inherits the current date
 * @apiVersion 0.0.1
 * @apiSuccessExample Success Response:

 */

/**
 * @api {patch} /email/:id Updates Email details
 * @apiGroup Email
 * @apiName Updates existing Email
 * @apiDescription Updates Email
 * @apiVersion 0.0.1 
 * @apiSuccessExample Success Response:
 
 */

/**
 * @api {delete} /email/:id Deletes Email
 * @apiGroup Email
 * @apiName Delete Email
 * @apiDescription Deletes a single Email
 * @apiVersion 0.0.1
 * @apiParam {:id} Id - Email Id
 * @apiSuccessExample Success Response:

 */

/**
 * @api {get} /email - All Email for the day
 * @apiGroup Email
 * @apiName Get Email(s)
 * @apiDescription Gets all email and populates the users involved
 * @apiVersion 0.0.1
 * @apiSuccessExample Success Response:

 */

/**
 * @api {get} /email/:id Gets one Email item
 * @apiGroup Email
 * @apiName  Get Email
 * @apiDescription Gets one email
 * @apiVersion 0.0.1
 * @apiParam {:id} Id - Email Id
 * @apiSuccessExample Success Response:

 */

router
  .route("/")
  .get(Auth("isLoggedIn"), api("getEmails"))
  .post(validate("create"), validateError, Auth("isLoggedIn"), api("createEmail"))
  .all(MethodNotAllowedHandler);

router
  .route("/:id")
  .delete(Auth("isLoggedIn"), api("deleteEmail"))
  .get(Auth("isLoggedIn"), api("getEmail"))
  .patch(Auth("isLoggedIn"), api("updateEmail"))
  .all(MethodNotAllowedHandler);

export default router;
