const router = require('express').Router();
const util = require('../utilities');
const { buildLogin, buildRegistration, processRegistration } = require('../controllers/accountController');

router.get('/login', util.handleErrors(buildLogin));
router.get('/register', util.handleErrors(buildRegistration));
router.post('/register', util.handleErrors(processRegistration));

module.exports = router;
