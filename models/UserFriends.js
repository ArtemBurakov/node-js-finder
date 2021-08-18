const sql = require("./db.js");

// constructor
const UserFriends = function(user) {
  this.user_id = user.user_id;
  this.friend_id = user.friend_id;
};

UserFriends.getFriends = (userId, result) => {
  sql.query(`SELECT friend_id FROM user_friends WHERE user_id = '${userId}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("getting users: ", res);
    result(null, res);
  });
};

module.exports = UserFriends;
