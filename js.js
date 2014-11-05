function loadCount() {
  if(localStorage.clickcount > 0) {
    document.getElementById("result").innerHTML = "You have clicked the button " + localStorage.clickcount + " times.";
  }
  else {
    document.getElementById("result").innerHTML = "Click hey";
  }
}
function clickCounter() {
    if(typeof(Storage) !== "undefined") {
        if (localStorage.clickcount) {
            localStorage.clickcount = Number(localStorage.clickcount)+1;
        } else {
            localStorage.clickcount = 1;
        }
        document.getElementById("result").innerHTML = "You have clicked the button " + localStorage.clickcount + " times.";
    } else {
        document.getElementById("result").innerHTML = "Sorry, your browser does not support web storage...";
    }
}
function loadData() {
  data = '[{"amount":"10","merchant":"Safeway"},{"amount":"12","merchant":"chipotle"}]';
  rows = JSON.parse(data);
  var spent;
  var saved;
  for (key in rows) {
    rows[key].amount += spent;
  }
}
window.onload = loadCount;
loadData();
