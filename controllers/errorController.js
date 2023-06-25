const errorCont = {};

errorCont.throwError = async (req, res) => {
  throw new Error('This is an intentional error from clicking the Error Link in the footer.');
};

module.exports = errorCont;
