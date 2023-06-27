const router = require('express').Router();
const util = require('../utilities');
const { registrationRules, checkRegData, loginRules, checkLoginData } = require('../utilities/account-validation');
const { buildLogin, buildRegistration, processRegistration } = require('../controllers/accountController');

router.get('/login', util.handleErrors(buildLogin));
router.post('/login', loginRules(), checkLoginData, (req, res) => {
  res.status(200).send('login process');
});
router.get('/register', util.handleErrors(buildRegistration));
router.post('/register', registrationRules(), checkRegData, util.handleErrors(processRegistration));

module.exports = router;
