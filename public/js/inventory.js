'use strict';

const classificationList = document.querySelector('#classification_id');

classificationList.addEventListener('change', () => {
  const classification_id = classificationList.value;
  console.log(`classification_id is: ${classification_id}`);
  const classIdURL = `/inv/getInventory/${classification_id}`;
  fetch(classIdURL)
    .then((response) => {
      if (response.ok) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return response.json();
        } else {
          throw Error('Response was not in JSON format');
        }
      }
      throw Error('Network response was not OK');
    })
    .then((data) => {
      buildInventoryList(data);
    })
    .catch((error) => {
      console.log('There was a problem: ', error.message);
    });
});

// Build inventory items into HTML table components and inject into DOM
const buildInventoryList = (data) => {
  const inventoryDisplay = document.getElementById('inventoryDisplay');
  // Set up the table labels
  let dataTable = '<thead>';
  dataTable += '<tr><th>Vehicle Name</th><td>&nbsp;</td><td>&nbsp;</td></tr>';
  dataTable += '</thead>';
  // Set up the table body
  dataTable += '<tbody>';
  // Iterate over all vehicles in the array and put each in a row
  data.forEach(function (element) {
    console.log(element.inv_id + ', ' + element.inv_model);
    dataTable += `<tr><td>${element.inv_make} ${element.inv_model}</td>`;
    dataTable += `<td><a href='/inv/edit/${element.inv_id}' title='Click to update'>Modify</a></td>`;
    dataTable += `<td><a href='/inv/delete/${element.inv_id}' title='Click to delete'>Delete</a></td></tr>`;
  });
  dataTable += '</tbody>';
  // Display the contents in the Inventory Management view
  inventoryDisplay.innerHTML = dataTable;
};
