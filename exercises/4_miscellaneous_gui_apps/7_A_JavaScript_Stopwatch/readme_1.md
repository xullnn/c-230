Math is faster than object.

Core logic:
hour: 1000 * 60 * 60 ms = 3600000
minute: 1000 * 60 ms = 60000
second: 1000 ms
centisecond: 10 ms

var clock = {
  hour:,
  minute:,
  second:,
  centisecond:,
}

a function takes elapsed milliseconds in then updates clock object in the global scope;
-  const millis = Date.now() - start

a function to render clock per 10ms

setInterval per 10ms

Buttons:
  - reset
  - start
  - continue
