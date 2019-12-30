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
    console.log(regex);
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
    console.log(states);
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
