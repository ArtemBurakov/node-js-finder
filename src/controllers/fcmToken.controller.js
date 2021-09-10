const FcmTokenModel = require('../models/fcmToken.model');
const UserModel = require('../models/user.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              Fcm Token Controller
 ******************************************************************************/
class FcmTokenController {
    createFcmToken = async (req, res, next) => {
        this.checkValidation(req);

        const { email, registration_token } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            throw new HttpException(401, 'Unable to create fcm token!');
        }
        const userId = user.id;

        const result = await FcmTokenModel.create({registration_token: registration_token, user_id: userId});

        if (!result) {
            throw new HttpException(500, 'Something went wrong');
        }

        res.status(201).send('FcmToken was created!');
    };

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new FcmTokenController;
