var orbits = document.getElementById('orbits');
var circle1 = document.getElementById('circle1');


(function () {
  var numSteps = 80;
  var r = 200;
  var fps = 1000/25;
  function newCircle(circleToClone, cx, cy) {
    var circle = circleToClone.cloneNode();
    circle.setAttribute('id', '');
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    orbits.appendChild(circle);
    return circle;
  }

  function* diagonal(cPosition, xDirection, yDirection, stepSize) {
    cPosition = yield cPosition;
    var xStep = xDirection * stepSize;
    var yStep = yDirection * stepSize;
    while (1) {
      var next = {
        x: cPosition.value.x + xStep,
        y: cPosition.value.y + yStep 
      };
      cPosition = yield next;
    }
  }


  var moveCircle = function (circle, xDirection, yDirection, fps) {
    var val;
    var cx = parseInt(circle.getAttribute('cx'));
    var cy = parseInt(circle.getAttribute('cy'));
    var kissIt = diagonal({x: cx, y: cy}, xDirection, yDirection, 3)
    var last = kissIt.next(); 
    var count = 0;
    var roll = function () {
      last = kissIt.next(last);
      val = last.value;

      cx = val.x;
      cy = val.y;
      this.setAttribute('cx', cx);
      this.setAttribute('cy', cy);

      count += 1;
      if (count > numSteps) {
        clearInterval(rollInterval);
      }
    }
    var rollInterval = setInterval(roll.bind(circle), fps);
  }

  var circle2 = newCircle(circle1, 500, 500);
  var circle3 = newCircle(circle1, 500, 0);
  var circle4 = newCircle(circle1, 0, 500);

  moveCircle(circle1, 1, 1, fps);
  moveCircle(circle2, -1, -1, fps);
  moveCircle(circle3, -1, 1, fps);
  moveCircle(circle4, 1, -1, fps);

}());

