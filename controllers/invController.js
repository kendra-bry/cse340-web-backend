const invModel = require('../models/inventory-model');
const util = require('../utilities/');

const invCont = {};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).send({error: error.message})
  }
};

module.exports = invCont;