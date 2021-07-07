const User = require('../models/User')
const Validator = require('validatorjs');

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;

// Tighten password policy
Validator.register('strict', value => passwordRegex.test(value),
  'password must contain at least one uppercase letter, one lowercase letter and one number');

/**
 * Checks if incoming value already exist for unique and non-unique fields in the database
 * e.g email: required|email|exists:User,email
 */
Validator.registerAsync('existEmail', function(value,  attribute, req, passes) {
  User.findByEmail(value, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        passes();
      }
    } else passes(false, 'This email has already been in use.');
  });
});

Validator.registerAsync('existUsername', function(value,  attribute, req, passes) {
  User.findByUsername(value, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        passes();
      }
    } else passes(false, 'This username has already been taken.');
  });
});

const validator = (body, rules, callback) => {
  const validation = new Validator(body, rules);

  validation.passes(() => callback(null, true));

  validation.fails(() => callback(validation.errors, false));
};

module.exports = validator;
