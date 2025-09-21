const express = require('express');
const router = express.Router();
const welcomeEmailController = require('../controller/WelcomeEmailController');

router.post('/', welcomeEmailController.sendWelcomeEmail);

module.exports = router;