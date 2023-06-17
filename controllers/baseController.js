const util = require('../utilities/');
const baseController = {};

baseController.buildHome = async (req, res) => {
  try {
    const nav = await util.getNav();
    res.render('index', { title: 'Home', nav });
  } catch (error) {
    res.status(500).send({error: error.message});
  }
};

module.exports = baseController;
