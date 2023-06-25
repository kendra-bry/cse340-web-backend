// Needed Resources
const router = require('express').Router();
const util = require('../utilities/');
const invController = require('../controllers/invController');

// Route to build inventory by classification view
router.get('/type/:classificationId', util.handleErrors(invController.buildByClassificationId));
router.get('/detail/:invId', util.handleErrors(invController.buildByInvId));

module.exports = router;
