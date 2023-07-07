// prettier-ignore
const {
  checkLoginData,
  checkRegData,
  loginRules,
  registrationRules,
} = require('../utilities/account-validation');
// prettier-ignore
const {
  buildLogin,
  buildRegistration,
  processRegistration,
  handleLogin,
  accountManagementView,
  handleLogout,
} = require('../controllers/accountController');
const router = require('express').Router();
const { handleErrors, checkLogin } = require('../utilities');

router.get('/login', handleErrors(buildLogin));
router.post('/login', loginRules(), checkLoginData, handleErrors(handleLogin));

router.get('/register', handleErrors(buildRegistration));
router.post('/register', registrationRules(), checkRegData, handleErrors(processRegistration));

router.get('/', checkLogin, handleErrors(accountManagementView));
router.get('/logout', handleErrors(handleLogout));

module.exports = router;
