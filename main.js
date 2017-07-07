var souls = 0;
var imps = 0;

function soulClick(clickIncrement) {
  souls = souls + clickIncrement;
  document.getElementById("totalSouls").innerHTML = souls;
}

function buyImp(){
  var impCost = 10;
  if(souls >= impCost){
    imps = imps + 1;
    souls = souls - impCost;
    document.getElementById('imps').innerHTML = imps;
    document.getElementById('totalSouls').innerHTML = souls;
  }
}

window.setInterval(function(){
  soulClick(imps);
}, 1000);
