const val = require('../utilities/account-validation');
const ctrl = require('../controllers/accountController');
const router = require('express').Router();
const { handleErrors, checkLogin } = require('../utilities');

router.get('/login', handleErrors(ctrl.loginView));
router.post('/login', val.loginRules(), val.checkLoginData, handleErrors(ctrl.handleLogin));

router.get('/register', handleErrors(ctrl.registrationView));
router.post('/register', val.registrationRules(), val.checkRegData, handleErrors(ctrl.handleRegistration));

router.get('/', checkLogin, handleErrors(ctrl.accountManagementView));
router.get('/logout', handleErrors(ctrl.handleLogout));

router.get('/update', handleErrors(ctrl.accountUpdateView));
router.post('/update', handleErrors(ctrl.handleAccountUpdate));
router.post('/update-pwd', handleErrors(ctrl.handlePasswordUpdate));

module.exports = router;
