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

  function* diagonal(cPosition) {
    cPosition = yield cPosition;
    while (1) {
      var next = {
        x: cPosition.value.x + 3,
        y: cPosition.value.y + 3
      };
      cPosition = yield next;
    }
  }

  var kissIt = diagonal({x: c1x, y: c1y})
  var last = kissIt.next(); 
  var val;
  var roll = setInterval(function () {
    last = kissIt.next(last);
    val = last.value;

    c1x = val.x;
    c1y = val.y;

    circle1.setAttribute('cx', c1x);
    circle1.setAttribute('cy', c1y);

    count += 1;
    if (count > numSteps) {
      clearInterval(roll);
    }
  }, fps);
}());

