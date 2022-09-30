// const router = require('express').Router();
// const Auth = require('../../middlewares/auth');
// const Admin = require('../../interfaces/http/middlewares/admin');
// const isObjectId = require('../../middlewares/objectId');
// const { CreateValidation } = require('./UserValidation');
// const validator = require('../../modules/validator.module');
// const {
//   createUser,
//   updateUser,
//   getUser,
//   getUsers,
//   deleteUser,
//   AuthUser,
// } = require('./UserController');

// router.post('/auth', AuthUser);

// router.post('/', CreateValidation, validator, createUser);

// router.put('/:id', [Auth, isObjectId], updateUser);

// router.get('/', Auth, Admin, getUsers);

// router.get('/:id', isObjectId, getUser);

// router.delete('/:id', [Auth, Admin], isObjectId, deleteUser);

// module.exports = router;

import { Router } from "express";
import { makeInvoker } from "awilix-express";
import validator from "express-joi-validation";
import UserController from "interfaces/http/controllers/UserController";
import CheckAuth from "interfaces/http/middleware/checkAuthentication";
import MethodNotAllowedHandler from "middleware/methodNotAllowed";
import { profileSchema, verifyAccountSchema, userSchema } from "interfaces/http/validations/profile.validation";

const router = Router();
const api = makeInvoker(UserController);
const Auth = makeInvoker(CheckAuth);
const validate = validator.createValidator({
  passError: true,
});

/**
 * @api {patch} /users Update profile
 * @apiGroup Users
 * @apiName updateProfile
 * @apiDescription Updates user profile
 * @apiVersion 1.0.0
 * @apiParam {String} first_name - Users firstname 
 * @apiParam {String} last_name - User's lastname
 * @apiParam {String} username - User's username
 * @apiSuccessExample Success Response:
 * {
  "success": true,
  "status_code": 200,
  "message": "User profile updated successfully!",
  "data": {
    "first_name": "Shobowale",
    "last_name": "felicia",
    "email": "funmibolarious@yahoo.com",
    "username": "abimbola",
    "email_verified": false,
    "_id": "619264e3fcbf819c99e0026c",
    "created_at": "2021-11-15T13:47:15.494Z",
    "updated_at": "2021-11-19T07:21:44.590Z"
  },
  "links": []
}
 */

/**
 * @api {post} /users/create Create a user
 * @apiGroup Users
 * @apiName createUser
 * @apiDescription Admin and staff can create a user 
 * @apiVersion 1.0.0
 * @apiParam {String} first_name - Users firstname 
 * @apiParam {String} last_name - User's lastname
 * @apiParam {String} phone - User's phone number
 * @apiParam {String} email - User's email 
 * @apiSuccessExample Success Response:
 * {
 {
    "success": true,
    "status_code": 200,
    "message": "User successfully created!",
    "data": {
        "first_name": "Abimbola",
        "last_name": "Bamgbelu",
        "phone": "09023475055",
        "email": "abimboa@brindocor.com",
        "username": "abimbola2728",
        "email_verified": true,
        "account_verified": false,
        "verification_status": "Not Started",
        "isonboarded": false,
        "_id": "6229f3e0b473b7dbe0e5772a",
        "created_at": "2022-03-10T12:49:36.317Z",
        "updated_at": "2022-03-10T12:49:36.317Z"
    },
    "links": []
}
 */

/**
 * @api {get} /users/whoami Logged in User
 * @apiGroup Users
 * @apiName Current Staff
 * @apiDescription Gets the current logged in user
 * @apiVersion 1.0.0
 * * @apiParam {String} proof_of_address - This is proff of address of a user
 * @apiParam {String} government_id - This is government id image of a user
 * @apiSuccessExample Success Response:
 {
    "success": true,
    "status_code": 200,
    "message": "Account verification documents uploaded",
    "data": {},
    "links": []
}
 */
/**
 * @api {get} /users/verify-account verify a users account
 * @apiGroup Users
 * @apiName Users
 * @apiDescription Verifies a users account.
 * @apiVersion 1.0.0
 * @apiSuccessExample Success Response:
 * {
  "success": true,
  "status_code": 200,
  "message": "User fetched successfully!",
  "data": [
    {
      "_id": "61eae32621ce1847caeed5c1",
      "first_name": "Richard",
      "last_name": "Igbiriki",
      "email": "imorobebh+15@gmail.com"
      "phone": "09091123232",     
      "created_at": "2022-01-21T16:45:26.698Z",
      "updated_at": "2022-01-21T16:45:26.698Z",
      "__v": 0
    }
  ],
  "links": []
}
 */

/**
 * @api {get} / Gets all users in Database
 * @apiGroup Users
 * @apiName Users
 * @apiDescription Gets all users in the Database.
 * @apiVersion 1.0.0
 * @apiParam {String} user_type- Refers to the type of user being searched for.
 * @apiSuccessExample Success Response:
{
    "success": true,
    "status_code": 200,
    "message": "Users  fetched successfully!",
    "data": [
        {
           {
            "_id": "621b26fc664ddb2bb5b34e71",
            "first_name": "Susan",
            "last_name": "Olapade",
            "username": "susan",
            "email": "susan@usemutu.com",
            "user_type": "staff",
            "email_verified": true,
            "verification_status": "Not Started",
            "account_verified": false,
            "isonboarded": false,
            "created_at": "2022-02-27T07:23:40.046Z",
            "updated_at": "2022-02-27T07:23:40.046Z",
            "__v": 0
        },
        },
      ]
 */

/**
 * @api {get} /:id Gets a user in Database
 * @apiGroup Users
 * @apiName User
 * @apiDescription Gets one user in the Database.
 * @apiVersion 1.0.0
 * @apiParam {:id} id- Refers to the Id of the user stored in the database.
 * @apiSuccessExample Success Response:
{
    "success": true,
    "status_code": 200,
    "message": "User  fetched successfully!",
    "data": 
       {
        "first_name": "Susan",
        "last_name": "Olapade",
        "email": "susan@usemutu.com",
        "username": "susan",
        "email_verified": true,
        "account_verified": true,
        "verification_status": "Not Started",
        "isonboarded": false,
        "_id": "621b26fc664ddb2bb5b34e71",
        "created_at": "2022-02-27T07:23:40.046Z",
        "updated_at": "2022-03-07T01:35:56.736Z"
    },
     "links": []
 */

/**
 * @api {patch} /verify/:id Verifies a user account in db
 * @apiGroup Users
 * @apiName User
 * @apiDescription Verifies a user account in the database
 * @apiVersion 1.0.0
 * @apiParam {:id} id- Refers to the Id of the user stored in the database.
 * @apiSuccessExample Success Response:
{
    "success": true,
    "status_code": 200,
    "message": "User account verified successfully successfully!",
    "data": {
        "first_name": "Susan",
        "last_name": "Olapade",
        "email": "susan@usemutu.com",
        "username": "susan",
        "email_verified": true,
        "account_verified": true,
        "verification_status": "Not Started",
        "isonboarded": false,
        "_id": "621b26fc664ddb2bb5b34e71",
        "created_at": "2022-02-27T07:23:40.046Z",
        "updated_at": "2022-03-07T01:35:56.736Z"
    },
    "links": []
}
 */

router.route("/create").post(Auth("isAdminOrStaff"), api("createUser")).all(MethodNotAllowedHandler);

router
  .route("/")
  .patch(Auth("isLoggedIn"), validate.body(profileSchema), api("updateProfile"))
  .get(Auth("isAdminOrStaff"), validate.query(userSchema), api("getUsers"))
  .all(MethodNotAllowedHandler);

router.route("/:id").get(Auth("isLoggedIn"), api("getUser")).all(MethodNotAllowedHandler);

router
  .route("/verify-account")
  .patch(Auth("isLoggedIn"), validate.body(verifyAccountSchema), api("verifyUserAccount"))
  .all(MethodNotAllowedHandler);
router.route("/whoami").get(Auth("isLoggedIn"), api("getCurrentUser")).all(MethodNotAllowedHandler);

router.route("/stats").get(Auth("isLoggedIn"), api("getUsersStatistics")).all(MethodNotAllowedHandler);

router
  .route("/verify/:id")
  .patch(Auth("isAdminOrStaff"), api("verifyAccountStatus"))
  .all(MethodNotAllowedHandler);

export default router;
