const User = require("../models/userModel");
const TokenGenerator = require('uuid-token-generator');

const getCurrentTime = () => {
  return Math.floor(Date.now() / 1000);
}

const generateAccessToken = () => {
  return access_token = new TokenGenerator(256, TokenGenerator.BASE62).generate();
}

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a User
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    status: 10,
    created_at: getCurrentTime(),
    updated_at: getCurrentTime(),
    access_token: generateAccessToken()
  });

  // Save User in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
        err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};

// Authorize User
exports.authorize = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Make User model
  const user = new User({
    password: req.body.password,
    email: req.body.email
  });

  // Authorize User
  User.authorize(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
        err.message || "Some error occurred while authorizing the User."
      });
    else res.send(data);
  });
};

// // Retrieve all Users from the database.
// exports.findAll = (req, res) => {
//   User.getAll((err, data) => {
//     if (err)
//       res.status(500).send({
//           message:
//           err.message || "Some error occurred while retrieving users."
//       });
//     else res.send(data);
//   });
// };

// // Find a single User with a userId
// exports.findOne = (req, res) => {
//   User.findById(req.params.userId, (err, data) => {
//       if (err) {
//         if (err.kind === "not_found") {
//           res.status(404).send({
//             message: `Not found User with id ${req.params.userId}.`
//           });
//         } else {
//           res.status(500).send({
//             message: "Error retrieving User with id " + req.params.userId
//           });
//         }
//       } else res.send(data);
//     });
// };

// // Update a User identified by the userId in the request
// exports.update = (req, res) => {
//     // Validate Request
//     if (!req.body) {
//       res.status(400).send({
//         message: "Content can not be empty!"
//       });
//     }

//     User.updateById(
//       req.params.userId,
//       new User(req.body),
//       (err, data) => {
//         if (err) {
//           if (err.kind === "not_found") {
//             res.status(404).send({
//               message: `Not found User with id ${req.params.userId}.`
//             });
//           } else {
//             res.status(500).send({
//               message: "Error updating User with id " + req.params.userId
//             });
//           }
//         } else res.send(data);
//       }
//     );
// };

// // Delete a User with the specified userId in the request
// exports.delete = (req, res) => {
//   User.remove(req.params.userId, (err, data) => {
//       if (err) {
//         if (err.kind === "not_found") {
//           res.status(404).send({
//             message: `Not found User with id ${req.params.userId}.`
//           });
//         } else {
//           res.status(500).send({
//             message: "Could not delete User with id " + req.params.userId
//           });
//         }
//       } else res.send({ message: `User was deleted successfully!` });
//     });
// };

// // Delete all Users from the database.
// exports.deleteAll = (req, res) => {
//   User.removeAll((err, data) => {
//       if (err)
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while removing all users."
//         });
//       else res.send({ message: `All Users were deleted successfully!` });
//     });
// };
