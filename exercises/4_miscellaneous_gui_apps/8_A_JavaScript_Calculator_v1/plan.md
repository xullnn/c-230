Before starting to solve the problem, we need to think about what exactly a simple calculator is used for? It's just evaluating math expressions. So there are two major aspects here:
- the math expression
- the process for evaluating the expression

Luckily, the two aspects mentioned above can be solved independently. At first glance, I would think the first task -- get the expression -- was easier than the evaluating task. It turned out I was wrong. Because initially we don't have full control of user input. In this case, the inputs can be categorized into several groups:

1. numbers
2. operations like `+`, `-`, `*`, `/`, `%`
3. the equal sign `=`
4. the negate sign `NEG`
5. `C` and `CE` operations

By purpose or not, a user may  input invalid expressions, such as `+ 69 / * 8 NEG 2 %`. If we send this expression to any evaluating process, it causes error. But if we can make sure we get a valid math expression, we don't have to worry this. In fact a valid expression can give us more flexibility for the second task, whether to implement our own calculating program or just simply delegate the task to javascript's [eval](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval) function, though the latter is not recommended.

Anyway we'd better first find a way to get a valid expression. Since we did some similar problems like implementing a mini language or some sort, I'll focus on the first task, then let javascript's `eval` to do the rest.

### Collect user input and form a valid expression

My first try went something like:

- initiate a global variable to record the previous input
- when user press a button
  - recognize the current input
  - if the permutation of (previousInput currentInput) is valid, push currentInput to the expression
    - update the preInput to the currentInput
  - else it just `return`s

This may sounds simple but actually the logic behind is not that simple. Because there are so many invalid permutations I had to rule out. This is an "let possible errors in then correct them" approach. Then I just stuck there for hours, I thought even though I worked this out, I would not be able to well understand the code in the future.

What if I just don't give users any chance to input an invalid value. The `click` event is the 'gate' that controls whether a user can input a value. By "don't give them chance" I mean immediately after a user press a button, I'll shut down the `click` event on all invalid inputs for the next pressing, and only turn on the valid ones. Thus at each moment a user can only press the valid buttons, we let no invalid values to be pushed in the expression.

This approach maybe a bit sealed and arbitrary, but it's more safe.

But somehow we still need the validation logic, we can't bypass this part. Since I categorized the buttons and there exists clear mapping relationships among them, so instead of writing lengthy conditionals, I could codify the rules in data structure, and an object can do this.

First let us think about what exactly the `turn off` --> `turn on` should be? I figured out two ways:

- first turn off the invalid ones, then turn on the valid ones
- first turn off all, then turn on the valid ones

The first one needs two set of mapping relationships for the current input -- what are valid for the next pressing, and what are invalid. The second approach only needs to know what are valid for the next step. I'll use the second(lazy) one.

My first try on writing the mapping relationships:

| current input | what are allowed for next input|
| :------------- | :------------- |
| initial state     |numbers, `NEG`|
| numbers       | numbers, `+-*/%`, `=`, `C`, `CE`|
| + - * / %       |`+-*/%`(sub previous), numbers, `C`, `CE`, `NEG`|
| NEG    |numbers, `C`, `CE`|
| =       |evaluating, reset, set result as the only entry in the expression then apply back to the previous mapping relationships|
| CE      |clear previous entry, take last entry and set it to current input then apply back to the previous mapping relationships|
| C      |reset|

The list above tells me `=`, `CE` and `C` can't build a simple mapping relationship, instead they need to use the map. So I build something like:

```js
var nextAllows = {
  initial: ['numbers', 'neg_sign'],
  numbers: ['numbers', 'operators', 'equal_sign', 'clear_all', 'clear_entry'],
  operators: ['numbers', 'operators', 'clear_all', 'clear_entry', 'neg_sign'],
  neg_sign: ['numbers', 'clear_all', 'clear_entry'],
  after_evaluation: ['neg_sign', 'numbers', 'operators', 'equal_sign', 'clear_all', 'clear_entry']
};
```

And the names in the object can be used as class names in html to arrange different types of elements, then it'll be convenient to perform the "off and on" operation.

Then if we have turned off all event listeners on the calculator, how we turn on the valid ones?

```js
function capitalize(str) { return str[0].toUpperCase() + str.slice(1) };

function turnOnValid(class_list) {
  $('#panel *').off();
  class_list.forEach(class_name => {
    $('.' + class_name).on('click', 'p', eval('handle' + capitalize(class_name)));
  });
};
```

Here I concoct handler names by combining `'handler'` with class name. Here I use `eval` again(not recommend, but you get the idea).

Then the next step is to write all these handlers:

- `handleNumbers(event)`
- `handleNeg_sign(event)`
- `handleOperators(event)`
- `handleClear_all(event)`
- `handleClear_entry(event)`
- `handleEqual_sign(event)`

The general things we do inside each handler are:
- get the value of current input
- recognize the css class (`className`) of its parent `div`
- based on the last entry in current `expression`, decide how to handle the current input, for example:
  - if last entry is `NEG` then a number input, say `6`, it will combine with the `NEG` to form a `NEG6`
  - if last entry is a number `6` then another number input `2` will form something like `62`
  - if last entry is one of `+-*/%` like `3 + 8 %`, then another number input `2` will directly push the number into the expression with a leading empty string space. Then we get `3 + 8 % 2`
- render new expression to html
- turn off all event listeners, then turn on valid ones based on `className` we just got.

In its initial state, I use the handlers in `initial` group -- `initial: ['numbers', 'neg_sign'],`. Since each handler will first off all event listeners and then enable valid ones, so what are invalid inputs is dynamically changing based on the current input.
