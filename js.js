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
function table() {
  data = '[{"amount":"10","merchant":"Safeway"},{"amount":"12","merchant":"chipotle"}]';
  rows = JSON.parse(data);
  for (key in rows) {
    window.console.log(rows[key].amount);
  }
}
window.onload = loadCount;
table();
