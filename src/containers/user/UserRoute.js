import { Router } from "express";
import { makeInvoker } from "awilix-express";
import UserController from "./UserController";
import CheckAuth from "interfaces/http/middlewares/checkAuthentication";
import MethodNotAllowedHandler from "interfaces/http/middlewares/methodNotAllowed";
import UserValidation from "./UserValidation";
import validateError from "modules/validator.module";

const router = Router();
const api = makeInvoker(UserController);
const Auth = makeInvoker(CheckAuth);
const validate = makeInvoker(UserValidation);

/**
 * @api {post} /user Creates New User
 * @apiGroup User
 * @apiName Create new User
 * @apiDescription creates a new user which automatically inherits the current date
 * @apiVersion 0.0.1
 * @apiSuccessExample Success Response:

 */

/**
 * @api {patch} /user/:id Updates User details
 * @apiGroup User
 * @apiName Updates existing User
 * @apiDescription Updates User
 * @apiVersion 0.0.1 
 * @apiSuccessExample Success Response:
 
 */

/**
 * @api {delete} /user/:id Deletes User
 * @apiGroup User
 * @apiName Delete User
 * @apiDescription Deletes a single User
 * @apiVersion 0.0.1
 * @apiParam {:id} Id - User Id
 * @apiSuccessExample Success Response:

 */

/**
 * @api {get} /user - All User for the day
 * @apiGroup User
 * @apiName Get User(s)
 * @apiDescription Gets all user and populates the users involved
 * @apiVersion 0.0.1
 * @apiSuccessExample Success Response:

 */

/**
 * @api {get} /user/:id Gets one User item
 * @apiGroup User
 * @apiName  Get User
 * @apiDescription Gets one user
 * @apiVersion 0.0.1
 * @apiParam {:id} Id - User Id
 * @apiSuccessExample Success Response:

 */

router
  .route("/")
  .get(Auth("isLoggedIn"), api("getUsers"))
  .post(validate("create"), validateError, Auth("isLoggedIn"), api("createUser"))
  .all(MethodNotAllowedHandler);

router
  .route("/:id")
  .delete(Auth("isLoggedIn"), api("deleteUser"))
  .get(Auth("isLoggedIn"), api("getUser"))
  .patch(Auth("isLoggedIn"), api("updateUser"))
  .all(MethodNotAllowedHandler);

export default router;
