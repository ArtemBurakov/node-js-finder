const sql = require("./db.js");

// constructor
const User = function(user) {
  this.username = user.username;
  this.password_hash = user.password_hash;
  this.email = user.email;
  this.status = user.status;
  this.created_at = user.created_at;
  this.updated_at = user.updated_at;
  this.last_latitude = user.last_latitude;
  this.last_longitude = user.last_longitude;
  this.access_token = user.access_token;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findByAccessToken = (userAccessToken, result) => {
  sql.query(`SELECT id FROM users WHERE access_token = '${userAccessToken}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user by accessToken: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the accessToken
    result({ kind: "not_found" }, null);
  });
};

User.findById = (userId, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.findByEmail = (email, result) => {
  sql.query(`SELECT * FROM users WHERE email = '${email}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user by email: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the email
    result({ kind: "not_found" }, null);
  });
};

User.findByUsername = (username, result) => {
  sql.query(`SELECT * FROM users WHERE username = '${username}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user by username: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the username
    result({ kind: "not_found" }, null);
  });
};

User.coordinates = (user, result) => {
  sql.query("UPDATE users SET last_latitude = ?, last_longitude = ? WHERE email = ?",
    [user.last_latitude, user.last_longitude, user.email],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the email
        result({ kind: "not_found" }, null);
        return;
      }

      result(null, null);
    }
  );
};

// User.getAll = result => {
//   sql.query("SELECT * FROM users", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log("users: ", res);
//     result(null, res);
//   });
// };

// User.updateById = (id, user, result) => {
//   sql.query(
//     "UPDATE users SET email = ?, name = ?, active = ? WHERE id = ?",
//     [user.email, user.name, user.active, id],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       if (res.affectedRows == 0) {
//         // not found User with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }

//       console.log("updated user: ", { id: id, ...user });
//       result(null, { id: id, ...user });
//     }
//   );
// };

// User.remove = (id, result) => {
//   sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     if (res.affectedRows == 0) {
//       // not found User with the id
//       result({ kind: "not_found" }, null);
//       return;
//     }

//     console.log("deleted user with id: ", id);
//     result(null, res);
//   });
// };

module.exports = User;
