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
  $("[id^=options").hide();
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
  content = "<div class='list-group'>";
  for (key in rows) {
    content += "<a href='javascript:void(0);' onclick='listOptions(" + key + ");' class='list-group-item' style='background-color: #66BAC7;'>$" + rows[key].amount + "-" + rows[key].merchant +"</a>";
    content += "<li class='list-group-item list-alt' id='options" + key + "' style='display:none;' onclick='removeItem(" + key +");'><span class='glyphicon glyphicon-trash list-alt'></span></li>";
  }
  content += "</div>";
  document.getElementById("table").innerHTML = content;
  $("#table-container").show();
}

function listOptions(key) {
  $("#options" + key).toggle(250);
}

function removeItem(key) {
  delete rows[key];
  saveData();
}

$(document).ready (function(){
  $("#plus").click(function(){
    $("#add").toggle(250);
    if( $("#add").is(":visible")) {
      $("#amount-input").focus();
    }
  });
});

