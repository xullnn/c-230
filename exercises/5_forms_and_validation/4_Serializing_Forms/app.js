var Form = (function() {
  var controls = [
    {name: 'first_name', type: 'text',label: 'First Name', pattern: "[a-zA-Z]{2,20}", error_message: 'Required, must be longer than 2 chars', required: true},
    {name: 'last_name', type: 'text',label: 'Last Name', pattern: "[a-zA-Z]{2,20}", error_message: 'Required, must be longer than 2 chars', required: true},
    {name: 'email', type: 'email',label: 'Email', pattern: ".+@.+", error_message: 'Required, must be a valid email address', required: true},
    {name: 'password', type: 'password',label: 'Password', pattern: "(?=.{6,})(?=.*[a-z])(?=.*[A-Z]).*", error_message: 'Required, any string of at least 6 characters that contains at least one lowercase and one uppercase', required: true},
    {name: 'phone', type: 'tel',label: 'Phone(optional)', pattern: "[0-9]{3}[ \-]{0,1}[0-9]{3}[ \-]{0,1}[0-9]{4}", error_message: 'Optional, but must be in the form of 123-123-1234 if any.'},
  ];

  var input_template = Handlebars.compile($('#input_template').html());

  function insertInputs() {
    var $container = $('#fields');
    controls.slice().reverse().forEach(dataObject => {
      $container.prepend(input_template(dataObject))
    });
  };

  function formIsValid() {
    return document.querySelector('form').checkValidity();
  };

  function preventNumberTypeIn(event) {
    var key = event.key;
    if (key.match(/[^a-z]/i)) { event.preventDefault() };
  };

  function preventCharTypeIn(event) {
    var key = event.key;
    if (!(/[0-9]/.test(key) || /Backspace|Delete|Shift|Tab/.test(key))) { event.preventDefault() };
  };

  function validateInput(event) {
    var input = event.currentTarget,
        $errorParagraph = $(input).siblings('p'),
        fieldName = $(input).attr('name');

    if (/first_name|last_name/.test(fieldName)) preventNumberTypeIn.bind(this)(event);
    if (/card_number/.test(fieldName)) preventCharTypeIn.bind(this)(event);

    if (input.checkValidity()) {
      $errorParagraph.css({color: 'green'});
    } else {
      $errorParagraph.css({color: 'red'});
    };

    if (formIsValid()) {
      $('#submit').removeAttr('disabled'); // enable button if all controls are valid
      $('#flash').hide();
    } else {
      $('#submit').attr('disabled', 'disabled');
    }
  };

  function serializeData() {
    var str = $('form').serialize();
    var pairs = str.split('&');
    var card_numbers = pairs.splice(-4, 4);
    var full_number = card_numbers.map(pairStr => {
      return pairStr.match(/\d+$/).toString();
    }).join('');
    pairs.push('&card_number=' + full_number);
    return pairs.join('');
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (formIsValid()) {
      $('#flash').hide();
    } else {
      $('#flash').show();
    };

    if (formIsValid()) {
      var dataStr = serializeData();
      $('#encoded_data').text(dataStr);
    };
  };

  function bindEvents() {
    $('input').on('keydown', validateInput);
    $('button').on('click', handleSubmit);
    $('input[name=card_number]').not('#last_credit_field').on('keyup', switchingFocus);
  };

  function switchingFocus(event) {
    var key = event.key;
    if (/[0-9]/.test(key)) {
      var current_input = event.currentTarget;
      var next_input = current_input.nextElementSibling;

      if (current_input.value.length === 4) next_input.focus();
    };
  };

  return {
    init: function() {
      insertInputs();
      bindEvents();
    }
  };
})();

Form.init();
