const db = require('../database/');

/* ***************************
 *  Get all classification data
 * ************************** */
const getClassifications = async () => {
  try {
    return await db.query('SELECT * FROM public.classification ORDER BY classification_name');
  } catch (error) {
    console.log({ getClassifications: error });
    throw error;
  }
};

/* ***************************
 *  Get all inventory items and classification_name by classification_id
 * ************************** */
const getInventoryByClassificationId = async (classification_id) => {
  try {
    const data = await db.query(
      `SELECT * FROM public.inventory AS i
      JOIN public.classification AS c
      ON i.classification_id = c.classification_id
      WHERE i.classification_id = $1`,
      [classification_id]
    );
    return data.rows;
  } catch (error) {
    console.error({getInventoryByClassificationId: error});
    throw error;
  }
};

module.exports = { getClassifications, getInventoryByClassificationId };
