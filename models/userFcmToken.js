const sql = require("./db.js");

// constructor
const UserFcmToken = function(fcmToken) {
    this.registration_token = fcmToken.registration_token;
    this.user_id = fcmToken.user_id;
    this.created_at = fcmToken.created_at;
    this.updated_at = fcmToken.updated_at;
};

UserFcmToken.add = (newUserFcmToken, result) => {
  sql.query("INSERT INTO user_fcm_token SET ?", newUserFcmToken, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("FCM token added: ", { id: res.insertId, ...newUserFcmToken });
    result(null, { id: res.insertId, ...newUserFcmToken });
  });
}

module.exports = UserFcmToken;
