// prettier-ignore
const {
  addClassificationView,
  addInventoryView,
  buildByClassificationId,
  buildByInvId,
  handleAddClassification,
  handleAddInventory,
  managementView,
} = require('../controllers/invController');
// prettier-ignore
const {
  classificationRules,
  checkClassificationData,
  checkInventoryData,
  inventoryRules,
} = require('../utilities/inventory-validation');
const router = require('express').Router();
const { handleErrors } = require('../utilities/');

// Route to build inventory by classification view
router.get('/', handleErrors(managementView));
router.get('/add-classification', handleErrors(addClassificationView));
router.get('/add-inventory', handleErrors(addInventoryView));
router.get('/type/:classificationId', handleErrors(buildByClassificationId));
router.get('/detail/:invId', handleErrors(buildByInvId));

router.post('/add-classification', classificationRules(), checkClassificationData, handleErrors(handleAddClassification));
router.post('/add-inventory', inventoryRules(), checkInventoryData, handleErrors(handleAddInventory));

module.exports = router;
