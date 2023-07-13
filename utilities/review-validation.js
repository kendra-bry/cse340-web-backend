const { getNav } = require('.');
const { body, validationResult } = require('express-validator');

const validate = {};

// ================ Rules ================

// prettier-ignore
const REVIEW_FIELD_RULES = {
  rating: body('review_rating')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Rating is required.')
    .isNumeric()
    .withMessage('Rating must be a number.'),
  name: body('review_name')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Name is required.'),
  content: body('review_content')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Content is required.'),
  invId: body('inv_id')
    .trim()
    .isLength({ min: 1 })
    .withMessage('inv_id is required.')
    .isNumeric()
    .withMessage('inv_id must be a number.'),
}

validate.reviewsRules = () => {
  return [
    REVIEW_FIELD_RULES.rating,
    REVIEW_FIELD_RULES.name,
    REVIEW_FIELD_RULES.content,
    REVIEW_FIELD_RULES.invId,
  ]
}

// =========== Checking Methods ============

validate.checkReviewsData = async (req, res, next) => {
  const { review_rating, review_name, review_content, inv_id } = req.body;
  const errors = validationResult(req) || [];

  if (!errors.isEmpty()) {
    const nav = await getNav();

    res.render('./reviews/add', {
      title: 'Add New Review',
      nav,
      errors,
      review_rating,
      review_name,
      review_content,
      inv_id,
    });
    return;
  }
  next();
};

module.exports = validate;
