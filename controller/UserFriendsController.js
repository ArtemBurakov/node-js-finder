const User = require("../models/User");
const UserFriends = require("../models/UserFriends");

// Get last friends coordinates
exports.coordinates = async (req, res) => {
  // Verify User by accessToken
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
    } else {
      const userId = data.id;

      UserFriends.getFriends(userId, async (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              success: false,
              data:{
                userId: userId
              },
              message: `Not found User with id ${userId}.`
            });
          } else {
            res.status(500).send({
              success: false,
              data:{
                userId: userId
              },
              message: 'Error retrieving User with id ' + userId
            });
          }
        } else {
          let friends = [];

          let result = new Promise((resolve, reject) => {
            data.forEach(async (friend) => {
              let data = await User.findById(friend.friend_id);
              friends.push(data);
            });
          });

          result.then(() => {
            console.log('All done!');

            res.send({
              success: true,
              friends,
              message: 'Your friends info get successful'
            });
          });
        }
      });
    }
  });
};
