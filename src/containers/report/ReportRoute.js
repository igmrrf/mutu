import { Router } from "express";
import { makeInvoker } from "awilix-express";
import ReportController from "./ReportController";
import CheckAuth from "interfaces/http/middlewares/checkAuthentication";
import MethodNotAllowedHandler from "interfaces/http/middlewares/methodNotAllowed";
import ReportValidation from "./ReportValidation";
import validateError from "modules/validator.module";

const router = Router();
const api = makeInvoker(ReportController);
const Auth = makeInvoker(CheckAuth);
const validate = makeInvoker(ReportValidation);

/**
 * @api {post} /report Creates New Report
 * @apiGroup Report
 * @apiName Create new Report
 * @apiDescription creates a new report which automatically inherits the current date
 * @apiVersion 0.0.1
 * @apiSuccessExample Success Response:

 */

/**
 * @api {patch} /report/:id Updates Report details
 * @apiGroup Report
 * @apiName Updates existing Report
 * @apiDescription Updates Report
 * @apiVersion 0.0.1 
 * @apiSuccessExample Success Response:
 
 */

/**
 * @api {delete} /report/:id Deletes Report
 * @apiGroup Report
 * @apiName Delete Report
 * @apiDescription Deletes a single Report
 * @apiVersion 0.0.1
 * @apiParam {:id} Id - Report Id
 * @apiSuccessExample Success Response:

 */

/**
 * @api {get} /report - All Report for the day
 * @apiGroup Report
 * @apiName Get Report(s)
 * @apiDescription Gets all report and populates the users involved
 * @apiVersion 0.0.1
 * @apiSuccessExample Success Response:

 */

/**
 * @api {get} /report/:id Gets one Report item
 * @apiGroup Report
 * @apiName  Get Report
 * @apiDescription Gets one report
 * @apiVersion 0.0.1
 * @apiParam {:id} Id - Report Id
 * @apiSuccessExample Success Response:

 */

router
  .route("/")
  .get(Auth("isLoggedIn"), api("getReports"))
  .post(validate("create"), validateError, Auth("isLoggedIn"), api("createReport"))
  .all(MethodNotAllowedHandler);

router
  .route("/:id")
  .delete(Auth("isLoggedIn"), api("deleteReport"))
  .get(Auth("isLoggedIn"), api("getReport"))
  .patch(Auth("isLoggedIn"), api("updateReport"))
  .all(MethodNotAllowedHandler);

export default router;
