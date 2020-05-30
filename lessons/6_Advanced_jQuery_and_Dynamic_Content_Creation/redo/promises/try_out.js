let id;

setTimeout(() => {clearInterval(id)}, 10000)

let ex = (succ, fail) => {
  id = setInterval(() => {console.log('click......')}, 1000)
};

let p = new Promise(ex); // ex will be executed right after the promise is created

// at the moment when a promise is created
  // the executor of that promise will be performed
  // other chained thens only grasp the return value of the previous promise
  // and do further operations.

// chain of promises

function f1() {
  return new Promise((resolve, reject) => {
    let intervalId = setInterval(() => {console.log('Async 1')}, 1000);
    setTimeout(() => { clearInterval(intervalId); resolve()}, 1500);
  })
};
// the moment `resolve` is invoked is when this promise settles

function f2() {
  return new Promise((resolve, reject) => {
    let intervalId = setInterval(() => {console.log('Async 2')}, 1000);
    setTimeout(() => { clearInterval(intervalId)}, 1500);
  })
};

function f3() {
  return new Promise((resolve, reject) => {
    let intervalId = setInterval(() => {console.log('Async 3')}, 1000);
    setTimeout(() => { clearInterval(intervalId); resolve()}, 1500);
  })
};

// Promise.resolve().then(f1).then(f2).then(f3);

// [f1, f2, f3].map((f) => f());

let chain = Promise.resolve();
// [f1, f2, f3].forEach(f => chain = chain.then(f()));
  // not that then() takes callbacks as arguments, but `then(f())` is like passing
  // a promise directly to `then()` this doesn't queue the async operations in
  // wanted order. Operations in all promises will begin without any waiting

[f1, f2, f3].forEach(f => chain = chain.then(f));

//


let promise = new Promise()
let createPromise = () => { new Promise() }
// if this is passed as a callback
  // the new promise is not actually present until the callback is invoked
  // so while a then() is waiting for a pending promise to resolve
  // the next callbacks are not invoked therefore the new promise is not created
