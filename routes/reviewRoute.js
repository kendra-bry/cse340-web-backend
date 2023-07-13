const ctrl = require('../controllers/reviewController');
const val = require('../utilities/review-validation');
const router = require('express').Router();
const { handleErrors, checkAccountType, checkLogin } = require('../utilities/');

router.get('/add/:invId', handleErrors(ctrl.addReviewView));
router.post('/add', val.reviewsRules(), val.checkReviewsData, handleErrors(ctrl.handleAddReview));

/* ****************************************
 *               Admin Views
 **************************************** */
router.use(checkLogin);
router.use(checkAccountType);

router.get('/delete/:reviewId', handleErrors(ctrl.deleteReviewView));
router.post('/delete', handleErrors(ctrl.handleDeleteReview));

module.exports = router;
