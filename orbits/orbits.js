var orbits = document.getElementById('orbits');
var prototypeCircle = document.getElementById('circle1');

prototypeCircle.style.display = "none";

(function () {

  var fps = 1000/25;
  function getCircleLocation (circle) {
    return {
      x: parseInt(circle.getAttribute('cx')),
      y: parseInt(circle.getAttribute('cy'))
    };
  }

  function newCircle (circleToClone, cx, cy) {
    var circle = circleToClone.cloneNode(false);
    circle.setAttribute('id', '');
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.style.display = "block";
    orbits.appendChild(circle);
    return circle;
  }

  var Motions = (function() {
    var numSteps = 80;
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

    var moveDiagonal = function (circle, xDirection, yDirection, fps) {
      var val;
      var cx = parseInt(circle.getAttribute('cx'));
      var cy = parseInt(circle.getAttribute('cy'));
      var kissIt = diagonal({x: cx, y: cy}, xDirection, yDirection, 3);
      var last = kissIt.next();
      var count = 0;
      var roll = function () {
        last = kissIt.next(last);
        val = last.value;

        cx = val.x;
        cy = val.y;
        this.setAttribute('cx', cx.toString());
        this.setAttribute('cy', cy.toString());

        count += 1;
        if (count > numSteps) {
          clearInterval(rollInterval);
        }
      };
      var rollInterval = setInterval(roll.bind(circle), fps);
    };

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
    };

    var oscillate = function (circle, start, end, fps) {
      var rads = 0;
      var step = 10;
      var cx;
      var cy;
      setInterval(function () {
        rads += .4;
        cx = parseInt(circle.getAttribute('cx'));
        cy = parseInt(circle.getAttribute('cy'));
        cx += step;
        cy = cy + 30 * Math.sin(rads);

        if (cx + step >= end || cx + step <= start) {
          step *= -1;
        }
        circle.setAttribute('cx', cx);
        circle.setAttribute('cy', cy);
      }, fps);
    };

    var spinOrbit = function (circle, radius, oscillation, fps) {
      var orbitRads = 0;
      var oscillatingRads = 0;
      var c = getCircleLocation(circle);
      var cx;
      var cy;
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
    };

    var oscillatingOrbit = function (circle, radius, oscillation, fps) {
      var orbitRads = 0;
      var oscillatingRads = 0;
      var c = getCircleLocation(circle);
      var radiusModified;
      var cx;
      var cy;
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

    return {
      moveDiagonal: {
        fun: moveDiagonal,
        inputs: [
          {
            name: cx
          },
          {
            name: cy
          }
        ]
      },
      oscillatingOrbit: oscillatingOrbit,
      oscillate: oscillate,
      spinOrbit: spinOrbit,
      orbitCircle: orbitCircle
    };
  }());

  /** bind the Add Circle Form */
  (function () {
    var form = document.getElementById("addCircle");

    var select = form.querySelector("select[name='direction']");

    // add the motion options
    for (var kk in Motions) {
      if (!Motions.hasOwnProperty(kk)) {
        continue;
      }
      var option = document.createElement('option');
      option.setAttribute('name', kk);
      option.text = kk;
      select.appendChild(option);
    }

    var button = form.querySelector('button');
    var cxElm = form.querySelector("input[name='cx']");
    var cyElm = form.querySelector("input[name='cy']");
    var cx, cy;
    var motion;
    button.addEventListener('click', function () {
      cx = cxElm.value;
      cy = cyElm.value;
      motion = select.value;
      var circle = newCircle(prototypeCircle, cx, cy);
      Motions[motion](circle, 1, 1, fps);
    });
  }());
  
}());

