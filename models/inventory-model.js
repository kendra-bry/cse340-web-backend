const db = require('../database/');

const inventoryModel = {};

/* ***************************
 *  Get all classification data
 * ************************** */
inventoryModel.getClassifications = async () => {
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
inventoryModel.getInventoryByClassificationId = async (classification_id) => {
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
    console.error({ getInventoryByClassificationId: error });
    throw error;
  }
};

inventoryModel.getInventoryDetailsByInvId = async (inv_id) => {
  try {
    const data = await db.query(
      `SELECT * FROM public.inventory AS i
       WHERE i.inv_id = $1`,
      [inv_id]
    );
    return data.rows[0];
  } catch (error) {
    console.error({ getInventoryDetailsByInvId: error });
    throw error;
  }
};

inventoryModel.createNewClassification = async (classification_name) => {
  try {
    const sql = 'INSERT INTO classification (classification_name) VALUES ($1) RETURNING *';
    return await db.query(sql, [classification_name]);
  } catch (error) {
    console.error({ createNewClassification: error });
    return error.message;
  }
};

inventoryModel.checkExistingClassification = async (classification_name) => {
  try {
    const sql = 'SELECT * FROM classification WHERE classification_name = $1';
    const classificationName = await db.query(sql, [classification_name]);
    return classificationName.rowCount;
  } catch (error) {
    console.error({ createNewClassification: error });
    return error.message;
  }
};

module.exports = inventoryModel;
