// randomly invoke n functions withion 2 * n seconds
  // while logging out every elapsed second

// use arguments object to track all callbacks
// need a way to pre-allocate time interval for every function execution
  // the first interval appears before the first callback execution
  // the last interval appears before the execution of the last callback
  // so the number of intervals is equal to the number of callbacks

// if we have 5 callbacks
  // setTimeout
    // 1st callback
  // setTimeout
    // 2nd callback
  // ...
    // 5th callback

// how to generate intervals for a given n(the number of callbacks)

function generateIntervals(n) { // return intervals as miliseconds
  let intervals = [];
  let totalDuration = 2 * n * 1000;

  if (n === 1) return [totalDuration];

  for(let t = 1; t < n; t += 1) {
    intervals.push(Math.floor(Math.random() * (n + 1)) * 1000);
  };

  let lastInterval = totalDuration - intervals.reduce((a, b) => a + b);

  if (lastInterval >= 0) {
    intervals.push(lastInterval);
    intervals = intervals.map((_, i) => intervals.slice(0, i + 1).reduce((a, b) => a + b));
    return intervals;
  } else {
    return generateIntervals(n);
  }
};

function timer(n) {
  var second = 0;
  var id = setInterval(function() {
    second += 1;
    console.log(second);
    if (second === n) clearInterval(id);
  }, 1000);
};


function randomizer() {
  let callbacks = Array.from(arguments);
  let intervals = generateIntervals(callbacks.length);
  timer(callbacks.length * 2);

  for(let i = 0; i < callbacks.length; i += 1) {
    setTimeout(callbacks[i], intervals[i])
  };
};

function callback1() {
  console.log('callback1');
}

function callback2() {
  console.log('callback2');
}

function callback3() {
  console.log('callback3');
}

randomizer(callback1, callback2, callback3);
