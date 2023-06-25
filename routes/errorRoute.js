const util = require('../utilities');
const router = require('express').Router();
const errorController = require('../controllers/errorController');

router.get('/', util.handleErrors(errorController.throwError));

module.exports = router;
