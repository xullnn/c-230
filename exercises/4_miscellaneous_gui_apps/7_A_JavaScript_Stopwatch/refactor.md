Data:
  - elapsed time(all other data are derived from this one)
  - what's the minimal accessibility the app needs
    - private to the closure created by the IIFE
      - do we need to implement a constructor function?

Algorithm:
  - core algorithm: calculate the 4 portions of time from the elapsed time(milliseconds)

Behavior:
  - reset


---

- `init()` should be the only public interface we want to expose
- all other procedures and data accessibility should be kept private

So the basic structure may be:

```js
var app = (function() {
  // a closure created
  var privateData;

  function privateFunctions() {};

  return { // a clock object with access to all private data and functions
    init: function() { "the only public interface" };
  };
})();
```
