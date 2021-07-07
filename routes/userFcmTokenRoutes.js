module.exports = app => {
    const token = require("../controller/UserFcmTokenController");
    const validationMiddleware = require('../middleware/validation-middleware');

    // Add FCM token
    app.post("/user-fcm-tokens", validationMiddleware.addFcmToken, token.addFcmToken);
};
