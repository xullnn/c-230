function inner() {
  var n = 0;
  return function() {
    n += 1;
    console.log(n);
  }
};

var f = inner();

function startCounting() {
  setInterval(f, 1000);
};

//

function startCounting() {
  var n = 0;
  return setInterval(function() {
    n += 1;
    console.log(n);
  }, 1000);
};

var id = startCounting();

function stopCounting(id) {
  clearInterval(id);
};

stopCounting(id)

//

var id;

function startCounting() {
  var n = 0;
  id = setInterval(function() {
    n += 1;
    console.log(n)
  }, 1000);
};

function stopCounting() {
  clearInterval(id)
};

startCounting();

stopCounting();
