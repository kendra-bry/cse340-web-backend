const router = require('express').Router();
const { handleErrors } = require('../utilities');
const { throwError } = require('../controllers/errorController');

router.get('/', handleErrors(throwError));

module.exports = router;
