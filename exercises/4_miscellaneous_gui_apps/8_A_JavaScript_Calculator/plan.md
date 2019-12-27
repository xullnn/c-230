Before starting to solve the problem, we need to think about what exactly a simple calculator is used for? It's just evaluating math expressions. So there are two major aspects here:
- the math expression
- the process for evaluating the expression

Luckily, the two aspects mentioned above can be solved independently. At first glance, I would think the first task -- get the expression -- was easier than the evaluating task. It turned out I was wrong. Because initially we don't have full control of user input. In this case, the inputs can be categorized into several groups:

1. numbers
2. operations like `+`, `-`, `*`, `/`, `%`
3. the equal sign `=`
4. the negate sign `NEG`
5. `C` and `CE` operations

A user may by purpose or not input invalid expressions, such as `+ 69 / * 8 NEG 2 %`. If we send this expression to any evaluating process, it causes error. But if we can make sure we get a valid math expression, we don't have to worry this. In fact a valid expression can give us more options for the second major task, whether to implement our own calculating program or just simply delegate the task to javascript's [eval](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval) function though the latter is not recommended.

Anyway we'd better first find a way to get a valid expression. This will provide a good support for the second task.

### Collect user input and form a valid expression

My first try went something like:

- initiate a global variable to record the previous input
- when user press a button
  - recognize the current input
  - if the permutation of (previousInput currentInput) is valid, push currentInput to the expression
    - update the preInput to the currentInput
  - else it just `return`s

This may sounds simple but actually the logic behind is not that simple. Because there are so many invalid permutations I had to rule out. This is an "let possible errors in then correct them" approach. Then I just stuck there for hours, I thought even though I worked this out, I would not be able to well understand the code in the future.

What if I just don't give users any chances to input an invalid value. The `click` event is the 'interface' that controls whether a user can input a value. By "don't give them chance" I mean immediately after a user press a button, I'll shut down the `click` event on all invalid inputs for the next pressing, and only turn on the valid ones. Thus at each moment a user can only press the right buttons, we let no invalid values to be pushed in the expression.

This approach maybe a bit sealed and arbitrary, but it's more safe.

But somehow we still need the validation logic, we can't bypass this part. Since I categorized the buttons and there exists clear mapping relationships among them, so instead of writing lengthy conditionals, I could codify the rules in data structure, and a nested object can do this.

First let us clear out mind, think about what exactly the `turn off` --> `turn on` should be? I figured out two ways:

- first turn off the invalid ones, then turn on the valid ones
- first turn off all, then turn on the valid ones

The first one needs two set of mapping relationships for the current input -- what are valid for the next pressing, and what are invalid. The second approach only need to know what are valid for the next step. I'll use the second(lazy) one.

My first try on formulating the mapping relationships:

| current input | what are allowed for next input|
| :------------- | :------------- |
| initial state     |numbers, `NEG`|
| numbers       | numbers, `+-*/%`, `=`, `C`, `CE`|
| + - * / %       |`+-*/%`(sub previous), numbers, `C`, `CE`, `NEG`|
| NEG    |numbers, `C`, `CE`|
| =       |evaluating, reset, set result as the only entry in the expression then imply back to the previous mapping relationships|
| CE      |clear previous entry, take last entry and set it to current input then imply back to the previous mapping relationships|
| C      |reset|

The list above tells me `=`, `CE` and `C` can't build a simple mapping relationship, instead they need to use the map. So we may build something like:

```js
var nextAllows = {
  initial: ['numbers', 'neg_sign'],
  numbers: ['numbers', 'operators', 'equal_sign', 'clear_all', 'clear_entry'],
  operators: ['numbers', 'operators', 'clear_all', 'clear_entry', 'neg_sign'],
  neg_sign: ['numbers', 'clear_all', 'clear_entry'],
}
```

And the names in the object can be used as class names in html to arrange different types of elements, then it'll be convenient to perform the "off and on" operation. We also need a way to retrieve the last entry in the expression:

```js
function lastEntry() {
  var entry = expression.split(/\s/).slice().pop();
  return entry ? entry : '';
};
```

Then if we have turned off all event listeners on the calculator, how we turn on the valid ones?

```js
function capitalize(str) { return str[0].toUpperCase() + str.slice(1) };

function turnOnValid(class_list) {
  class_list.forEach(class_name => {
    $(class_name).on('click', 'p', eval('handle' + capitalize(class_name)));
  });
};
```

Here I concoct handler names by combining `'handler'` with class name.

```js
function handleNumbers(event) {
  var currentInput = $(event.target).text().trim();
  var className = $(event.target).closest('div').attr('class');
  expression.push(' ' + currentInput);
  $('#panel *').off();
  turnOnValid(nextAllows[className]);
};
```
