const util = require('.');
const { body, validationResult } = require('express-validator');
const { checkExistingEmail } = require('../models/account-model');

const validate = {};

/*  **********************************
 *  Registration Data Validation Rules
 * ********************************* */
validate.registrationRules = () => {
  return [
    // firstname is required and must be string
    body('account_firstname').trim().isLength({ min: 1 }).withMessage('Please provide a first name.'), // on error this message is sent.

    // lastname is required and must be string
    body('account_lastname').trim().isLength({ min: 1 }).withMessage('Please provide a last name.'), // on error this message is sent.

    // valid email is required and cannot already exist in the DB
    body('account_email')
      .trim()
      .isEmail()
      .normalizeEmail() // refer to validator.js docs
      .withMessage('A valid email is required.')
      .custom(async (account_email) => {
        const emailExists = await checkExistingEmail(account_email);
        if (emailExists) {
          throw new Error('Email exists. Please log in or use different email');
        }
      }),

    // password is required and must be strong password
    body('account_password')
      .trim()
      .isStrongPassword({
        minLength: 12,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage('Password does not meet requirements.'),
  ];
};

/*  **********************************
 *  Login Data Validation Rules
 * ********************************* */
validate.loginRules = () => {
  return [
    // Username is required
    body('account_email').trim().isEmail().withMessage('Username or password is incorrect.'),

    // Password is required
    body('account_password').trim().isLength({ min: 12 }).withMessage('Username or password is incorrect.'),
  ];
};

/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkRegData = async (req, res, next) => {
  console.log('hit');
  const { account_firstname, account_lastname, account_email } = req.body;
  const errors = validationResult(req) || [];
  if (!errors.isEmpty()) {
    let nav = await util.getNav();
    res.render('account/register', {
      errors,
      title: 'Registration',
      nav,
      account_firstname,
      account_lastname,
      account_email,
    });
    return;
  }
  next();
};

/* ******************************
 * Check data and return errors or continue to login
 * ***************************** */
validate.checkLoginData = async (req, res, next) => {
  const { account_email } = req.body;
  const errors = validationResult(req) || [];
  if (!errors.isEmpty()) {
    let nav = await util.getNav();
    res.render('account/login', {
      errors,
      title: 'Login',
      nav,
      account_email,
    });
    return;
  }
  next();
};

module.exports = validate;
