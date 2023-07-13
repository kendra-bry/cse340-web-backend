const db = require('../database/');

const reviewModel = {};

/* ***************************
 *  Add New Review
 * ************************** */
reviewModel.addReview = async (
  // prettier-review
  review_rating,
  review_name,
  review_content,
  inv_id
) => {
  try {
    const sql = 'INSERT INTO public.review (review_rating, review_name, review_content, inv_id) VALUES ($1, $2, $3, $4) RETURNING *';
    const data = await db.query(sql, [review_rating, review_name, review_content, inv_id]);
    return data;
  } catch (error) {
    console.error('model error: ' + error);
  }
};

/* ***************************
 *  Get Review
 * ************************** */
reviewModel.getReview = async (review_id) => {
  try {
    const sql = 'SELECT * FROM public.review WHERE review_id = $1';
    const data = await db.query(sql, [review_id]);
    return data.rows[0];
  } catch (error) {
    console.error('model error: ' + error);
  }
};

/* ***************************
 *  Delete Review
 * ************************** */
reviewModel.deleteReview = async (review_id) => {
  try {
    const sql = 'DELETE FROM public.review WHERE review_id = $1';
    const data = await db.query(sql, [review_id]);
    return data;
  } catch (error) {
    console.error('model error: ' + error);
  }
};

module.exports = reviewModel;
