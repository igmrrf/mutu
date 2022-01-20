const router = require('express').Router();
const Auth = require('../../middlewares/auth');
const Admin = require('../../middlewares/admin');
const isObjectId = require('../../middlewares/objectId');
const {
  createProduct,
  updateProduct,
  getProduct,
  getProducts,
  deleteProduct,
} = require('./ProductController');

router.post('/', [Auth, Admin], createProduct);

router.put('/:id', [Auth, isObjectId], updateProduct);

router.get('/', [Auth, Admin], getProducts);

router.get('/:id', isObjectId, getProduct);

router.delete('/:id', [Auth, Admin], isObjectId, deleteProduct);

module.exports = router;
