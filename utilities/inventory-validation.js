const { getNav, buildClassificationSelector } = require('.');
const { body, validationResult } = require('express-validator');
const { checkExistingClassification, getClassifications } = require('../models/inventory-model');

const validate = {};

validate.classificationRules = () => {
  return [
    // classification_name is required and must be string
    body('classification_name')
      .trim()
      .isLength({ min: 1 })
      .withMessage('Please provide a classification name.')
      .custom(async (classification_name) => {
        const classificationExists = await checkExistingClassification(classification_name);
        if (classificationExists) {
          throw new Error('Classification already exists.');
        }
      }),
  ];
};

validate.inventoryRules = () => {
  return [
    body('inv_make').trim().isLength({ min: 1 }).withMessage('Make is required.'),
    body('inv_model').trim().isLength({min: 1}).withMessage('Model is required.'),
    body('inv_year').trim().isLength({min: 1}).withMessage('Year is required.'),
    body('inv_description').trim().isLength({min: 1}).withMessage('Description is required.'),
    body('inv_image').trim().isLength({min: 1}).withMessage('Image is required.'),
    body('inv_thumbnail').trim().isLength({min: 1}).withMessage('Thumbnail is required.'),
    body('inv_price').trim().isLength({min: 1}).withMessage('Price is required.'),
    body('inv_miles').trim().isLength({min: 1}).withMessage('Miles is required.'),
    body('inv_color').trim().isLength({min: 1}).withMessage('Color is required.'),
    body('classification_id').trim().isLength({min: 1}).withMessage('Classification is required.'),
  ];
};

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

module.exports = validate;
