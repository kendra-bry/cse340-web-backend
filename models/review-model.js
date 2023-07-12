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
    inv_id,
  ) => {
  try {
    const sql = 'INSERT INTO public.review (review_rating, review_name, review_content, inv_id) VALUES ($1, $2, $3, $4) RETURNING *';
    const data = await db.query(sql, [review_rating, review_name, review_content, inv_id]);
    return data;
  } catch (error) {
    console.error('model error: ' + error);
  }
};

module.exports = reviewModel;
