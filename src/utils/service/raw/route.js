module.exports = (name) => `import { Router } from "express";
import { makeInvoker } from "awilix-express";
import ${name}Controller from "./${name}Controller";
import CheckAuth from "interfaces/http/middlewares/checkAuthentication";
import MethodNotAllowedHandler from "interfaces/http/middlewares/methodNotAllowed";
import ${name}Validation from "./${name}Validation";
import validateError from "modules/validator.module";

const router = Router();
const api = makeInvoker(${name}Controller);
const Auth = makeInvoker(CheckAuth);
const validate = makeInvoker(${name}Validation);

/**
 * @api {post} /${name.toLowerCase()} Creates New ${name}
 * @apiGroup ${name}
 * @apiName Create new ${name}
 * @apiDescription creates a new ${name.toLowerCase()} which automatically inherits the current date
 * @apiVersion 0.0.1
 * @apiSuccessExample Success Response:

 */

/**
 * @api {patch} /${name.toLowerCase()}/:id Updates ${name} details
 * @apiGroup ${name}
 * @apiName Updates existing ${name}
 * @apiDescription Updates ${name}
 * @apiVersion 0.0.1 
 * @apiSuccessExample Success Response:
 
 */

/**
 * @api {delete} /${name.toLowerCase()}/:id Deletes ${name}
 * @apiGroup ${name}
 * @apiName Delete ${name}
 * @apiDescription Deletes a single ${name}
 * @apiVersion 0.0.1
 * @apiParam {:id} Id - ${name} Id
 * @apiSuccessExample Success Response:

 */

/**
 * @api {get} /${name.toLowerCase()} - All ${name} for the day
 * @apiGroup ${name}
 * @apiName Get ${name}(s)
 * @apiDescription Gets all ${name.toLowerCase()} and populates the users involved
 * @apiVersion 0.0.1
 * @apiSuccessExample Success Response:

 */

/**
 * @api {get} /${name.toLowerCase()}/:id Gets one ${name} item
 * @apiGroup ${name}
 * @apiName  Get ${name}
 * @apiDescription Gets one ${name.toLowerCase()}
 * @apiVersion 0.0.1
 * @apiParam {:id} Id - ${name} Id
 * @apiSuccessExample Success Response:

 */

router
  .route("/")
  .get(Auth("isLoggedIn"), api("get${name}s"))
  .post(validate("create"), validateError, Auth("isLoggedIn"), api("create${name}"))
  .all(MethodNotAllowedHandler);

router
  .route("/:id")
  .delete(Auth("isLoggedIn"), api("delete${name}"))
  .get(Auth("isLoggedIn"), api("get${name}"))
  .patch(Auth("isLoggedIn"), api("update${name}"))
  .all(MethodNotAllowedHandler);

export default router;
`;
