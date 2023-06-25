const router = require('express').Router();
const util = require('../utilities');
const inventoryRoute = require('./inventoryRoute');
const baseController = require('../controllers/baseController');

router.get('/', util.handleErrors(baseController.buildHome));
router.use('/inv', inventoryRoute);

module.exports = router;
