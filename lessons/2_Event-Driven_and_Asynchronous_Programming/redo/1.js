function delayLog() {
  let delay = 0;

  for(let i = 1; i <= 10; i += 1) {
    delay += i * 1000
    setTimeout(function() { console.log(i) }, delay)
  }
};

delayLog();
