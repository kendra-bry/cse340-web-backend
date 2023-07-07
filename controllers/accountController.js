const bcrypt = require('bcryptjs');
const { getNav, createAccessToken } = require('../utilities');
const { registerAccount, getAccountByEmail, updateAccount, updatePassword } = require('../models/account-model');

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

/* ****************************************
 *  Deliver Account Update view
 * *************************************** */
accountCont.accountUpdateView = async (req, res) => {
  const nav = await getNav();
  res.render('account/update', {
    title: 'Update Account',
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
      const accessToken = createAccessToken(accountData);
      res.cookie('jwt', accessToken, { httpOnly: true, maxAge: 3600 * 1000 });
      return res.redirect('/account/');
    } else {
      req.flash('flash-error', 'Please check your credentials and try again.');
      res.status(400).render('account/login', {
        title: 'Login',
        nav,
        errors: null,
        account_email,
      });
      return;
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

/* ****************************************
 *  Handle Account Update
 * *************************************** */
accountCont.handleAccountUpdate = async (req, res) => {
  const nav = await getNav();
  const { account_firstname, account_lastname, account_email, account_id } = req.body;

  const updateResult = await updateAccount(account_firstname, account_lastname, account_email, account_id);

  if (updateResult) {
    const accessToken = createAccessToken(updateResult);
    res.cookie('jwt', accessToken, { httpOnly: true, maxAge: 3600 * 1000 });

    req.flash('flash-notice', 'Success! Your account has been updated.');
    return res.redirect('/account/');
  } else {
    req.flash('flash-error', 'Sorry, the update failed.');
    res.status(501).render('account/update', {
      title: 'Update Account',
      nav,
      errors: null,
    });
  }
};

/* ****************************************
 *  Handle Password Update
 * *************************************** */
accountCont.handlePasswordUpdate = async (req, res) => {
  const nav = await getNav();
  const { account_password, account_id } = req.body;

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hashSync(account_password, 10);
  } catch (error) {
    req.flash('flash-error', 'Sorry, there was an error processing the update.');
    res.status(501).render('account/update', {
      title: 'Update Account',
      nav,
      errors: null,
    });
  }

  const updateResult = await updatePassword(hashedPassword, account_id);

  if (updateResult) {
    req.flash('flash-notice', 'Success! Your password has been updated.');
    return res.redirect('/account/');
  } else {
    req.flash('flash-error', 'Sorry, the update failed.');
    res.status(501).render('account/update', {
      title: 'Update Account',
      nav,
      errors: null,
    });
  }
};

module.exports = accountCont;
