const router = require('express').Router();
const util = require('../utilities');
const inventoryRoute = require('./inventoryRoute');
const errorRoute = require('./errorRoute');
const baseController = require('../controllers/baseController');

router.get('/', util.handleErrors(baseController.buildHome));
router.use('/inv', inventoryRoute);
router.use('/error', errorRoute);

module.exports = router;
