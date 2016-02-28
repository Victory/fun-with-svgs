var orbits = document.getElementById('orbits');
var circle1 = document.getElementById('circle1');


(function () {
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
  circle2.setAttribute('cy', c2y);
  orbits.appendChild(circle2);  

  function* diagonal(cPosition, direction, stepSize) {
    cPosition = yield cPosition;
    var step = direction * stepSize;
    while (1) {
      var next = {
        x: cPosition.value.x + step,
        y: cPosition.value.y + step 
      };
      cPosition = yield next;
    }
  }


  var moveCircle = function (circle, direction, fps) {
    var val;
    var cx = parseInt(circle.getAttribute('cx'));
    var cy = parseInt(circle.getAttribute('cy'));
    var kissIt = diagonal({x: cx, y: cy}, direction, 3)
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

  moveCircle(circle1, 1, fps);
  moveCircle(circle2, -1, fps);

}());

