const UserModel = require('../models/user.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class UserController {
    getAllUsers = async (req, res, next) => {
        let userList = await UserModel.find();
        if (!userList.length) {
            throw new HttpException(404, 'Users not found');
        }

        userList = userList.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });

        res.send(userList);
    };

    getUserById = async (req, res, next) => {
        const user = await UserModel.findOne({ id: req.params.id });
        if (!user) {
            throw new HttpException(404, 'User not found');
        }

        const { password, ...userWithoutPassword } = user;

        res.send(userWithoutPassword);
    };

    getUserByUserName = async (req, res, next) => {
        const user = await UserModel.findOne({ username: req.params.username });
        if (!user) {
            throw new HttpException(404, 'User not found');
        }

        const { password, ...userWithoutPassword } = user;

        res.send(userWithoutPassword);
    };

    getCurrentUser = async (req, res, next) => {
        const { password, ...userWithoutPassword } = req.currentUser;

        res.send(userWithoutPassword);
    };

    getUsersLocations = async (req, res, next) => {
        const user = await UserModel.findOne({email: req.params.email});
        if (!user) {
            throw new HttpException(404, 'User not found');
        }

        let friends = await UserModel.findFriends({ user_id: user.id });
        if (!friends.length) {
            throw new HttpException(404, 'Users not found');
        }

        const promises = friends.map(async friend => {
            const founded_friend = await UserModel.findOne({id: friend.friend_id});
            return founded_friend;
        })

        const friendsList = await Promise.all(promises);
        res.send(friendsList);
    };

    getUserFriends = async (req, res, next) => {
        const user = await UserModel.findOne({email: req.params.email});
        if (!user) {
            throw new HttpException(404, 'User not found');
        }

        let friends = await UserModel.findFriends({ user_id: user.id });
        if (!friends.length) {
            throw new HttpException(404, 'Users not found');
        }

        const promises = friends.map(async friend => {
            const founded_friend = await UserModel.findOne({id: friend.friend_id});
            return founded_friend;
        })

        const friendsList = await Promise.all(promises);
        res.send(friendsList);
    };

    createUser = async (req, res, next) => {
        this.checkValidation(req);

        await this.hashPassword(req);

        const result = await UserModel.create(req.body);

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('User was created!');
    };

    updateUser = async (req, res, next) => {
        this.checkValidation(req);

        await this.hashPassword(req);

        const { password, ...restOfUpdates } = req.body;

        // do the update query and get the result
        // it can be partial edit
        const result = await UserModel.update(restOfUpdates, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'User not found' :
            affectedRows && changedRows ? 'User updated successfully' : 'Updated faild';

        res.send({ message, info });
    };

    deleteUser = async (req, res, next) => {
        const result = await UserModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'User not found');
        }
        res.send('User has been deleted');
    };

    deleteFriend = async (req, res, next) => {
        const user = await UserModel.findOne({ email: req.params.user_email });
        const friend = await UserModel.findOne({ email: req.params.friend_email });

        const result = await UserModel.deleteFriend(user.id, friend.id);
        if (!result) {
            throw new HttpException(404, 'User not found');
        }
        res.send('Friend has been deleted');
    };

    userLogin = async (req, res, next) => {
        this.checkValidation(req);

        const { email, password: pass } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            throw new HttpException(401, 'Unable to login!');
        }

        const isMatch = await bcrypt.compare(pass, user.password);

        if (!isMatch) {
            throw new HttpException(401, 'Incorrect password!');
        }

        // user matched!
        const secretKey = process.env.SECRET_JWT || "";
        const token = jwt.sign({ user_id: user.id.toString() }, secretKey, {
            expiresIn: '48h'
        });

        const { password, ...userWithoutPassword } = user;

        res.send({ ...userWithoutPassword, token });
    };

    addFriend = async (req, res, next) => {
        this.checkValidation(req);

        const { email, friend_email: friend_email } = req.body;
        const user = await UserModel.findOne({ email });
        const friend = await UserModel.findOne({ email: friend_email });

        if (user.id == friend.id) {
            throw new HttpException(400, 'Something went wrong');
        }
        if (!user || !friend) {
            throw new HttpException(404, 'Something went wrong');
        }

        let friends = await UserModel.findFriends({ user_id: user.id });
        if (!friends) {
            throw new HttpException(404, 'Something went wrong');
        }
        await Promise.all(friends.map(retrivedFriend => {
            if (friend.id == retrivedFriend.friend_id) {
                throw new HttpException(400, 'Something went wrong');
            }
        }))

        const result = await UserModel.addFriend({user_id: user.id, friend_id: friend.id});
        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        res.status(201).send('User has been added to your friends list!');
    };

    saveUserLocation = async (req, res, next) => {
        this.checkValidation(req);

        const { email, ...restOfUpdates } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            throw new HttpException(401, 'Unable to login!');
        }

        // do the update query and get the result
        // it can be partial edit
        const result = await UserModel.update(restOfUpdates, user.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'User not found' :
            affectedRows && changedRows ? 'User updated successfully' : 'Updated faild';

        res.send({ message, info });
    };

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }

    // hash password if it exists
    hashPassword = async (req) => {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 8);
        }
    }
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new UserController;
