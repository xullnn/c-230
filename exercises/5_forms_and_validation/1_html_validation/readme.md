Use html to specify validation rules, but js to customize error message, css to draw style.

Examples:
- document.querySelector('input').checkValidity()

**element.validity:**
- A ValidityState object describing the validity state of the element. See that article for details of possible validity states.

```js
document.querySelector('input').validity
// return this =>
ValidityState {valueMissing: false, typeMismatch: false, patternMismatch: false, tooLong: false, tooShort: true, …}
valueMissing: false
typeMismatch: false
patternMismatch: false
tooLong: false
tooShort: true
rangeUnderflow: false
rangeOverflow: false
stepMismatch: false
badInput: false
customError: false
valid: false
```


```js
const email = document.getElementById("mail");

email.addEventListener("input", function (event) {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("I am expecting an e-mail!");
  } else {
    email.setCustomValidity("");
  }
});
```


## Property and Methods APIs

Constraint validation API **properties**

- `validationMessage`	A localized message describing the validation constraints that the control doesn't satisfy (if any) or the empty string if the control is not a candidate for constraint validation (willValidate is false) or the element's value satisfies its constraints.
- `validity`	A ValidityState object describing the validity state of the element.
- `willValidate`	Returns true if the element will be validated when the form is submitted; false otherwise.

Constraint validation API **methods**

- `checkValidity()`	Returns true if the element's value has no validity problems; false otherwise. If the element is invalid, this method also causes an invalid event at the element.
- `HTMLFormElement.reportValidity()`	Returns true if the element or its child controls satisfy validation constraints. When false is returned, cancelable invalid events are fired for each invalid element and validation problems are reported to the user.
- `setCustomValidity(message)`	Adds a custom error message to the element; if you set a custom error message, the element is considered to be invalid, and the specified error is displayed. This lets you use JavaScript code to establish a validation failure other than those offered by the standard constraint validation API. The message is shown to the user when reporting the problem. If the argument is the empty string, the custom error is cleared.


> The constraint validation API gives you a powerful tool to handle form validation, letting you have enormous control over the user interface above and beyond what you can do with HTML and CSS alone.

---

The `'invalid'` event can be triggered by two ways:
  - when a form with constraints is submitted
  - when `checkValidity()` is invoked and there is unsatisfied constraints

There's no such a `valid` event, but an `if else` conditional can expression the logic. There has css pseudo class selector `:valid`, `:invalid` and `:required`.


Set rules on input-like elements
--> invoke `checkValidity()` manually to trigger `invalid` event
  -> check on single input field or
  -> check on the whole form
--> or trigger `invalid` when submitting the whole form
