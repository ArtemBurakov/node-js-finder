const User = require("../models/User");
const TokenGenerator = require('uuid-token-generator');

const getCurrentTime = () => {
  return Math.floor(Date.now() / 1000);
}

const generateAccessToken = () => {
  return access_token = new TokenGenerator(256, TokenGenerator.BASE62).generate();
}

// Create and Save a new User
exports.create = (req, res) => {
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
        success: false,
        data: null,
        message: 'Some error occurred while creating the User.'
      });
    else res.send({
      success: true,
      data: {
        id: data.id,
        email: data.email,
        username: data.username
      },
      message: 'User created successful.'
    });
  });
};

// Authorize User
exports.authorize = (req, res) => {
  // Make User model
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });

  // Authorize User
  User.authorize(user, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          success: false,
          data: null,
          message: `Not found User. Check your email or password.`
        });
      } else {
        res.status(500).send({
          success: false,
          data: null,
          message: 'Some error occurred while authorizing the User.'
        });
      }
    }
    else res.send({
      success: true,
      data: {
        id: data.id,
        email: data.email,
        username: data.username,
        access_token: data.access_token
      },
      message: 'User authorized successful.'
    });
  });
};

// Find a single User with a userId
exports.findOne = (req, res) => {
  User.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          success: false,
          data:{
            userId: req.params.userId
          },
          message: `Not found User with id ${req.params.userId}.`
        });
      } else {
        res.status(500).send({
          success: false,
          data:{
            userId: req.params.userId
          },
          message: 'Error retrieving User with id ' + req.params.userId
        });
      }
    } else res.send(data);
  });
};

// Find a single User with a email
exports.findOne = (req, res) => {
  User.findByEmail(req.params.email, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          success: false,
          data:{
            userEmail: req.params.email
          },
          message: `Not found User with email ${req.params.email}.`
        });
      } else {
        res.status(500).send({
          success: false,
          data:{
            userEmail: req.params.email
          },
          message: "Error retrieving User with email " + req.params.email
        });
      }
    } else res.send(data);
  });
};

// Find a single User with a username
exports.findOne = (req, res) => {
  User.findByUsername(req.params.username, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          success: false,
          data:{
            userName: req.params.username
          },
          message: `Not found User with username ${req.params.username}.`
        });
      } else {
        res.status(500).send({
          success: false,
          data:{
            userName: req.params.username
          },
          message: "Error retrieving User with username " + req.params.username
        });
      }
    } else res.send(data);
  });
};

// // Retrieve all Users from the database.
// exports.findAll = (req, res) => {
//   User.getAll((err, data) => {
//     if (err)
//       res.status(500).send({
//         success: false,
//         data: null,
//         message: 'Some error occurred while retrieving users.'
//       });
//     else res.send(data);
//   });
// };

// // Update a User identified by the userId in the request
// exports.update = (req, res) => {
//   User.updateById(req.params.userId, new User(req.body),
//     (err, data) => {
//       if (err) {
//         if (err.kind === "not_found") {
//           res.status(404).send({
//             success: false,
//             data:{
//               userId: req.params.userId
//             },
//             message: `Not found User with id ${req.params.userId}.`
//           });
//         } else {
//           res.status(500).send({
//             success: false,
//             data:{
//               userId: req.params.userId
//             },
//             message: "Error updating User with id " + req.params.userId
//           });
//         }
//       } else res.send(data);
//     }
//   );
// };

// // Delete a User with the specified userId in the request
// exports.delete = (req, res) => {
//   User.remove(req.params.userId, (err, data) => {
//     if (err) {
//       if (err.kind === "not_found") {
//         res.status(404).send({
//           success: false,
//           data:{
//             userId: req.params.userId
//           },
//           message: `Not found User with id ${req.params.userId}.`
//         });
//       } else {
//         res.status(500).send({
//           success: false,
//           data:{
//             userId: req.params.userId
//           },
//           message: "Could not delete User with id " + req.params.userId
//         });
//       }
//     } else res.send({
//       success: true,
//       data: null,
//       message: `User was deleted successfully!`
//     });
//   });
// };
