document.addEventListener('DOMContentLoaded', function() {
  let divs = document.querySelectorAll('div');
  // function bubbles(e) {
  //   console.log(e.target);
  //   console.log("bubbles", this.classList.value)
  // }
  //
  // divs.forEach(div => div.addEventListener('click', bubbles));

  // function logAll(e) {
  //   phase = {
  //     0: 'unknown',
  //     1: 'capture',
  //     2: 'target',
  //     3: 'bubbling'
  //   }
  //
  //   console.log(phase[e.eventPhase], this.classList.value)
  // }
  //
  // divs.forEach(div => div.addEventListener('click', logAll, true));

  // function logEv(e) {
  //   console.log(this.classList.value);
  //   e.stopPropagation();
  // };
  //
  // divs.forEach(div => div.addEventListener('click', logEv))

  function runOnce(e) {
    console.log("I should run only once.");
  }

  divs.forEach(div => div.addEventListener('click', runOnce, {once: true}))
})


// in a callback 'this' refers to the currentTarget
