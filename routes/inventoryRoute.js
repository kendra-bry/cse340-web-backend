// prettier-ignore
const {
  addClassificationView,
  addInventoryView,
  buildByClassificationId,
  buildByInvId,
  handleAddClassification,
  handleAddInventory,
  managementView,
  getInventoryJSON,
  editInventory,
  handleUpdateInventory,
  buildDelete,
  handleDeleteInventory,
} = require('../controllers/invController');
// prettier-ignore
const {
  classificationRules,
  checkClassificationData,
  checkInventoryData,
  inventoryRules,
  checkUpdateData,
} = require('../utilities/inventory-validation');
const router = require('express').Router();
const { handleErrors } = require('../utilities/');

// Route to build inventory by classification view
router.get('/', handleErrors(managementView));
router.get('/add-classification', handleErrors(addClassificationView));
router.get('/add-inventory', handleErrors(addInventoryView));
router.get('/type/:classificationId', handleErrors(buildByClassificationId));
router.get('/detail/:invId', handleErrors(buildByInvId));
router.get('/getInventory/:classificationId', handleErrors(getInventoryJSON));
router.get('/edit/:invId', handleErrors(editInventory));
router.get('/delete/:invId', handleErrors(buildDelete));

router.post('/add-classification', classificationRules(), checkClassificationData, handleErrors(handleAddClassification));
router.post('/add-inventory', inventoryRules(), checkInventoryData, handleErrors(handleAddInventory));
router.post('/update', inventoryRules(), checkUpdateData, handleErrors(handleUpdateInventory));
router.post('/delete', handleErrors(handleDeleteInventory));

module.exports = router;
