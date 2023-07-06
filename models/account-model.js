const db = require('../database/');

const accountModel = {};

/* *****************************
 *   Register new account
 * *************************** */
accountModel.registerAccount = async (account_firstname, account_lastname, account_email, hashedPassword) => {
  try {
    const sql = "INSERT INTO account (account_firstname, account_lastname, account_email, account_password, account_type) VALUES ($1, $2, $3, $4, 'Client') RETURNING *";
    return await db.query(sql, [account_firstname, account_lastname, account_email, hashedPassword]);
  } catch (error) {
    console.error({ registerAccount: error });
    return error.message;
  }
};

/* **********************
 *   Check for existing email
 * ********************* */
accountModel.checkExistingEmail = async (account_email) => {
  try {
    const sql = 'SELECT * FROM account WHERE account_email = $1';
    const email = await db.query(sql, [account_email]);
    return email.rowCount;
  } catch (error) {
    console.error({ checkExistingEmail: error });
    return error.message;
  }
};

/* **********************
 *   Get account by email
 * ********************* */
accountModel.getAccountByEmail = async (account_email) => {
  try {
    const sql = 'SELECT * FROM account WHERE account_email = $1';
    const data = await db.query(sql, [account_email]);
    return data.rows[0];
  } catch (error) {
    console.error({ getAccountByEmail: error });
    return new Error('No matching email found');
  }
};

module.exports = accountModel;
