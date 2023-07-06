// prettier-ignore
const {
  createNewClassification,
  createNewInventory,
  getClassifications,
  getInventoryByClassificationId,
  getInventoryDetailsByInvId,
  updateInventory,
} = require('../models/inventory-model');

// prettier-ignore
const {
  buildClassificationGrid,
  buildClassificationSelector,
  buildInventoryDetail,
  getNav,
} = require('../utilities/');

const invCont = {};

/* ****************************************
 *  Build inventory by classification view
 * **************************************** */
invCont.buildByClassificationId = async (req, res) => {
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
 *  Build inventory by details view
 * **************************************** */
invCont.buildByInvId = async (req, res) => {
  const inv_id = req.params.invId;
  const data = await getInventoryDetailsByInvId(inv_id);
  const detailsHTML = await buildInventoryDetail(data);
  const nav = await getNav();

  res.render('./inventory/details', {
    title: `${data.inv_make} ${data.inv_model}`,
    nav,
    detailsHTML,
    errors: null,
  });
};

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

invCont.addClassificationView = async (req, res) => {
  const nav = await getNav();

  res.render('./inventory/add-classification', {
    title: 'Create New Classification',
    nav,
    errors: null,
  });
};

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

  if (response) {
    req.flash('flash-notice', 'New inventory successfully added.');
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

invCont.getInventoryJSON = async (req, res) => {
  const classification_id = +req.params.classificationId;
  const data = await getInventoryByClassificationId(classification_id);
  if (data[0].inv_id) {
    return res.json(data);
  } else {
    next(new Error('No data returned'));
  }
};

/* ****************************************
 *  Build Edit Inventory view
 * **************************************** */
invCont.editInventory = async (req, res) => {
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
