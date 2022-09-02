const products = [];


function editRow(er) {
  if (er.innerHTML === "Edit") {
    er.innerHTML = "Save";
    er.style.backgroundColor = 'SlateGray';
    er.setAttribute('onclick', 'saveChange(this)');
    let dis = document.forms["form"]["submit"];
    dis.setAttribute('disabled', '');

    let indexOfRow = er.parentNode.parentNode.rowIndex;
    let roEdit = document.getElementById('product-table').rows[indexOfRow];
    let cell0Edit = roEdit.cells[0];
    let cell1Edit = roEdit.cells[1];
    let cell2Edit = roEdit.cells[2];
    let cell3Edit = roEdit.cells[3];

    cell0Edit.setAttribute('contenteditable', 'true');
    cell1Edit.setAttribute('contenteditable', 'true');
    cell2Edit.setAttribute('contenteditable', 'true');
    cell3Edit.setAttribute('contenteditable', 'true');

  } else {
    saveChange(er);
  }
}



function saveChange(sr) { 
  let indexOfRow = sr.parentNode.parentNode.rowIndex;
  let roEdit = document.getElementById('product-table').rows[indexOfRow];
  let cell0Edit = roEdit.cells[0];
  let cell1Edit = roEdit.cells[1];
  let cell2Edit = roEdit.cells[2];
  let cell3Edit = roEdit.cells[3];

  console.log (cell1Edit.innerHTML, cell1Edit.innerText);
  if (cell1Edit.innerText === ""){
    alert ("Please dont keep any field empty");
    return;
  }
  if (cell3Edit.innerHTML === "yes" || cell3Edit.innerHTML === "Yes" ||
    cell3Edit.innerHTML === "YES" || cell3Edit.innerHTML === "no" ||
    cell3Edit.innerHTML === "No" || cell3Edit.innerHTML === "NO") {

    let product = {
      id: cell0Edit.innerHTML,
      name: cell1Edit.innerHTML,
      price: cell2Edit.innerHTML,
      inStock: (cell3Edit.innerHTML === 'yes'),
    }
  

    products.splice(indexOfRow - 1, 1, product);
    let dis = document.forms["form"]["submit"];
    dis.removeAttribute('disabled', '');
    sr.style.backgroundColor = 'Gray';
    sr.innerHTML = "Edit";
    sr.setAttribute('onclick', 'editRow(this)');
    renderTable();

  } else {
    alert("please enter the instock status only by 'yes' or 'no'");
  }
}




function delRow(r) {
  var j = r.parentNode.parentNode.rowIndex;
  const table = document.getElementById("product-table");
  table.deleteRow(j);
  products.splice(j - 1, 1);
}



function delTable() {
  const table = document.getElementById('product-table');
  for (let i = 1; table.rows.length !== 1;) {
    table.deleteRow(i);
  }
}



function resetForm() {
  document.getElementById("form").reset();
}



function addProduct() {

  let a = document.forms["myForm"]["id"].value
  let b = document.forms["myForm"]["name"].value
  let c = document.forms["myForm"]["price"].value

  if (a === "") {
    alert(" Please enter your ID");
  } else if (b === "") {
    alert("Please enter your name");
  } else if (c === "") {
    alert("Please enter a valid price");
  } else {
    let x = document.querySelector('input[name="instock"]:checked').value;
    let product = {
      id: document.getElementById("id").value,
      name: document.getElementById("name").value,
      price: document.getElementById("price").value,
      inStock: (x === "true"),
    }
    products.push(product);
    renderTable();
  }
}


function createEditButton() {
  const editButton = document.createElement('button');
  editButton.style.width = '60%';
  editButton.style.backgroundColor = 'gray';
  editButton.setAttribute('onclick', 'editRow(this)');
  editButton.innerHTML = 'Edit';
  return editButton;
}



function createDeleteButton() {
  const deleteButton = document.createElement('button');
  deleteButton.style.width = '40%';
  deleteButton.style.backgroundColor = 'gray';
  deleteButton.setAttribute('onclick', 'delRow(this)');
  deleteButton.innerHTML = 'delete';
  return deleteButton;
}



function createColum(data) {
  const columnData = document.createElement('td');
  columnData.style.maxWidth = '20px';
  columnData.setAttribute('type', 'text');
  if (typeof data === 'object') {
    columnData.appendChild(data);
  } else {
    columnData.innerText = data;
  }
  return columnData;
}


function createRow(product) {
  const tableRow = document.createElement('tr');
  tableRow.style.textAlign = 'center';
  tableRow.appendChild(createColum(product.id));
  tableRow.appendChild(createColum(product.name));
  tableRow.appendChild(createColum(product.price));
  tableRow.appendChild(createColum(product.inStock === true ? 'yes' : 'no'));
  tableRow.appendChild(createColum(createEditButton()));
  tableRow.appendChild(createColum(createDeleteButton()));

  return tableRow;
}



function renderTable() {
  delTable();
  const table = document.getElementById('product-table');

  products.forEach(function (product) {
    table.appendChild(createRow(product));
  });
}

renderTable();

