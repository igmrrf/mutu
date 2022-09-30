import { Router } from "express";
import { makeInvoker } from "awilix-express";
import ContractController from "./ContractController";
import CheckAuth from "interfaces/http/middlewares/checkAuthentication";
import MethodNotAllowedHandler from "interfaces/http/middlewares/methodNotAllowed";
import ContractValidation from "./ContractValidation";
import validateError from "modules/validator.module";

const router = Router();
const api = makeInvoker(ContractController);
const Auth = makeInvoker(CheckAuth);
const validate = makeInvoker(ContractValidation);

/**
 * @api {post} /contract Creates New Contract
 * @apiGroup Contract
 * @apiName Create new Contract
 * @apiDescription creates a new contract which automatically inherits the current date
 * @apiVersion 0.0.1
 * @apiSuccessExample Success Response:

 */

/**
 * @api {patch} /contract/:id Updates Contract details
 * @apiGroup Contract
 * @apiName Updates existing Contract
 * @apiDescription Updates Contract
 * @apiVersion 0.0.1 
 * @apiSuccessExample Success Response:
 
 */

/**
 * @api {delete} /contract/:id Deletes Contract
 * @apiGroup Contract
 * @apiName Delete Contract
 * @apiDescription Deletes a single Contract
 * @apiVersion 0.0.1
 * @apiParam {:id} Id - Contract Id
 * @apiSuccessExample Success Response:

 */

/**
 * @api {get} /contract - All Contract for the day
 * @apiGroup Contract
 * @apiName Get Contract(s)
 * @apiDescription Gets all contract and populates the users involved
 * @apiVersion 0.0.1
 * @apiSuccessExample Success Response:

 */

/**
 * @api {get} /contract/:id Gets one Contract item
 * @apiGroup Contract
 * @apiName  Get Contract
 * @apiDescription Gets one contract
 * @apiVersion 0.0.1
 * @apiParam {:id} Id - Contract Id
 * @apiSuccessExample Success Response:

 */

router
  .route("/")
  .get(Auth("isLoggedIn"), api("getContracts"))
  .post(validate("create"), validateError, Auth("isLoggedIn"), api("createContract"))
  .all(MethodNotAllowedHandler);

router
  .route("/:id")
  .delete(Auth("isLoggedIn"), api("deleteContract"))
  .get(Auth("isLoggedIn"), api("getContract"))
  .patch(Auth("isLoggedIn"), api("updateContract"))
  .all(MethodNotAllowedHandler);

export default router;
