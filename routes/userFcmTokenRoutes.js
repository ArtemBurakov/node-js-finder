module.exports = app => {
    const token = require("../controller/userFcmTokenController");

    // Add FCM token
    app.post("/user-fcm-tokens", token.addFcmToken);
};
