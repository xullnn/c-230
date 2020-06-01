function throttler(callback, thresholdTime, contextObj) {
  return () => {
    if (contextObj.timeoutID) { // update
      clearTimeout(contextObj.timeoutID);
      contextObj.timeoutID = setTimeout(() => callback; thresholdTime);
    } else { // starting point / long hault
      return callback;
    }
  }
}
