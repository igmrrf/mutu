const router = require('express').Router();
const Auth = require('../../middlewares/auth');
const Admin = require('../../interfaces/http/middlewares/admin');
const isObjectId = require('../../middlewares/objectId');
const validator = require('../../modules/validator.module');
const { createCategoryValidation } = require('./CategoryValidation');
const {
  createCategory,
  updateCategory,
  getCategory,
  getCategorys,
  deleteCategory,
} = require('./CategoryController');

router.post(
  '/',
  [Auth, Admin],
  createCategoryValidation,
  validator,
  createCategory
);

router.put('/:id', [Auth, isObjectId], updateCategory);

router.get('/', [Auth, Admin], getCategorys);

router.get('/:id', isObjectId, getCategory);

router.delete('/:id', [Auth, Admin], isObjectId, deleteCategory);

module.exports = router;
