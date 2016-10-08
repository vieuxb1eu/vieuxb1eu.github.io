budget = localStorage.budget; 
data = localStorage.data;

if (budget) {
  if (data) {
    var rows = JSON.parse(data);

    for (key in rows) {
      rows[key].time = new Date(rows[key].time);
    }

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
  showOptionsBudget();
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
  location.reload();
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
  rows[row] = {amount: amount, date: date, merchant: merchant, time: d};
  saveData();
}

Date.prototype.setDay = function(dayOfWeek) {
    this.setDate(this.getDate() - this.getDay() + dayOfWeek);
};

function getDay(day) {
  days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[day];
}

function getMonth() {
  d = new Date();
  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return months[d.getMonth()];
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
  sortData();
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
    content += "<div class='col-xs-6 list-alt' style='font-size: 30px' onclick='removeItem(" + key + ");'><span class='glyphicon glyphicon-trash list-alt option-icon'></span></div>";
    content += "<div class='col-xs-6 list-alt-edit' onclick='showEdit("+key+");' style='font-size: 30px'><span class='glyphicon glyphicon-pencil list-alt-edit option-icon'></span></div>";
    content += "</div>";

    content += "<div id='edit" + key + "' style='display: none;'>";
    content += "<div class='input-group' style='padding:10px'>";
    content += "<div class='drop-down'><select id='day"+key+"' class='drop-down' style='padding:10px'> \
                  <option value=0>Sunday</option> \
                  <option value=1>Monday</option> \
                  <option value=2>Tuesday</option> \
                  <option value=3>Wednesday</option> \
                  <option value=4>Thursday</option> \
                  <option value=5>Friday</option> \
                  <option value=6>Saturday</option> \
                </select></div>";

    content += "<div class='drop-down' style='padding:10px'><select id='time"+key+"' class='drop-down' style='padding:10px'> \
                  <option value=0>12AM</option> \
                  <option value=1>1AM</option> \
                  <option value=2>2AM</option> \
                  <option value=3>3AM</option> \
                  <option value=4>4AM</option> \
                  <option value=5>5AM</option> \
                  <option value=6>6AM</option> \
                  <option value=7>7AM</option> \
                  <option value=8>8AM</option> \
                  <option value=9>9AM</option> \
                  <option value=10>10AM</option> \
                  <option value=11>11AM</option> \
                  <option value=12>12PM</option> \
                  <option value=13>1PM</option> \
                  <option value=14>2PM</option> \
                  <option value=15>3PM</option> \
                  <option value=16>4PM</option> \
                  <option value=17>5PM</option> \
                  <option value=18>6PM</option> \
                  <option value=19>7PM</option> \
                  <option value=20>8PM</option> \
                  <option value=21>9PM</option> \
                  <option value=22>10PM</option> \
                  <option value=23>11PM</option> \
                </select></div>";

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
  $("#table-div").show();
  setDefaults();
  /*$("#table-container").show();*/
}

function setDefaults() {
  for (key in rows) {
  day_select = "#day" + key;
  time_select = "#time" + key;
  $(day_select).val(rows[key].time.getDay());
  $(time_select).val(rows[key].time.getHours());
  }
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
  newDay = parseInt(document.getElementById("day" + key).value);
  newTime = document.getElementById("time" + key).value;
  sunday = parseInt(rows[key].time.getDate()) - parseInt(rows[key].time.getDay());
  newDay = sunday + newDay;
  rows[key].time.setDate(newDay);
  rows[key].time.setHours(newTime);
  rows[key].date = getDay(rows[key].time.getDay()) + " " + getHour(rows[key].time.getHours());
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

function sortData() {
  array = [];
  for (key in rows) {
    array.push(rows[key]);
  }
  array.sort(function(a, b){return a.time - b.time});
  newObj = {};
  for (key in array) {
    newObj[key] = array[key];
  }
  rows = newObj;
}

function createEmail() {
  d = new Date();
  spent = 0;
  subject = "Budget: "+getMonth() + " "+d.getDate();
  email = "?subject="+subject+"&body=";
  for (key in rows) {
    spent += parseFloat(rows[key].amount);
    email += "%0A"+rows[key].date + "     "+rows[key].merchant+"     "+ rows[key].amount;
  }
  email += "%0ASpent: $"+spent.toFixed(2);
  email += "%0ARemaining: $"+(budget-spent).toFixed(2);
  return email;
}

function gotoEmail() {
  //var csv = "data:text/csv;charset=utf-8," + CSV(rows);
  var csv = CSV(rows);
  var encodedUri = encodeURI(csv);
  var link = document.createElement("a");
  var save = document.querySelector("g-savetodrive");
  var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  var url = URL.createObjectURL(blob);
  //save.setAttribte("data-src", encodedUri);
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "my_data.csv");
  document.body.appendChild(link); // Required for FF
  gapi.savetodrive.render('send', {
    src: url,
    filename: "File.csv",
    sitename: "Spent"
  });
 // link.click();
 // window.open(encodedUri);
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
  showBudgetOptions();
}

function showOptionsRefresh() {
  content = "";
  content += "<p>Clear expenses and start new cycle?</p>";
  content += "</br>";

  content += "<h2 align='center'><div class='col-xs-6 list-alt' onclick='resetPage();'><span class='glyphicon glyphicon-remove list-alt'></span></div>";
  content += "<div class='col-xs-6 list-alt-green' onclick='resetData();'><span class='glyphicon glyphicon-ok list-alt-green'></span></div></h2>";
  content += "</br></br>";
  document.getElementById("options-body").innerHTML = content;
  showOptions();
}

function showOptionsEmail() {
  content = "";
  content += "<p>Email address?</p><div class='input-group'><span class='input-group-addon'>&#128238;</span>";
  content += "<input id='email-input' class='form-control' value='"+emailAddress+"'></div>";
  content += "</br></br>";

  content += "<h2 align='center'><div class='col-xs-6 list-alt' onclick='resetPage();'><span class='glyphicon glyphicon-remove list-alt'></span></div>";
  content += "<div class='col-xs-6 list-alt-green' onclick='gotoEmail();'><span class='glyphicon glyphicon-ok list-alt-green'></span></div></h2>";
  content += "</br></br>";
  document.getElementById("options-body").innerHTML = content;
  showOptions();
}
function CSV(obj) {
    var array = $.map(obj, function(value, index) {
      return [value];
    });
    var keys = Object.keys(array[0]);

    var result = keys.join(", ") + "\n";

    array.forEach(function(obj){
        keys.forEach(function(k, ix){
            if (ix) result += ", ";
            result += obj[k];
        });
        result += "\n";
    });

    return result;
}

function showOptions(){
  $("#options-body").show(250, function(){
   $('html, body').animate({scrollTop:$(document).height()}, 'slow', function(){
       });
  });
}

function showBudgetOptions() {
  $("#options-body").show(250, function(){
    $("#budget-input").focus();
  });
}

$(document).ready (function(){
  $("#plus").click(function(){
    $("#add").toggle(250, function() {
      if( $("#add").is(":visible")) {
        $("#amount-input").focus();
      }
    });
  });
});
