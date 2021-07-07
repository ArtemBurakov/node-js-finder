const User = require("../models/user");
const UserFcmToken = require("../models/userFcmToken");

const getCurrentTime = () => {
  return Math.floor(Date.now() / 1000);
}

// Add FCM Token
exports.addFcmToken = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Get User by accessToken
  const accessToken = req.headers['authorization'].split(' ')[1];

  User.findByAccessToken(accessToken, (err, data) => {
    if (err)
      res.status(500).send({
        message:
        err.message || "User do not have this access token, need relogin."
      });
    else {
      const userId = data;

      // Create a FCM Token
      const userFcmToken = new UserFcmToken({
        registration_token: req.body.registration_token,
        user_id: userId,
        created_at: getCurrentTime(),
        updated_at: getCurrentTime(),
      });

      // Add UserFcmToken in the database
      UserFcmToken.add(userFcmToken, (err, data) => {
        if (err)
          res.status(500).send({
            message:
            err.message || "Some error occurred while creating the UserFcmToken."
          });
        else res.send(data);
      });
    }
  });
};
