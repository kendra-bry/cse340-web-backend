const jwt = require('jsonwebtoken');
const invModel = require('../models/inventory-model');
const Util = {};

/* ************************
 * Formats number with commas
 ************************** */
Util.formatNumber = (number) => new Intl.NumberFormat('en-US').format(number);

/* ************************
 * Constructs the nav HTML
 * unordered list
 ************************** */
Util.getNav = async () => {
  try {
    let data = await invModel.getClassifications();
    let list = '<ul>';
    list += '<li><a href="/" title="Home page">Home</a></li>';
    data.rows.forEach((row) => {
      list += `<li>
        <a href="/inv/type/${row.classification_id}" title="See our inventory of ${row.classification_name} vehicles." class="test">
          ${row.classification_name}
        </a>
      </li>`;
    });
    list += '</ul>';
    return list;
  } catch (error) {
    throw error;
  }
};

/* **************************************
 * Build the classification view HTML
 * ************************************ */
Util.buildClassificationGrid = (data) => {
  let grid;
  if (data.length > 0) {
    grid = '<ul id="inv-display">';
    data.forEach((vehicle) => {
      grid += `<li class="inv-list">
        <a href="../../inv/detail/${vehicle.inv_id}" title="View ${vehicle.inv_make} ${vehicle.inv_model} details">
          <img src="${vehicle.inv_thumbnail}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model} on CSE Motors">
          <div class="name-price">
              <h2>${vehicle.inv_make} ${vehicle.inv_model}</h2>
              <span>$${Util.formatNumber(vehicle.inv_price)}</span>
          </div>
        </a>
      </li>`;
    });
    grid += '</ul>';
  } else {
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }
  return grid;
};

/* **************************************
 * Build the inventory detail view HTML
 * ************************************ */
Util.buildInventoryDetail = (data, reviews) => {
  return `<div>
    <div class="details-container">
      <div class="details-img">
        <img src="${data.inv_image}" alt="${data.inv_make} ${data.inv_model}">
      </div>
      <div class="details">
        <div class="detail-price">
          <div class="fw-bold">Price: &nbsp;</div>
          <span>$${Util.formatNumber(data.inv_price)}</span>
        </div>
        <div class="detail-item">
          <div class="fw-bold">Make: &nbsp;</div>
          <span>${data.inv_make}</span>
        </div>
        <div class="detail-item">
          <div class="fw-bold">Model: &nbsp;</div>
          <span>${data.inv_model}</span>
        </div>
        <div class="detail-item">
          <div class="fw-bold">Mileage: &nbsp;</div>
          <span>${Util.formatNumber(data.inv_miles)}</span>
        </div>
        <div class="detail-item">
          <div class="fw-bold">Year: &nbsp;</div>
          <span>${data.inv_year}</span>
        </div>
        <div class="detail-item">
          <div class="fw-bold">Color: &nbsp;</div>
          <span>${data.inv_color}</span>
        </div>
        <div class="detail-description">
          <span>${data.inv_description}</span>
        </div>
      </div>
    </div>
    <div class="reviews-container">
      <div class="review-header">
        <h3>Reviews</h3>
        <a href="/inv/reviews/add/${data.inv_id}" class="custom-button">+ Add Review</a>
      </div>
      ${createReviewCards(reviews)}
    </div>
  </div>`;
};

const createReviewCards = (reviews) => {
  let html = ''
  for (let review of reviews) {
    let reviewCard = `<div class="review-card">
      <div class="review-rating">Rating:
        <span>${review.review_rating}/5</span>
      </div>
      ${review.review_content}
      <div>
        <small class="review-name">-${review.review_name}</small>
      </div>
    </div>`

    html += reviewCard;
  }
  return html;
}

/* **************************************
 * Middleware For Handling Errors
 * Wrap other functions in this for
 * General Error Handling
 * Unit 3, Activities
 * ************************************ */
Util.handleErrors = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

/* ****************************************
 * Build the Classification Selector HTML
 **************************************** */
Util.buildClassificationSelector = (data, selectedValue) => {
  let select = '<select name="classification_id" id="classification_id" required>';
  select += '<option value="">Classification</option>';
  data.rows.forEach((row) => {
    let option = `
    <option value="${row.classification_id}" `;
    if (selectedValue && row.classification_id == selectedValue) {
      option += 'selected';
    }
    option += `>${row.classification_name}</option>`;
    select += option;
  });
  select += '</select>';
  return select;
};

/* ****************************************
 * Middleware to check token validity
 **************************************** */
Util.checkJWTToken = (req, res, next) => {
  if (req.cookies.jwt) {
    jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN_SECRET, (err, accountData) => {
      if (err) {
        req.flash('Please log in');
        res.clearCookie('jwt');
        return res.redirect('/account/login');
      }
      res.locals.accountData = accountData;
      res.locals.loggedin = 1;
      next();
    });
  } else {
    next();
  }
};

/* ****************************************
 * Create an access token
 **************************************** */
Util.createAccessToken = (accountData) => {
  delete accountData.account_password;
  const accessToken = jwt.sign(accountData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 * 1000 });
  return accessToken;
};

/* ****************************************
 *  Check Login
 * ************************************ */
Util.checkLogin = (req, res, next) => {
  if (res.locals.loggedin) {
    next();
  } else {
    req.flash('flash-error', 'Please log in.');
    return res.redirect('/account/login');
  }
};

/* ****************************************
 * Middleware to check account type
 **************************************** */
Util.checkAccountType = (req, res, next) => {
  if (req.cookies.jwt) {
    jwt.verify(req.cookies.jwt, process.env.ACCESS_TOKEN_SECRET, (err, accountData) => {
      if (err) {
        req.flash('Please log in');
        res.clearCookie('jwt');
        return res.redirect('/account/login');
      }
      const { account_type } = accountData;
      if (account_type === 'Admin' || account_type === 'Employee') {
        return next();
      } else {
        req.flash('flash-error', 'Account permissions invalid.');
        return res.redirect('/account/login');
      }
    });
  } else {
    req.flash('flash-error', 'Account permissions invalid.');
    return res.redirect('/account/login');
  }
};

module.exports = Util;
