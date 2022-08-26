const products = [
  {
    id: '1234',
    name: 'Product 1',
    price: 1000,
    inStock: true,
  },
  {
    id: '1235',
    name: 'Product 2',
    price: 600,
    inStock: true,
  }
];

function createEditButton() {
  const editButton = document.createElement('button');
  editButton.innerHTML = 'Edit';
  return editButton;
}

function createColum(data) {
  const columnData = document.createElement('td');
  if (typeof data === 'object') {
    columnData.appendChild(data);
  } else {
    columnData.innerText = data;
  }
  return columnData;
}

function createRow(product) {
  const tableRow = document.createElement('tr');
    
  tableRow.appendChild(createColum(product.id));
  tableRow.appendChild(createColum(product.name));
  tableRow.appendChild(createColum(product.price));
  tableRow.appendChild(createColum(product.inStock === true ? 'YES' : 'NO'));

  tableRow.appendChild(createColum(createEditButton()));

  return tableRow;
}

function renderTable() { 
  const table = document.getElementById('product-table');
  products.forEach(function (product) {  
    table.appendChild(createRow(product));
  });
}

renderTable();
