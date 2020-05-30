function debounce(func, delay) {
  let timeout;

  return function() {
    let args = arguments;

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(function() {
      func.apply(null, args);
    }, delay);
  };
}
