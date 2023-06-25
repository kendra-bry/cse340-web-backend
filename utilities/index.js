const invModel = require('../models/inventory-model');
const Util = {};

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async () => {
  try {
    let data = await invModel.getClassifications();
    let list = '<ul>';
    list += '<li><a href="/" title="Home page">Home</a></li>';
    data.rows.forEach((row) => {
      list += `<li>
        <a href="/inv/type/${row.classification_id}" title="See our inventory of ${row.classification_name} vehicles.">
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
          <img src="${vehicle.inv_thumbnail}" alt="Image of ${vehicle.inv_make} ${vehicle.inv_model} on CSE Motors" />
        </a>
        <div class="name-price">
          <a href="../../inv/detail/${vehicle.inv_id}" title="View ${vehicle.inv_make} ${vehicle.inv_model} details">
            <h2>${vehicle.inv_make} ${vehicle.inv_model}</h2>
            <span>$${Util.formatNumber(vehicle.inv_price)}</span>
          </a>
        </div>
      </li>`;
    });
    grid += '</ul>';
  } else {
    grid += '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }
  return grid;
};

Util.formatNumber = (number) => new Intl.NumberFormat('en-US').format(number);

/* **************************************
 * Build the inventory detail view HTML
 * ************************************ */
Util.buildInventoryDetail = (data) => {
  return `<div class="details-container">
    <div class="details-img">
      <img src="${data.inv_image}" alt="${data.inv_make} ${data.inv_model}" />
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
  </div>`;
};

/* **************************************
 * Middleware For Handling Errors
 * Wrap other functions in this for
 * General Error Handling
 * Unit 3, Activities
 * ************************************ */
Util.handleErrors = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

module.exports = Util;
