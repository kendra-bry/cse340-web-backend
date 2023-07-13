const router = require('express').Router();
const { handleErrors } = require('../utilities');
const baseController = require('../controllers/baseController');

router.get('/', handleErrors(baseController.buildHome));
router.use('/account', require('./accountRoute'));
router.use('/inv', require('./inventoryRoute'));
router.use('/reviews', require('./reviewRoute'));
router.use('/error', require('./errorRoute'));

module.exports = router;
