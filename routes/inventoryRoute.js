// prettier-ignore
const {
  addClassificationView,
  addInventoryView,
  buildByClassificationId,
  buildByInvId,
  handleAddClassification,
  managementView,
} = require('../controllers/invController');
// prettier-ignore
const {
  classificationRules,
  checkClassificationData,
} = require('../utilities/inventory-validation');
const router = require('express').Router();
const { handleErrors } = require('../utilities/');

// Route to build inventory by classification view
router.get('/type/:classificationId', handleErrors(buildByClassificationId));
router.get('/detail/:invId', handleErrors(buildByInvId));
router.get('/management', handleErrors(managementView));
router.get('/add-classification', handleErrors(addClassificationView));
router.get('/add-inventory', handleErrors(addInventoryView));

router.post('/add-classification', classificationRules(), checkClassificationData, handleErrors(handleAddClassification));

module.exports = router;
