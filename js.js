budget = 120
data = localStorage.data

if (data) {
  var rows = JSON.parse(data);
  var spent = 0;
  var saved;
}
else {
  rows = {};
}

function loadData() {
  var spent = 0;
  for (key in rows) {
    spent += parseInt(rows[key].amount);
  }
  document.getElementById("spent").innerHTML = "$" + spent;
  document.getElementById("saved").innerHTML = "$" + (budget-spent);
}

function resetPage() {
  loadData();
  $("#add").hide();
  $("#amount-input").val("");
  $("#merchant-input").val("");
}

loadData();

function addExpense() {
  if (data) {  
    row = (Object.keys(rows).length + 1);
  }
  else {
    row = 0;
  }
  amount = parseInt(document.getElementById("amount-input").value);
  merchant = document.getElementById("merchant-input").value;
  rows[row] = {amount: amount, merchant: merchant};
  saveData();
}

function saveData() {
  data = JSON.stringify(rows);
  localStorage.data = data;
  resetPage();
}
$(document).ready (function(){
  $("#plus").click(function(){
    $("#add").toggle(250);
    if( $("#add").is(":visible")) {
      $("#amount-input").focus();
    }
  });
});

