// prettier-ignore
const {
  createNewClassification,
  createNewInventory,
  deleteInventory,
  getClassifications,
  getInventoryByClassificationId,
  getInventoryDetailsByInvId,
  getReviewsByInvId,
  updateInventory,
} = require('../models/inventory-model');

// prettier-ignore
const {
  addReview,
  getReview,
  deleteReview,
} = require('../models/review-model');

// prettier-ignore
const {
  buildClassificationGrid,
  buildClassificationSelector,
  buildInventoryDetail,
  getNav,
  userIsAdmin,
} = require('../utilities/');

const invCont = {};

// ================ VIEWS ================

/* ****************************************
 *  Deliver Add Classification view
 * **************************************** */
invCont.addClassificationView = async (req, res) => {
  const nav = await getNav();

  res.render('./inventory/add-classification', {
    title: 'Create New Classification',
    nav,
    errors: null,
  });
};

/* ****************************************
 *  Deliver Add Inventory view
 * **************************************** */
invCont.addInventoryView = async (req, res) => {
  const nav = await getNav();
  const data = await getClassifications();
  const classificationSelectHTML = buildClassificationSelector(data);

  res.render('./inventory/add-inventory', {
    title: 'Add New Inventory',
    nav,
    classificationSelectHTML,
    errors: null,
  });
};

/* ****************************************
 *  Deliver Classification view
 * **************************************** */
invCont.classificationView = async (req, res) => {
  const classification_id = req.params.classificationId;
  const data = await getInventoryByClassificationId(classification_id);
  const gridHTML = await buildClassificationGrid(data);
  const nav = await getNav();
  const className = data[0].classification_name;

  res.render('./inventory/classification', {
    title: `${className} vehicles`,
    nav,
    gridHTML,
    errors: null,
  });
};

/* ****************************************
 *  Build Delete Inventory view
 * **************************************** */
invCont.deleteView = async (req, res) => {
  const inv_id = req.params.invId;
  const nav = await getNav();
  const details = await getInventoryDetailsByInvId(inv_id);
  const name = `${details.inv_make} ${details.inv_model}`;

  res.render('./inventory/delete-confirm', {
    title: `Delete ${name}`,
    nav,
    inv_id: details.inv_id,
    inv_make: details.inv_make,
    inv_model: details.inv_model,
    inv_price: details.inv_price,
    errors: null,
  });
};

/* ****************************************
 *  Deliver Edit Inventory view
 * **************************************** */
invCont.editInventoryView = async (req, res) => {
  const inv_id = req.params.invId;

  const nav = await getNav();
  const details = await getInventoryDetailsByInvId(inv_id);
  const classifications = await getClassifications();
  const classificationSelectHTML = await buildClassificationSelector(classifications, details.classification_id);

  res.render('./inventory/edit-inventory', {
    title: `Edit ${details.inv_make} ${details.inv_model}`,
    nav,
    classificationSelectHTML,
    inv_id: details.inv_id,
    inv_make: details.inv_make,
    inv_model: details.inv_model,
    inv_year: details.inv_year,
    inv_description: details.inv_description,
    inv_image: details.inv_image,
    inv_thumbnail: details.inv_thumbnail,
    inv_price: details.inv_price,
    inv_miles: details.inv_miles,
    inv_color: details.inv_color,
    classification_id: details.classification_id,
    errors: null,
  });
};

/* ****************************************
 *  Deliver Inventory Details view
 * **************************************** */
invCont.inventoryDetailsView = async (req, res) => {
  const inv_id = req.params.invId;
  const isAdmin = await userIsAdmin(req);
  const data = await getInventoryDetailsByInvId(inv_id);
  const reviews = await getReviewsByInvId(inv_id);
  const detailsHTML = await buildInventoryDetail(data, reviews, isAdmin);
  const nav = await getNav();

  res.render('./inventory/details', {
    title: `${data.inv_make} ${data.inv_model}`,
    nav,
    detailsHTML,
    errors: null,
  });
};

/* ****************************************
 *  Deliver Management view
 * **************************************** */
invCont.managementView = async (req, res) => {
  const nav = await getNav();

  const data = await getClassifications();
  const classificationSelectHTML = await buildClassificationSelector(data);
  res.render('./inventory/management', {
    title: 'Management',
    nav,
    classificationSelectHTML,
    errors: null,
  });
};

// ================ HANDLERS ================

/* ******************************
 *  Get Inventory Details as JSON
 * ****************************** */
invCont.getInventoryJSON = async (req, res, next) => {
  const classification_id = +req.params.classificationId;
  const data = await getInventoryByClassificationId(classification_id);
  if (data[0]?.inv_id) {
    return res.json(data);
  } else {
    next(new Error('No data returned'));
  }
};

/* ******************************
 *  Add new Classification
 * ****************************** */
invCont.handleAddClassification = async (req, res) => {
  const { classification_name } = req.body;
  const response = await createNewClassification(classification_name);
  const nav = await getNav();

  if (response) {
    req.flash('flash-notice', 'New classification successfully added.');
    res.status(201).render('inventory/management', {
      title: 'Management',
      nav,
      errors: null,
    });
  } else {
    req.flash('flash-error', 'Adding new classification failed.');
    res.render('inventory/add-inventory', {
      title: 'Create New Classification',
      nav,
      errors: null,
    });
  }
};

/* ******************************
 *  Add new Inventory
 * ****************************** */
invCont.handleAddInventory = async (req, res) => {
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

  // prettier-ignore
  const response = await createNewInventory(
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
  );
  const nav = await getNav();
  const data = await getClassifications();
  const classificationSelectHTML = buildClassificationSelector(data);

  if (response) {
    req.flash('flash-notice', 'New inventory successfully added.');
    res.status(201).render('inventory/management', {
      title: 'Management',
      nav,
      classificationSelectHTML,
      errors: null,
    });
  } else {
    const data = await getClassifications();
    const classificationSelectHTML = buildClassificationSelector(data);
    req.flash('flash-error', 'Adding new classification failed.');
    res.render('inventory/add-inventory', {
      title: 'Create New Classification',
      nav,
      classificationSelectHTML,
      errors: null,
    });
  }
};

/* ***************************
 *  Delete Inventory Data
 * ************************** */
invCont.handleDeleteInventory = async (req, res) => {
  const { inv_id, inv_make, inv_model } = req.body;

  const deleteResult = await deleteInventory(inv_id);
  const nav = await getNav();
  const itemName = `${inv_make} ${inv_model}`;

  if (deleteResult) {
    req.flash('flash-notice', `The ${itemName} was successfully deleted.`);
    res.redirect('/inv/');
  } else {
    req.flash('flash-error', 'Sorry, the delete failed.');
    res.status(501).render('inventory/delete-confirm', {
      title: `Delete ${itemName}`,
      nav,
      errors: null,
      inv_id,
      inv_make,
      inv_model,
      inv_price,
    });
  }
};

/* ***************************
 *  Update Inventory Data
 * ************************** */
invCont.handleUpdateInventory = async (req, res) => {
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

  // prettier-ignore
  const updateResult = await updateInventory(
    inv_id,
    inv_make,
    inv_model,
    inv_description,
    inv_image,
    inv_thumbnail,
    inv_price,
    inv_year,
    inv_miles,
    inv_color,
    classification_id
  )
  const nav = await getNav();

  if (updateResult) {
    const itemName = `${updateResult.inv_make} ${updateResult.inv_model}`;

    req.flash('flash-notice', `The ${itemName} was successfully updated.`);
    res.redirect('/inv/');
  } else {
    const classifications = await getClassifications();
    const classificationSelectHTML = await buildClassificationSelector(classifications, classification_id);
    const itemName = `${inv_make} ${inv_model}`;

    req.flash('flash-error', 'Sorry, the insert failed.');
    res.status(501).render('inventory/edit-inventory', {
      title: 'Edit ' + itemName,
      nav,
      classificationSelectHTML,
      errors: null,
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
    });
  }
};

module.exports = invCont;
