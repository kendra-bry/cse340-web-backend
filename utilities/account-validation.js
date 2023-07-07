const { getNav } = require('.');
const { body, validationResult } = require('express-validator');
const { checkExistingEmail, getAccountById } = require('../models/account-model');

const validate = {};

// ================ Rules ================

const ACCOUNT_FIELD_RULES = {
  firstName: body('account_firstname').trim().isLength({ min: 1 }).withMessage('Please provide a first name.'),
  lastName: body('account_lastname').trim().isLength({ min: 1 }).withMessage('Please provide a last name.'),
  accountEmail: body('account_email')
    .trim()
    .isEmail()
    .withMessage('A valid email is required.')
    .custom(async (account_email, { req }) => {
      const { account_id } = req.body;
      const emailExists = await checkExistingEmail(account_email);

      if (account_id) {
        const accountData = await getAccountById(account_id);
        if (accountData && accountData.account_email !== account_email) {
          if (emailExists) {
            throw new Error('Email exists. Please use a different email');
          }
        } else {
          return;
        }
      }

      if (emailExists) {
        throw new Error('Email exists. Please use a different email');
      }
    }),
  accountPwd: body('account_password')
    .trim()
    .isStrongPassword({
      minLength: 12,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage('Password does not meet requirements.'),
  loginEmail: body('account_email').trim().isEmail().withMessage('Username or password is incorrect.'),
  loginPwd: body('account_password').trim().isLength({ min: 12 }).withMessage('Username or password is incorrect.'),
};

/*  **********************************
 *  Registration Data Validation Rules
 * ********************************* */
validate.registrationRules = () => {
  // prettier-ignore
  return [
    ACCOUNT_FIELD_RULES.firstName,
    ACCOUNT_FIELD_RULES.lastName,
    ACCOUNT_FIELD_RULES.accountEmail,
    ACCOUNT_FIELD_RULES.accountPwd,
  ];
};

/*  **********************************
 *  Login Data Validation Rules
 * ********************************* */
validate.loginRules = () => {
  // prettier-ignore
  return [
    ACCOUNT_FIELD_RULES.loginEmail,
    ACCOUNT_FIELD_RULES.loginPwd,
  ];
};

/*  **********************************
 *  Update Account Validation Rules
 * ********************************* */
validate.updateAccountRules = () => {
  // prettier-ignore
  return [
    ACCOUNT_FIELD_RULES.firstName,
    ACCOUNT_FIELD_RULES.lastName,
    ACCOUNT_FIELD_RULES.accountEmail,
  ];
};

/*  **********************************
 *  Update Password Validation Rules
 * ********************************* */
validate.updatePasswordRules = () => {
  return [ACCOUNT_FIELD_RULES.accountPwd];
};

// =========== Checking Methods ============

/* ******************************
 * Check data and return errors
 * or continue to registration
 * ***************************** */
validate.checkRegData = async (req, res, next) => {
  const { account_firstname, account_lastname, account_email } = req.body;
  const errors = validationResult(req) || [];
  if (!errors.isEmpty()) {
    const nav = await getNav();

    res.render('account/register', {
      title: 'Registration',
      nav,
      errors,
      account_firstname,
      account_lastname,
      account_email,
    });
    return;
  }
  next();
};

/* ******************************
 * Check Account Update Data
 * ***************************** */
validate.checkUpdateData = async (req, res, next) => {
  const errors = validationResult(req) || [];
  if (!errors.isEmpty()) {
    const nav = await getNav();

    res.render('account/update', {
      title: 'Update Account',
      nav,
      errors,
    });
    return;
  }
  next();
};

/* ******************************
 * Check data and return errors
 * or continue to login
 * ***************************** */
validate.checkLoginData = async (req, res, next) => {
  const { account_email } = req.body;
  const errors = validationResult(req) || [];
  if (!errors.isEmpty()) {
    const nav = await getNav();
    res.render('account/login', {
      title: 'Login',
      nav,
      errors,
      account_email,
    });
    return;
  }
  next();
};

module.exports = validate;
