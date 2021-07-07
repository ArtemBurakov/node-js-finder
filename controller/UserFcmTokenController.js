const User = require("../models/User");
const UserFcmToken = require("../models/UserFcmToken");

const getCurrentTime = () => {
  return Math.floor(Date.now() / 1000);
}

// Add FCM Token
exports.addFcmToken = (req, res) => {
  // Get User by accessToken
  const accessToken = req.headers['authorization'].split(' ')[1];

  User.findByAccessToken(accessToken, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(401).send({
          success: false,
          data: null,
          message: `Unauthorized.`
        });
      } else {
        res.status(500).send({
          success: false,
          data: null,
          message: 'Some error occurred while getting User by accessToken.'
        });
      }
    }
    else {
      const userId = data.id;

      // Create a FCM Token
      const userFcmToken = new UserFcmToken({
        registration_token: req.body.registration_token,
        user_id: userId,
        created_at: getCurrentTime(),
        updated_at: getCurrentTime(),
      });

      // Add UserFcmToken in the database
      UserFcmToken.add(userFcmToken, (err, data) => {
        if (err) {
          res.status(500).send({
            success: false,
            data: null,
            message: 'Some error occurred while creating the UserFcmToken.'
          });
        } else {
          res.send({
            success: true,
            data: {
              id: data.id,
              user_id: data.user_id
            },
            message: 'FCM token added successful.'
          });
        }
      });
    }
  });
};
