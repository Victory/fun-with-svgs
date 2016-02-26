var orbits = document.getElementById('orbits');
var circle1 = document.getElementById('circle1');


(function () {
  var count = 0;
  var numSteps = 80;
  var r = 200;
  var c1x = 0; var c2x = 500;
  var c1y = 0; var c2y = 500;
  var fps = 1000/25;
  circle1.setAttribute('cx', c1x);
  circle1.setAttribute('cy', c1y);
  var circle2 = circle1.cloneNode();
  circle2.setAttribute('id', '');
  circle2.setAttribute('cx', c2x);
  circle2.setAttribute('cy', c1x);
  orbits.appendChild(circle2);  
  var roll = setInterval(function () {
    c1x += 3;
    c1y += 3;

    c2x -= 3;
    c2y -= 3;

    circle1.setAttribute('cx', c1x);
    circle1.setAttribute('cy', c1y);
    circle2.setAttribute('cx', c2x);
    circle2.setAttribute('cy', c2y);
    count += 1;

    if (count > numSteps) {
      clearInterval(roll);
    }
  }, fps);
}());

