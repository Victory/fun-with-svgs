var orbits = document.getElementById('orbits');
var circle1 = document.getElementById('circle1');

circle1.style.display = "none";

(function () {
  var numSteps = 80;
  var r = 200;
  var fps = 1000/25;

  function getCircleLocation (circle) {
    return {
      x: parseInt(circle.getAttribute('cx')),
      y: parseInt(circle.getAttribute('cy'))
    };
  }

  function newCircle (circleToClone, cx, cy) {
    var circle = circleToClone.cloneNode();
    circle.setAttribute('id', '');
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.style.display = "block";
    orbits.appendChild(circle);
    return circle;
  }

  function* diagonal (cPosition, xDirection, yDirection, stepSize) {
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

  var orbitCircle = function (circle, radius, fps) {
    var rads = 0;
    var cx;
    var cy;
    var sun = {
      x: parseInt(circle.getAttribute('cx')), 
      y: parseInt(circle.getAttribute('cy'))
    };
    setInterval(function () {
      rads += .1;
      cx = radius * Math.sin(rads);
      cy = radius * Math.cos(rads);
      cx += sun.x;
      cy += sun.y;
      circle.setAttribute('cx', cx);
      circle.setAttribute('cy', cy);
    }, fps);
  }

  var oscillate = function (circle, start, end, fps) {
    var rads = 0;
    var step = 10;
    var initCx = parseInt(circle.getAttribute('cx'));
    var initCy = parseInt(circle.getAttribute('cy'));
    setInterval(function () {
      rads += .4;
      cx = parseInt(circle.getAttribute('cx'));
      cy = parseInt(circle.getAttribute('cy')) 
      cx += step;
      cy = cy + 30 * Math.sin(rads);

      if (cx + step >= end || cx + step <= start) {
        step *= -1;
      }
      circle.setAttribute('cx', cx);
      circle.setAttribute('cy', cy);
    }, 80);
  }

  var spiningOrbit = function (circle, radius, oscillation, fps) {
    var orbitRads = 0;
    var oscillatingRads = 0;
    var c = getCircleLocation(circle);
    setInterval(function () {
      orbitRads += .1;
      oscillatingRads += .5;
      cx = radius * Math.sin(orbitRads);
      cy = radius * Math.cos(orbitRads);
      cx += c.x + oscillation * Math.sin(oscillatingRads);
      cy += c.y + oscillation * Math.cos(oscillatingRads);
      circle.setAttribute('cx', cx);
      circle.setAttribute('cy', cy);
    }, fps);
  }

  var oscillatingOrbit = function (circle, radius, oscillation, fps) {
    var orbitRads = 0;
    var oscillatingRads = 0;
    var c = getCircleLocation(circle);
    var radiusModified;
    setInterval(function () {
      orbitRads += .1;
      oscillatingRads += .8;
      radiusModified = oscillation * Math.sin(oscillatingRads); 
      cx = radius * Math.sin(orbitRads);
      cy = radius * Math.cos(orbitRads);
      cx += c.x + radiusModified;
      cy += c.y + radiusModified;
      circle.setAttribute('cx', cx);
      circle.setAttribute('cy', cy);
    }, fps);

  };

  /*  
  var circle2 = newCircle(circle1, 500, 500);
  var circle3 = newCircle(circle1, 500, 0);
  var circle4 = newCircle(circle1, 0, 500);
  var circle5 = newCircle(circle1, 150, 150);
  var circle6 = newCircle(circle1, 350, 150);
  var circle7 = newCircle(circle1, 50, 50);
  var circle8 = newCircle(circle1, 0, 100);
  var circle9 = newCircle(circle1, 250, 250);
  */
  var circle10 = newCircle(circle1, 250, 250);
 
  /* 
  moveCircle(circle1, 1, 1, fps);
  moveCircle(circle2, -1, -1, fps);
  moveCircle(circle3, -1, 1, fps);
  moveCircle(circle4, 1, -1, fps);

  orbitCircle(circle5, 80, fps);
  orbitCircle(circle6, 80, fps);
  orbitCircle(circle7, 20, fps);
  oscillate(circle8, 0, 500);

  spiningOrbit(circle9, 150, 50, fps);
  */

  oscillatingOrbit(circle10, 200, 50, fps);
}());

