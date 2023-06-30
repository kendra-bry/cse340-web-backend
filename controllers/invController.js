// prettier-ignore
const {
  createNewClassification,
  createNewInventory,
  getClassifications,
  getInventoryByClassificationId,
  getInventoryDetailsByInvId,
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

  res.render('./inventory/management', {
    title: 'Management',
    nav,
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

module.exports = invCont;
