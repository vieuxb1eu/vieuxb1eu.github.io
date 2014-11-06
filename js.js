budget = localStorage.budget; 
data = localStorage.data;

if (budget) {
  if (data) {
    var rows = JSON.parse(data);
    var spent = 0;
    var saved;
    loadData();
    makeTable();
  }
  else {
    rows = {};
    loadData();
  }
}
else {
  getBudget();
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
  $("#amount-input").val("");
  $("#merchant-input").val("");
  $("#add").hide();
  $("#add-budget").hide();
  $("[id^=options]").hide();
  loadData();
  makeTable();
}

function getBudget() {
  $("#add-budget").toggle(250,function() {
    if( $("#add-budget").is(":visible")) {
      $("#budget-input").focus();
    }
  });
}

function addBudget() {
  budget = parseInt(document.getElementById("budget-input").value);
  localStorage.budget = budget 
  resetPage();
}

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
  if (Object.keys(rows).length < 1) {
    content = "No spending";
  }
  document.getElementById("table").innerHTML = content;
  /*$("#table-container").show();*/
}

function listOptions(key) {
  $("#options" + key).toggle(250);
}

function removeItem(key) {
  delete rows[key];
  saveData();
}

function resetData() {
  data = null;
  rows = {};
  saveData();
}

$(document).ready (function(){
  $("#plus").click(function(){
    $("#add").toggle(250, function() {
      if( $("#add").is(":visible")) {
        $("#amount-input").focus();
      }
    });
  });
  $("#settings").click(function(){
    getBudget();
  });
});

