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
} = require('../controllers/accountController');
const router = require('express').Router();
const { handleErrors } = require('../utilities');

router.get('/login', handleErrors(buildLogin));
router.post('/login', loginRules(), checkLoginData, (req, res) => {
  res.status(200).send('login process');
});

router.get('/register', handleErrors(buildRegistration));
router.post('/register', registrationRules(), checkRegData, handleErrors(processRegistration));

module.exports = router;
