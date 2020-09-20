// function bundled together with surrounding state(lexical environment)
// created every time a function *is created*

// Concept of lexical scoping

function init() {
  let name = "Mozilla";

  function displayName() {
    alert(name);
  }

  displayName();
};


init();

// Nested functions have access to variables *declared* in the outer scope

// Closure

function makeFunc() {
  let name = 'Mozilla';

  function displayName() {
    alert(name);
  }

  return displayName;
};

let myFunc = makeFunc(); // `myFunc is created at this time`

myFunc();

// not all languages work this way

// The reason is that functions in JavaScript form closures.
// A closure is the combination of a function and the lexical environment
// within which that function was declared. This environment consists of
// any local variables that were in-scope at the time the closure was created.

// another example
// function factory / parital function / curry

function addingFactory(addend) {
  // closure contains addend
  return (x) => {
    return x + addend
  }
};


let add5 = addingFactory(5);

add5(2) // 7


// Practical sides of closure

// has parallels with OOP
// Objects let you associate *data(states/properties)* with its *methods*
// Closures let you associate states with function
// So in essence both way are combining data and algorithm
// Which is the very basic aspect of *Program* (oh my new realization)
//
// > Consequently, you can use a closure anywhere that you might normally
// use an object with only a single method.



// Emulating private methods

// > ...they can be called only by other methods in the same class.

// JavaScript does not provide a native way of doing this, but it is possible
// to emulate private methods using closures. Private methods aren't just useful
// for restricting access to code. They also provide a powerful way of managing
// your global namespace.

let counter = (function() {
  let privateCounter = 0; // private state

  function changeBy(val) { // have access to `privateCounter`
    privateCounter += val;
  };

  return { // to expose public interfaces
    increment: function() {
      changeBy(1); // access private data in closure
    },

    decrement: function() {
      changeBy(-1); // access private data in closure
    },

    value: function() {
      return privateCounter; // access private data in closure
    }
  };

})()

let counter = (function() {
  let privateCounter = 0; // private state

  return { // to expose public interfaces
    mirror: function() {
      return privateCounter;
    },

    value: privateCounter
    // only functions keep references
    // otherwise it's a pointer(property) pointing to a scalar
  };

})()

// > Changes to the variable value in one closure don't affect the value in
// the other closure.
// > Using closures in this way provides benefits that are normally associated
// with object-oriented programming. In particular, data hiding and encapsulation.



// Closure Scope Chain


// runtime:
// global scope
function outer() {
  // outer function scope
  return function inner() {
    // own scope
  }
}

// Notice variable declaration done by `var` and `let` my be different
// `var` declares variables has function scope -- available everywhere in a funcion
  // and there is hoisting mechanism
// `let` declares variables has block scope -- and there's no hoisting


// Performance considerations

// > It is unwise to unnecessarily create functions within other functions if
// closures are not needed for a particular task, as it will negatively affect
// script performance both in terms of processing speed and memory consumption.
