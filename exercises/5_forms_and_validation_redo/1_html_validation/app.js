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

  function validateInput(event) {
    var input = event.currentTarget,
      $errorParagraph = $(input).siblings('p');

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

  function handleSubmit(event) {
    event.preventDefault();
    console.log($('#flash').text());
    if (formIsValid()) {
      $('#flash').hide();
    } else {
      $('#flash').show();
    };
  };

  function bindEvents() {
    $('input').on('blur', validateInput);
    $('button').on('click', handleSubmit);
  }

  return {
    init: function() {
      insertInputs();
      bindEvents();
    }
  };
})();

Form.init();
