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
  if (data) {
    makeTable();
  }
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

function makeTable() {
  content = "<table class='table'>";
  for (key in rows) {
    content += "<tr id='entry" + key + "'><td>" + rows[key].merchant + "</td><td>" + "$" + rows[key].amount + "</td></tr>"
    content += "<tr id='delete" + key + "' value='" + key + "' style='display: none;'><td><span class='glyphicon glyphicon-trash'></span></td></tr>"
  }
  content += "</table>";
  document.getElementById("table").innerHTML = content;
  $("#table-container").show();
}
$(document).ready (function(){
  $("[id^=entry").click(function(){
    $("#delete0").toggle();
  });
  $("#plus").click(function(){
    $("#add").toggle(250);
    if( $("#add").is(":visible")) {
      $("#amount-input").focus();
    }
  });
});

