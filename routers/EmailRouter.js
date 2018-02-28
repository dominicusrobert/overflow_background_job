const express = require('express');
const router = express.Router();

const EmailController = require ('../controllers/EmailController');
router.post('/sendemail', EmailController.sendEmail);

module.exports = router;
