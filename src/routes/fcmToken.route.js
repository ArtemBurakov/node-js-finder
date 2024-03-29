const express = require('express');
const router = express.Router();
const fcmTokenController = require('../controllers/fcmToken.controller');
const auth = require('../middleware/auth.middleware');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createFcmTokenSchema } = require('../middleware/validators/fcmTokenValidator.middleware');

router.post('/', auth(), createFcmTokenSchema, awaitHandlerFactory(fcmTokenController.createFcmToken));

module.exports = router;
