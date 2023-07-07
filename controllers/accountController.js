const bcrypt = require('bcryptjs');
const { getNav } = require('../utilities');
const jwt = require('jsonwebtoken');
const { registerAccount, getAccountByEmail } = require('../models/account-model');

const accountCont = {};

// ================ VIEWS ================

/* ****************************************
 *  Deliver Account Management View
 * *************************************** */
accountCont.accountManagementView = async (req, res) => {
  const nav = await getNav();
  res.render('account', {
    title: 'Account Management',
    nav,
    errors: null,
  });
};

/* ****************************************
 *  Deliver login view
 * *************************************** */
accountCont.loginView = async (req, res) => {
  const nav = await getNav();
  res.render('account/login', {
    title: 'Login',
    nav,
    errors: null,
  });
};

/* ****************************************
 *  Deliver Registration view
 * *************************************** */
accountCont.registrationView = async (req, res) => {
  const nav = await getNav();
  res.render('account/register', {
    title: 'Register',
    nav,
    errors: null,
  });
};

// ================ HANDLERS ================

/* ****************************************
 *  Handle Account Login
 * *************************************** */
accountCont.handleLogin = async (req, res) => {
  try {
    const nav = await getNav();
    const { account_email, account_password } = req.body;
    const accountData = await getAccountByEmail(account_email);
    if (!accountData) {
      req.flash('flash-error', 'Please check your credentials and try again.');
      res.status(400).render('account/login', {
        title: 'Login',
        nav,
        errors: null,
        account_email,
      });
      return;
    }
    if (await bcrypt.compare(account_password, accountData.account_password)) {
      delete accountData.account_password;
      const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 * 1000 });
      res.cookie('jwt', accessToken, { httpOnly: true, maxAge: 3600 * 1000 });
      return res.redirect('/account/');
    }
  } catch (error) {
    return new Error('Access Forbidden');
  }
};

/* ****************************************
 *  Handle Account Logout
 * *************************************** */
accountCont.handleLogout = async (req, res) => {
  try {
    res.locals.accountData = undefined;
    res.locals.loggedin = undefined;
    res.clearCookie('jwt');
    return res.redirect('/');
  } catch (error) {
    return new Error('Access Forbidden');
  }
};

/* ****************************************
 *  Handle Registration
 * *************************************** */
accountCont.handleRegistration = async (req, res) => {
  const nav = await getNav();
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
};


module.exports = accountCont;
