const util = require('../utilities');
const { registerAccount } = require('../models/account-model');

/* ****************************************
 *  Deliver login view
 * *************************************** */
async function buildLogin(req, res, next) {
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
async function buildRegistration(req, res, next) {
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
async function processRegistration(req, res, next) {
  let nav = await util.getNav();
  const { account_firstname, account_lastname, account_email, account_password } = req.body;

  const regResult = await registerAccount(account_firstname, account_lastname, account_email, account_password);

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
