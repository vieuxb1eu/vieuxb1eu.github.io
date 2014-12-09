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
    spent += parseFloat(rows[key].amount);
  }
  document.getElementById("spent").innerHTML = "$" + spent.toFixed(2);
  document.getElementById("saved").innerHTML = "$" + (budget-spent).toFixed(2);
}

function resetPage() {
  // $("#amount-input").val("");
  // $("#merchant-input").val("");
  // $("#add").hide();
  // $("#add-budget").hide();
  // $("[id^=options]").hide();
  // loadData();
  // makeTable();
  location.reload();
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
  var d = new Date();
  date = getDay(d.getDay()) + " " + getHour(d.getHours());
  
  row = parseInt(Object.keys(rows)[Object.keys(rows).length-1]) + 1;

  if (isNaN(row)){
    row = 0;
  }
  
  amount = parseFloat(document.getElementById("amount-input").value).toFixed(2);
  merchant = document.getElementById("merchant-input").value;
  rows[row] = {amount: amount, date: date, merchant: merchant};
  saveData();
}

function getDay(day) {
  days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[day];
}

function getHour(hour) {
  if (hour > 12) {
    hour -= 12
    return hour + "PM";
  }
  if (hour == 0) {
    return "12AM";
  }
  if (hour == 12) {
    return "12PM";
  }
  else {
    return hour + "AM"
  }
}

function saveData() {
  data = JSON.stringify(rows);
  localStorage.data = data;
  localStorage.budget = budget;
  resetPage();
}

function makeTable() {
  content = "<div class='row' id='table-div' style='display:none;'>";
  for (key in rows) {
    content += "<a href='javascript:void(0);' onclick='listOptions(" + key + ");' id='item"+key+"' class='list-group-item' style='background-color: #66BAC7;'><strong>" + rows[key].date + "</strong>-" + rows[key].merchant + "-" + "$" + rows[key].amount +"</a>";
    
    content += "<div class='row' id='options" + key + "' style='display:none;'>"
    content += "<div class='col-xs-6 list-alt' style='font-size: 30px' onclick='removeItem(" + key + ");'><span class='glyphicon glyphicon-trash list-alt'></span></div>";
    content += "<div class='col-xs-6 list-alt-edit' onclick='showEdit("+key+");' style='font-size: 30px'><span class='glyphicon glyphicon-pencil list-alt-edit'></span></div>";
    content += "</div>";

    content += "<div id='edit" + key + "' style='display: none;'>";
    content += "<div class='input-group' style='padding:10px'><p><input style='padding:10px' type='text' id='date"+key+"' value='"+rows[key].date+"'></p>";
    content += "<p><input type='text' id='merchant"+key+"' style='padding:10px' value='"+rows[key].merchant+"'></p>";
    content += "<p><input type='number' min'0' step'any' id='amount"+key+"' style='padding:10px' value='"+rows[key].amount+"'></p>";
    content += "<p><div class='col-xs-6 list-alt' style='font-size: 30px' onclick='closeEdit("+key+");'><span class='glyphicon glyphicon-remove list-alt'></span></div>";
    content += "<p><div class='col-xs-6 list-alt-green' style='font-size: 30px' onclick='editRow("+key+");'><span class='glyphicon glyphicon-ok list-alt-green'></span></div>";
    content += "</div>";
    content += "</div>";
  }
  content += "</div>";
  if (Object.keys(rows).length < 1) {
    content = "No spending";
  }
  document.getElementById("table").innerHTML = content;
  $("#table-div").fadeIn();
  /*$("#table-container").show();*/
}

function listOptions(key) {
  $("#options" + key).toggle(250);
}

function showEdit(key){
  $("#options" + key).toggle(250, function(){
    $("#edit" + key).toggle(250);
  });
}

function closeEdit(key){
  $("#edit" + key).toggle(250);
}

function editRow(key){
  newAmount = parseFloat(document.getElementById("amount"+key).value).toFixed(2);
  newMerchant = document.getElementById("merchant" + key).value;
  newDate = document.getElementById("date" + key).value;
  rows[key] = {amount: newAmount, merchant: newMerchant, date: newDate};
  saveData();
}

function removeItem(key) {
  $("#options" + key).toggle(250, function(){
    $("#item" + key).fadeOut(function(){
      delete rows[key];
      saveData();
    });
  });
}

function resetData() {
  localStorage.clear();
  data = undefined;
  rows = {};
  saveData();
  resetPage();
}

function createEmail() {
  email = '<table style="width:100%">';
  for (key in rows) {
    email += "<tr>";
    email += "<td>"+rows[key].date + "</td><td>"+rows[key].merchant+"</td><td>"+ rows[key].amount+"</td>";
    email += "</tr>";
  }
  email += "</table>";
}

function showOptionsBudget() {
  content = "";
  content += "<p>Weekly budget? </p><div class='input-group'><span class='input-group-addon'>&#128176;</span>";
  content += "<input type='number' min'0' pattern='[0-9]*' class='form-control' id='budget-input' value='"+localStorage.budget+"'></div>";
  content += "</br></br>";

  content += "<h2 align='center'><div class='col-xs-6 list-alt' onclick='resetPage();'><span class='glyphicon glyphicon-remove list-alt'></span></div>";
  content += "<div class='col-xs-6 list-alt-green' onclick='addBudget();'><span class='glyphicon glyphicon-ok list-alt-green'></span></div></h2>";
  content += "</br></br>";
  document.getElementById("options-body").innerHTML = content;
  $("#options-body").show();
}

function showOptionsRefresh() {
  content = "";
  content += "<p>Clear expenses and start new cycle?</p>";
  content += "</br>";

  content += "<h2 align='center'><div class='col-xs-6 list-alt' onclick='resetPage();'><span class='glyphicon glyphicon-remove list-alt'></span></div>";
  content += "<div class='col-xs-6 list-alt-green' onclick='resetData();'><span class='glyphicon glyphicon-ok list-alt-green'></span></div></h2>";
  content += "</br></br>";
  document.getElementById("options-body").innerHTML = content;
  $("#options-body").show();
}

$(document).ready (function(){
  $("#plus").click(function(){
    $("#add").toggle(250, function() {
      if( $("#add").is(":visible")) {
        $("#amount-input").focus();
      }
    });
  });
  // $("#settings").click(function(){
  //   $("#add-budget").toggle(250, function(){
  //     $('html, body').animate({scrollTop:$(document).height()}, 'slow');
  //   });
  //   });
});