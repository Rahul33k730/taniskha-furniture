const express = require('express');
const router = express.Router();
const { createFeedback, getFeedbacks } = require('../controllers/feedbackController');

router.get('/', getFeedbacks);
router.post('/', createFeedback);

module.exports = router;
