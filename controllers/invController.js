const invModel = require('../models/inventory-model');
const util = require('../utilities/');

const invCont = {};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async (req, res) => {
  const classification_id = req.params.classificationId;
  const data = await invModel.getInventoryByClassificationId(classification_id);
  const grid = await util.buildClassificationGrid(data);
  let nav = await util.getNav();
  const className = data[0].classification_name;
  res.render('./inventory/classification', {
    title: `${className} vehicles`,
    nav,
    grid,
  });
};

invCont.buildByInvId = async (req, res) => {
  const inv_id = req.params.invId;
  const data = await invModel.getInventoryDetailsByInvId(inv_id);
  const details = await util.buildInventoryDetail(data);
  let nav = await util.getNav();
  res.render('./inventory/details', {
    title: `${data.inv_make} ${data.inv_model}`,
    nav,
    details,
  });
};

module.exports = invCont;
