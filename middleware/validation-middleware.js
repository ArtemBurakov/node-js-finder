const Validator = require('../helpers/validate');

const create = async (req, res, next) => {
  const validationRule = {
    "email": "required|string|email|existEmail",
    "username": "required|string|existUsername",
    "password": "required|string|min:6|strict"
  }

  await Validator(req.body, validationRule, (err, status) => {
    if (!status) {
      res.status(412)
        .send({
          success: false,
          message: 'Validation failed',
          data: err
        });
    } else {
      next();
    }
  });
}

const authorize = async (req, res, next) => {
  const validationRule = {
    "email": "required|string|email",
    "password": "required|string|min:6"
  }

  await Validator(req.body, validationRule, (err, status) => {
    if (!status) {
      res.status(412)
        .send({
          success: false,
          message: 'Validation failed',
          data: err
        });
    } else {
      next();
    }
  });
}

const coordinates = async (req, res, next) => {
  const validationRule = {
    "latitude": "required",
    "longitude": "required"
  }

  await Validator(req.body, validationRule, (err, status) => {
    if (!status) {
      res.status(412)
        .send({
          success: false,
          message: 'Validation failed',
          data: err
        });
    } else {
      next();
    }
  });
}

const addFcmToken = async (req, res, next) => {
  const validationRule = {
    "registration_token": "required",
  }

  await Validator(req.body, validationRule, (err, status) => {
    if (!status) {
      res.status(412)
        .send({
          success: false,
          message: 'Validation failed',
          data: err
        });
    } else {
      next();
    }
  });
}

module.exports = {
  create,
  authorize,
  coordinates,
  addFcmToken
};
