const ctrl = require('../controllers/invController');
const val = require('../utilities/inventory-validation');
const router = require('express').Router();
const { handleErrors, checkAccountType, checkLogin } = require('../utilities/');

// Route to build inventory by classification view
router.get('/type/:classificationId', handleErrors(ctrl.classificationView));
router.get('/detail/:invId', handleErrors(ctrl.inventoryDetailsView));
router.get('/reviews/add/:invId', handleErrors(ctrl.addReviewView));

router.post('/reviews/add', val.reviewsRules(), val.checkReviewsData, handleErrors(ctrl.handleAddReview));

/* ****************************************
 *               Admin Views
**************************************** */
router.use(checkLogin);
router.use(checkAccountType);

router.get('/', handleErrors(ctrl.managementView));
router.get('/add-classification', handleErrors(ctrl.addClassificationView));
router.get('/add-inventory', handleErrors(ctrl.addInventoryView));
router.get('/delete/:invId', handleErrors(ctrl.deleteView));
router.get('/edit/:invId', handleErrors(ctrl.editInventoryView));

router.get('/getInventory/:classificationId', handleErrors(ctrl.getInventoryJSON));

router.post('/add-classification', val.classificationRules(), val.checkClassificationData, handleErrors(ctrl.handleAddClassification));
router.post('/add-inventory', val.inventoryRules(), val.checkInventoryData, handleErrors(ctrl.handleAddInventory));
router.post('/update', val.inventoryRules(), val.checkUpdateData, handleErrors(ctrl.handleUpdateInventory));
router.post('/delete', handleErrors(ctrl.handleDeleteInventory));

module.exports = router;
