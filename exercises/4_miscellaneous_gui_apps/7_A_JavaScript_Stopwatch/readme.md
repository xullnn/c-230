var clock = {
  hours: {

    count: 0,

    minutes: {

      count: 0,

      seconds: {

        count: 0,

        centiseconds: {

          count: 0,

          ?
        }
      }
    }
  }
}


var clock = {
  hours: 0,
  minutes: 0,
  seconds: 0,
  centiseconds: 0,

  incrementer: funciton() {
    increment centiseconds by 1 for per 10ms
    when centiseconds reaches 99
      - increment seconds by 1
      - reset centiseconds
      - check if seconds reaches 59
        - yes:
          - increment minutes by 1
          - reset seconds
            - check if minutes reaches 59
              - yes:
                - increment hours by 1
                - reset minutes
              - no:
                - return(continue the increment on centiseconds)
        - no:
          - return(continue the increment on centisecond
  }

  renderClock: function() {

  },

  run: function() {

  },

  stop: function() {

  },

  continue: function() {

  },

  reset: function() {

  }


  init: function() {
    return { a timer object}
  }
},


every reach of the threshold on centiseconds(59) triggers a increment
then ripples through all the data -- means a refresh on data from seconds to hours
immediately follows the refresh, rerender data on presentation layer
this happens every 10ms which is expensive


let first implement the core functionalities regardless of presentation layer

---

what about adding event listeners to increment time

Main tread + conditionals based on time setting

---

should use setInterval not setTimeout

---

Use setTimeout to implement a custom version of setTimeout is a good way to understand how both of them work.

---

> Let's look at an example. The following function creates a new Date() object, extracts a time string out of it using toLocaleTimeString(), and then displays it in the UI. We then run the function once per second using setInterval(), creating the effect of a **digital clock** that updates once per second (see this live, and also see the source):

---

Ways to do this:

- a lazy one: borrow time from OS
- a dedicate one: first change at centiseconds triggers all changes through the rest time portions
- a mathematical one: use elapsed milli/centiseconds to constantly calculating all values for each portion, then render them out

---

use divmodulo to calculate from hour portion
