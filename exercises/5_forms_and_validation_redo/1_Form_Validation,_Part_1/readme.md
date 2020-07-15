Certain types of input element can validate user input such as `type='email'`. But in order to make the solution consistent, I use regular expressions to check all the inputs.

Instead of attaching callbacks on `blur` event, I attach event on `keyup` event. I also add another event listener to detect whether all input fields get correct values, if they do, the `submit` button will be enabled, which is initially disabled.

I struggled a bit about the `phone` field, I wanted it to be either empty or a 6+ numbers, at the end I use this regex: `/^(\d{6,20}|.{0})$/`. I also additionally attached a `click` event listener on `phone` field, then as soon as the user clicks the input frame, the hint becomes green, so user knows empty value is also valid.

I made up some regex myself and I also used some found on the internet.

![](https://tva1.sinaimg.cn/large/006tNbRwgy1gaet9apqpbg308w05nhdu.gif)

## Js code:

```js
var Form = (function() {
  var inputs = [
    {name: 'first_name', type: 'text',label: 'First Name', val_regex: /^[a-z]{2,20}$/i, rule_description: 'Required, must be longer than 2 chars'},
    {name: 'last_name', type: 'text',label: 'Last Name', val_regex: /^[a-z]{2,20}$/i, rule_description: 'Required, must be longer than 2 chars'},
    {name: 'email', type: 'email',label: 'Email', val_regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, rule_description: 'Required, must be a valid email address'},
    {name: 'password', type: 'password',label: 'Password', val_regex: /^(?=.{6,})(?=.*[a-z])(?=.*[A-Z]).*$/, rule_description: 'Required, any string of at least 6 characters that contains at least one lowercase and one uppercase'},
    {name: 'phone', type: 'tel',label: 'Phone(optional)', val_regex: /^(\d{6,20}|.{0})$/, rule_description: 'Optional, but must be a valid phone number.'},
  ];

  var input_template = Handlebars.compile($('#input_template').html());

  function insertInputs() {
    var $container = $('#fields');
    inputs.slice().reverse().forEach(dataObject => {
      $container.prepend(input_template(dataObject))
    });
  };

  function renderError(name) {
    $(`input[name=${name}]`).siblings('p').css('color', 'red');
  };

  function renderCorrect(name) {
    $(`input[name=${name}]`).siblings('p').css('color', 'green');
  };

  function validateInput(event) {
    var $theInput = $(event.currentTarget);
    var name = $theInput.attr('name');
    var userInput = $theInput.val().trim();
    var regex = inputs.find(specObj => specObj.name === name).val_regex;

    if (userInput.match(regex)) {
      $theInput.attr('data-matched', 'true');
      renderCorrect(name);
    } else {
      $theInput.attr('data-matched', 'false');
      renderError(name);
    };
  };

  function toggleButton() {
    var states = Array.from(document.querySelectorAll('input')).map(e => $(e).attr('data-matched'));
    var allCorrect = states.every(state => state === 'true');

    if (allCorrect) {
      $('#submit').attr('disabled', false);
    } else {
      $('#submit').attr('disabled', 'disabled');
    }
  };

  function bindEvents() {
    $('input').on('keyup', validateInput);
    $('input[name=phone]').on('click', validateInput);
    $('input').on('keyup', toggleButton);
  }

  return {
    init: function() {
      $('#submit').attr('disabled', 'disabled');
      insertInputs();
      bindEvents();
    }
  };
})();

Form.init();

```

Html, css and other resources are [here at github](https://github.com/xullnn/c-230/tree/master/exercises/5_forms_and_validation/1_Form_Validation%2C_Part_1).

---

Some references:

- jquery `siblings()` selector: https://api.jquery.com/siblings/
- password regex: https://stackoverflow.com/questions/10557441/regex-to-allow-atleast-one-special-character-one-uppercase-one-lowercasein-an
- email regex: https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
