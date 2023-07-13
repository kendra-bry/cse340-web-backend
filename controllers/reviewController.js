// prettier-ignore
const {
  addReview,
  getReview,
  deleteReview,
} = require('../models/review-model');

const { getNav } = require('../utilities/');

const revCont = {};

// ================ VIEWS ================

/* ****************************************
 *  Deliver Add Review view
 * **************************************** */
revCont.addReviewView = async (req, res) => {
  const nav = await getNav();
  const inv_id = req.params.invId;

  res.render('./reviews/add', {
    title: 'Add New Review',
    nav,
    errors: null,
    inv_id,
  });
};

/* ****************************************
 *  Deliver Delete Review view
 * **************************************** */
revCont.deleteReviewView = async (req, res) => {
  const nav = await getNav();
  const review_id = req.params.reviewId;
  const review = await getReview(review_id);
  const { review_rating, review_name, review_content, inv_id } = review;

  res.render('./reviews/delete', {
    title: 'Delete Review',
    nav,
    errors: null,
    review_rating,
    review_name,
    review_content,
    review_id,
    inv_id,
  });
};

// ================ HANDLERS ================

/* ***************************
 *  Add Review
 * ************************** */
revCont.handleAddReview = async (req, res) => {
  const { review_rating, review_name, review_content, inv_id } = req.body;

  // prettier-ignore
  const insertResult = await addReview(
    review_rating,
    review_name,
    review_content,
    inv_id,
  );
  const nav = await getNav();

  if (insertResult) {
    req.flash('flash-notice', `The review was successfully added.`);
    res.redirect(`/inv/detail/${inv_id}`);
  } else {
    req.flash('flash-error', 'Unable to add review.');
    res.status(501).render('reviews/add', {
      title: 'Add New Review',
      nav,
      errors: null,
      review_rating,
      review_name,
      review_content,
      inv_id,
    });
  }
};

/* ***************************
 *  Delete Review
 * ************************** */
revCont.handleDeleteReview = async (req, res) => {
  const { review_rating, review_name, review_content, review_id, inv_id } = req.body;

  const deleteResult = await deleteReview(review_id);
  const nav = await getNav();

  if (deleteResult) {
    req.flash('flash-notice', `The review was successfully deleted.`);
    res.redirect(`/inv/detail/${inv_id}`);
  } else {
    req.flash('flash-error', 'Unable to delete review.');
    res.status(501).render('reviews/delete', {
      title: 'Delete Review',
      nav,
      errors: null,
      review_rating,
      review_name,
      review_content,
      review_id,
      inv_id,
    });
  }
};

module.exports = revCont;
