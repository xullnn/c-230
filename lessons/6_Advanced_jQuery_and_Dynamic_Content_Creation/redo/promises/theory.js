function Vow() {

};

Vow.prototype.then = function(onFulfilled, onRejected) {
  if (typeof onFulfilled !== 'function') {
    return function() {return onFulfilled} // identity function
  };
};
