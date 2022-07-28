const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');
const Role = require('../utils/userRoles.utils');
const awaitHandlerFactory = require('../middleware/awaitHandlerFactory.middleware');

const { createUserSchema, updateUserSchema, validateLocation, validateLogin } = require('../middleware/validators/userValidator.middleware');

router.get('/', auth(), awaitHandlerFactory(userController.getAllUsers));
router.get('/id/:id', auth(), awaitHandlerFactory(userController.getUserById));
router.get('/username/:username', auth(), awaitHandlerFactory(userController.getUserByUserName));
router.get('/whoami', auth(), awaitHandlerFactory(userController.getCurrentUser));
router.get('/locations/:email', auth(), awaitHandlerFactory(userController.getUsersLocations));
router.get('/friends/:email', auth(), awaitHandlerFactory(userController.getUserFriends));

router.post('/friend', auth(), awaitHandlerFactory(userController.addFriend));
router.post('/', createUserSchema, awaitHandlerFactory(userController.createUser));
router.post('/location', auth(), validateLocation, awaitHandlerFactory(userController.saveUserLocation));

router.patch('/id/:id', auth(Role.Admin), updateUserSchema, awaitHandlerFactory(userController.updateUser));

router.delete('/id/:id', auth(Role.Admin), awaitHandlerFactory(userController.deleteUser));
router.delete('/friend/:user_email/:friend_email', auth(), awaitHandlerFactory(userController.deleteFriend));

router.post('/login', validateLogin, awaitHandlerFactory(userController.userLogin));

module.exports = router;
