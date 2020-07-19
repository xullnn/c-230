XMLHttpRequest()

    ^
    |
Promise resolves/rejects to an eventual value of an asynch operation

    ^
    |

fetch() returns a Promise resolved with a `Response` object to an asynch operation


asynch function (+ await) returns a Promise which will resolved with the value returned by the function, or reject with exceptions thrown from or within the function


await expression(A Promise or any value to wait for)
  - return fulfilled value of the promise, or simply the value itself if it's not a Promise



Key facts about Promise:

new Promise() takes a 2-arg function as argument
  - A promise either resolve or reject with something within the function

As soon as a Promise is created, the operations inside the function is executing.
  - So creating a Promise on the fly is different from writing a function that returns a Promise
    - because the Promise is not existed before we invoke the promise-returning function

then().then() is the way designed to chain Promises
  - it takes function as argument
    - if the function returns a promise, then chain waits for the inner promise to settle
      - the resolved value of that promise will be passed to next then's
    - if the function simply returns a non-promise value, the value will be passed to next then's

```js
function makePromise() {
  return new Promise((r, j) => {
    r('xxx');
  })
}

let p = new Promise((r, j) => {
  r('xxx');
})
```

This is different.

Promise.resolve().then(p);
Promise.resolve().then(makePromise);
