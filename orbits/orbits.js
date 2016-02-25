var orbits = document.getElementById('orbits');
var circle = orbits.querySelector('circle');


(function () {
  var count = 0;
  var numSteps = 80;
  var r = 200;
  var cx = 0;
  var cy = 0;
  var fps = 1000/25;
  circle.setAttribute('cx', cx);
  circle.setAttribute('cy', cy);
  var roll = setInterval(function () {
    cx += 3;
    cy += 3;

    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    count += 1;

    if (count > numSteps) {
      clearInterval(roll);
    }
  }, fps);
}());

