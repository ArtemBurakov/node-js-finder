const { body } = require('express-validator');

exports.createFcmTokenSchema = [
    body('registration_token')
        .exists()
        .withMessage('Registration token is required')
        .isLength({ min: 3 })
        .withMessage('Must be at least 3 chars long'),
    body('email')
        .exists()
        .withMessage('Email is required')
];
