const express = require('express');
const router = express.Router();
const { loginUser, getMe } = require('../controllers/authController');
const { isAuthenticatedUser } = require('../middleware/authMiddleware');

router.post('/login', loginUser);
router.get('/me', isAuthenticatedUser, getMe);

module.exports = router;
