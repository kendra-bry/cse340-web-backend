const { getNav, buildClassificationSelector } = require('.');
const { body, validationResult } = require('express-validator');
const { checkExistingClassification, getClassifications } = require('../models/inventory-model');

const validate = {};

// ================ Rules ================

// prettier-ignore
const INV_FIELD_RULES = {
  classificationName: body('classification_name')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Please provide a classification name.')
    .custom(async (classification_name) => {
      const classificationExists = await checkExistingClassification(classification_name);
      if (classificationExists) {
        throw new Error('Classification already exists.');
      }

      const containsSpaceOrSpecialChars = !/^[a-zA-Z0-9]*$/.test(classification_name);
      if (containsSpaceOrSpecialChars) {
        throw new Error('Classification cannot contain a space or special characters.');
      }
    }),
    make: body('inv_make')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Make is required.'),
    model: body('inv_model')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Model is required.'),
    year: body('inv_year')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Year is required.')
      .isNumeric()
      .withMessage('Year must be a number.'),
    desc: body('inv_description')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Description is required.'),
    img: body('inv_image')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Image is required.'),
    thumbnail: body('inv_thumbnail')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Thumbnail is required.'),
    price: body('inv_price')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Price is required.')
      .isNumeric()
      .withMessage('Price must be a number.'),
    miles: body('inv_miles')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Miles is required.')
      .isNumeric()
      .withMessage('Miles must be a number.'),
    color: body('inv_color')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Color is required.'),
    classificationId: body('classification_id')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Classification is required.'),
};

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

validate.classificationRules = () => {
  return [INV_FIELD_RULES.classificationName];
};

validate.inventoryRules = () => {
  // prettier-ignore
  return [
    INV_FIELD_RULES.make,
    INV_FIELD_RULES.model,
    INV_FIELD_RULES.year,
    INV_FIELD_RULES.desc,
    INV_FIELD_RULES.img,
    INV_FIELD_RULES.thumbnail,
    INV_FIELD_RULES.price,
    INV_FIELD_RULES.miles,
    INV_FIELD_RULES.color,
    INV_FIELD_RULES.classificationId,
  ];
};

validate.reviewsRules = () => {
  return [
    REVIEW_FIELD_RULES.rating,
    REVIEW_FIELD_RULES.name,
    REVIEW_FIELD_RULES.content,
    REVIEW_FIELD_RULES.invId,
  ]
}

// =========== Checking Methods ============

validate.checkClassificationData = async (req, res, next) => {
  const { classification_name } = req.body;
  const errors = validationResult(req) || [];

  if (!errors.isEmpty()) {
    const nav = await getNav();

    res.render('./inventory/add-classification', {
      errors,
      title: 'Create New Classification',
      nav,
      classification_name,
    });
    return;
  }
  next();
};

validate.checkInventoryData = async (req, res, next) => {
  // prettier-ignore
  const {
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id,
   } = req.body;
  const errors = validationResult(req) || [];

  if (!errors.isEmpty()) {
    const nav = await getNav();
    const data = await getClassifications();
    const classificationSelectHTML = buildClassificationSelector(data, classification_id);

    res.render('./inventory/add-inventory', {
      errors,
      title: 'Add New Inventory',
      nav,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id,
      classificationSelectHTML,
    });
    return;
  }
  next();
};

validate.checkUpdateData = async (req, res, next) => {
  // prettier-ignore
  const {
    inv_id,
    inv_make,
    inv_model,
    inv_year,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_miles,
    inv_color,
    classification_id,
   } = req.body;
  const errors = validationResult(req) || [];

  if (!errors.isEmpty()) {
    const nav = await getNav();
    const data = await getClassifications();
    const classificationSelectHTML = buildClassificationSelector(data, classification_id);

    res.render('./inventory/add-inventory', {
      title: `Edit ${inv_make} ${inv_model}`,
      nav,
      errors,
      inv_id,
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id,
      classificationSelectHTML,
    });
    return;
  }
  next();
};

validate.checkReviewsData = async (req, res, next) => {
  const { review_rating, review_name, review_content, inv_id } = req.body;
  const errors = validationResult(req) || [];

  if (!errors.isEmpty()) {
    const nav = await getNav();

    res.render('./inventory/reviews/add', {
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
