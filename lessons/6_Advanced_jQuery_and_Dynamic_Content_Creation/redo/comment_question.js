function extend(target, sourceObj) {
  Object.getOwnPropertyNames(sourceObj).forEach(name => {
    target[name] = function() { // notice the closure here can also reference 'outer outer' variable references
      // return function() {
        sourceObj[name].apply(this, arguments)
      // }()
    };
  })

  return target;
};


let sourceObj = {
  method_one: function() {
    console.log('Method one.');
  },
};

let target = {};

extend(target, sourceObj);

target.method_one();

sourceObj['method_one'] = function() { console.log('This method has been changed.') };

target.method_one();
