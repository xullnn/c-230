// 1  //????????????????????
function delaylog() {
  var n = 0;
  var t = 0;
  while (n < 10) {
    n += 1;
    t += 1000;
    // setTimeout(function(n) { console.log(n) }, t, n);
    setTimeout(function() { console.log(n) }, t);
  }
};

delaylog();

function delaylog() {
  for(let n = 1, t = 1000; n <= 10; n += 1, t += 1000) {
    setTimeout(function() { console.log(n) }, t);
  }
};

delaylog();

// 2

setTimeout(function() {   //  1
  console.log('Once');    // 5
}, 1000);

setTimeout(function() {   //  2
  console.log('upon');    //  7
}, 3000);

setTimeout(function() {   // 3
  console.log('a');       // 6
}, 2000);

setTimeout(function() {   // 4
  console.log('time');    // 8
}, 4000);

// 3

setTimeout(function() {
  setTimeout(function() {
    q();                   // 7
  }, 15);

  d();                     // 3

  setTimeout(function() {
    n();                   // 5
  }, 5);

  z();                     // 4
}, 10);

setTimeout(function() {
  s();                     // 6
}, 20);

setTimeout(function() {
  f();                     // 1  ?
});

g();                       // 2  ?

// 4

function afterNseconds(callback, seconds) {
  let args = Array.from(arguments).slice(2);
  setTimeout(callback, seconds * 1000, ...args);
};

// test for 4

function c(a, b) {
  console.log(a + ' ' + b);
};

afterNseconds(c, 2, 'Hello', 'World')
