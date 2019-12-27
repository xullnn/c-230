operations:
  - `+, -, /, *, %, =, NEG, C, CE`
    - `NEG` negates the next entered number
    - `C` resets calculator
    - `CE` withdraw previously entered operator or operation

screen:
  - show the current expression or calculating result

panel:
  - where you press/click on to write your expression

basic behavior:
  - user input numbers combined with operations
  - then press `=`
    - validate the expression
      - handle error ?
    - show results
    - clear expression, sub the content with the result

APIs:
  - Calculator.init();

---

A lazy approach:

```
var expression = "6 + 7 * 2"
undefined
eval(expression);
20
```

---

Core algorithm:

- use a string to hold the expression
- initiate a state var `negate_next` default to `false`
- when clicking numbers
  - push numbers(times -1 or not based on `negate_next` state) in expression
    - use parentheses to wrap the number
  - reset `negate_next`
- when clicking on operations
  - highlight the button
  - if `NEG` set `negate_next` to `true`
  - if `C` reset all
  - if `CE` erase previous number(1 digit) or operation
  - if `=`
    - send expression to `eval`
    - handle possible errors


- some rules
  - multiple times press on different or the same operation only keeps the last pressed one, the previous ones should be ignored
    - keep track of the last entered entry
      - preIsNumber
      - preIs
