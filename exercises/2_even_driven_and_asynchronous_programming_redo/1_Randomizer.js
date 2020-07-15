function Clock() {
  this.id = null;
}

Clock.prototype.run = function() {
  let seconds = 0;
  this.id = setInterval(() => {
    seconds += 1;
    console.log(seconds)
  }, 1000)
};

Clock.prototype.stop = function() {
  clearInterval(this.id)
};

function randomInTwoSeconds() {
  return Math.floor(2000 * Math.random());
};

function randomizer() {
  let callbacks = [...arguments],
      totalDuration = 2000 * callbacks.length,
      clock = (new Clock());
  
  if (callbacks.length === 0) {
    console.log('No Callback provided!')
  } else {
    let delay = 0;
    clock.run();
    callbacks.forEach(callback => {
      delay += randomInTwoSeconds();
      setTimeout(callback, delay);
    })
  }

  setTimeout(() => { clock.stop()}, totalDuration )
}

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
