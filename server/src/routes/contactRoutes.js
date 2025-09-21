const express = require('express');
const router = express.Router();
const contactController = require('../controller/ContactController');

router.post('/', contactController.submitContactForm);

module.exports = router;