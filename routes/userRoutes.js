module.exports = app => {
    const users = require("../controller/UserController");
    const friends = require("../controller/UserFriendsController");
    const validationMiddleware = require('../middleware/validation-middleware');

    // Create a new User
    app.post("/users", validationMiddleware.create, users.create);

    // Authorize User
    app.post("/users/authorize", validationMiddleware.authorize, users.authorize);

    // User coordinates
    app.post("/users/coordinates", validationMiddleware.coordinates, users.coordinates);

    // Friends coordinates
    app.get("/users/coordinates", friends.coordinates);

    // // Retrieve all Users
    // app.get("/users", users.findAll);

    // // Retrieve a single User with userId
    // app.get("/users/:userId", users.findOne);

    // // Update a User with userId
    // app.put("/users/:userId", users.update);

    // // Delete a User with userId
    // app.delete("/users/:userId", users.delete);

    // // Delete all Users
    // app.delete("/users", users.deleteAll);
};
