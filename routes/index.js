const router = require('express').Router();
const util = require('../utilities');
const baseController = require('../controllers/baseController');

router.get('/', util.handleErrors(baseController.buildHome));
router.use('/account', require('./accountRoute'));
router.use('/inv', require('./inventoryRoute'));
router.use('/error', require('./errorRoute'));

module.exports = router;
