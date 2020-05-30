setTimeout(function() {
  setTimeout(function() {
    q();
  }, 15); // 25

  d(); // 10

  setTimeout(function() {
    n();
  }, 5); // 15

  z();  // 11
}, 10);

setTimeout(function() {
  s();
}, 20); // 20

setTimeout(function() {
  f(); // 1
});

g(); // 0

// g, f, d, z, n, s, q
