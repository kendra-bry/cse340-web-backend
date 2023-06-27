const bcrypt = require('bcryptjs');
const util = require('../utilities');
const { registerAccount } = require('../models/account-model');

/* ****************************************
 *  Deliver login view
 * *************************************** */
const buildLogin = async(req, res, next) => {
  let nav = await util.getNav();
  res.render('account/login', {
    title: 'Login',
    nav,
    errors: null,
  });
}

/* ****************************************
 *  Deliver Registration view
 * *************************************** */
const buildRegistration = async (req, res, next) => {
  let nav = await util.getNav();
  res.render('account/register', {
    title: 'Register',
    nav,
    errors: null,
  });
}

/* ****************************************
 *  Process Registration
 * *************************************** */
const processRegistration = async (req, res, next) => {
  let nav = await util.getNav();
  const { account_firstname, account_lastname, account_email, account_password } = req.body;

  let hashedPassword;
  try {
    // regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(account_password, 10);
  } catch (error) {
    req.flash('flash-error', 'Sorry, there was an error processing the registration.');
    res.status(500).render('account/register', {
      title: 'Registration',
      nav,
      errors: null,
    });
  }

  const regResult = await registerAccount(account_firstname, account_lastname, account_email, hashedPassword);

  if (regResult) {
    req.flash('flash-notice', `Congratulations, you\'re registered ${account_firstname}. Please log in.`);
    res.status(201).render('account/login', {
      title: 'Login',
      nav,
      errors: null,
    });
  } else {
    req.flash('flash-error', 'Sorry, the registration failed.');
    res.status(501).render('account/register', {
      title: 'Registration',
      nav,
      errors: null,
    });
  }
}

module.exports = { buildLogin, buildRegistration, processRegistration };
