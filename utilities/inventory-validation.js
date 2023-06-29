const { getNav } = require('.');
const { body, validationResult } = require('express-validator');
const { checkExistingClassification } = require('../models/inventory-model');

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
          throw new Error('Classification already exists. Please enter a unique classification name.');
        }
      }),
  ];
};

validate.inventoryRules = () => {
  return [
    body('inv_make').trim().isLength({ min: 1 }).withMessage('Make is required.'),
    // body('inv_model').trim().isLength({min: 1}).withMessage('Model is required.'),
    // body('inv_year').trim().isLength({min: 1}).withMessage('Year is required.'),
    // body('inv_description').trim().isLength({min: 1}).withMessage('Description is required.'),
    // body('inv_image').trim().isLength({min: 1}).withMessage('Image is required.'),
    // body('inv_thumbnail').trim().isLength({min: 1}).withMessage('Thumbnail is required.'),
    // body('inv_price').trim().isLength({min: 1}).withMessage('Price is required.'),
    // body('inv_miles').trim().isLength({min: 1}).withMessage('Miles is required.'),
    // body('inv_color').trim().isLength({min: 1}).withMessage('Color is required.'),
    // body('classification_id').trim().isLength({min: 1}).withMessage('classification_id is required.'),
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

/* ******************************
 * Check data and return errors or continue to login
 * ***************************** */
// validate.checkLoginData = async (req, res, next) => {
//   const { account_email } = req.body;
//   const errors = validationResult(req) || [];

//   if (!errors.isEmpty()) {
//     const nav = await getNav();

//     res.render('account/login', {
//       errors,
//       title: 'Login',
//       nav,
//       account_email,
//     });
//     return;
//   }
//   next();
// };

module.exports = validate;
