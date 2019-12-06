function debounce(func, delay) {
  var timeout;

  return function() {
    var args = arguments;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(function() {
      func.apply(null, args);
    }, delay);
  };
}


// - scope.clearTimeout(timeoutID)
//
// timeoutID
// The identifier of the timeout you want to cancel. This ID was returned by
// the corresponding call to setTimeout().
