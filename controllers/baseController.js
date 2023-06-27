const util = require('../utilities/');
const baseController = {};

baseController.buildHome = async (req, res) => {
  const nav = await util.getNav();
  res.render('index', { title: 'Home', nav, errors: null });
};

module.exports = baseController;
