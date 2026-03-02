const express = require('express');
const router = express.Router();
const { getProducts, getSingleProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

router.get('/', getProducts);
router.get('/:id', getSingleProduct);

// Admin routes
router.post('/', isAuthenticatedUser, authorizeRoles('admin'), upload.array('images', 5), createProduct);
router.put('/:id', isAuthenticatedUser, authorizeRoles('admin'), upload.array('images', 5), updateProduct);
router.delete('/:id', isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

module.exports = router;
