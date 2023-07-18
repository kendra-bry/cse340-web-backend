const db = require('../database/');

const inventoryModel = {};

/* ****************************
 *  Get all classification data
 * **************************** */
inventoryModel.getClassifications = async () => {
  try {
    return await db.query('SELECT * FROM public.classification ORDER BY classification_name');
  } catch (error) {
    console.log({ getClassifications: error });
    throw error;
  }
};

/* *****************************************
 *  Get all inventory items and
 *  classification_name by classification_id
 * ***************************************** */
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

/* *****************************************
 *  Get inventory data by inv_id
 * ***************************************** */
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

/* ****************************
 *  Create new classification
 * **************************** */
inventoryModel.createNewClassification = async (classification_name) => {
  try {
    const sql = 'INSERT INTO classification (classification_name) VALUES ($1) RETURNING *';
    return await db.query(sql, [classification_name]);
  } catch (error) {
    console.error({ createNewClassification: error });
    return error.message;
  }
};

/* ****************************
 *  Create new inventory
 * **************************** */
inventoryModel.createNewInventory = async (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id) => {
  try {
    const sql =
      'INSERT INTO inventory (inv_make, inv_model, inv_year, inv_description, inv_image, inv_thumbnail, inv_price, inv_miles, inv_color, classification_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';

    // prettier-ignore
    return await db.query(sql, [
      inv_make,
      inv_model,
      inv_year,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_miles,
      inv_color,
      classification_id
    ]);
  } catch (error) {
    console.error({ createNewInventory: error });
    return error.message;
  }
};

/* *******************************
 *  Check if classification exists
 * ******************************* */
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

/* ***************************
 *  Update Inventory Data
 * ************************** */
inventoryModel.updateInventory = async (
  // prettier-ignore
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
) => {
  try {
    const sql =
      'UPDATE public.inventory SET inv_make = $1, inv_model = $2, inv_description = $3, inv_image = $4, inv_thumbnail = $5, inv_price = $6, inv_year = $7, inv_miles = $8, inv_color = $9, classification_id = $10 WHERE inv_id = $11 RETURNING *';
    const data = await db.query(sql, [
      // prettier-ignore
      inv_make,
      inv_model,
      inv_description,
      inv_image,
      inv_thumbnail,
      inv_price,
      inv_year,
      inv_miles,
      inv_color,
      classification_id,
      inv_id,
    ]);
    return data.rows[0];
  } catch (error) {
    console.error('model error: ' + error);
  }
};

/* ***************************
 *  Delete Inventory Data
 * ************************** */
inventoryModel.deleteInventory = async (inv_id) => {
  try {
    const sql = 'DELETE FROM public.inventory WHERE inv_id = $1';
    const data = await db.query(sql, [inv_id]);
    return data;
  } catch (error) {
    console.error('model error: ' + error);
  }
};

module.exports = inventoryModel;
