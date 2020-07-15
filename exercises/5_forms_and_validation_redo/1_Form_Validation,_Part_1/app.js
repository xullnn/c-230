var Form = (function() {
  let rules = {
    first_name: 'Required, only accept 2-10 chars English letter',
    last_name: 'Required, only accept 2-10 chars English letter',
    email: 'Required, must be a valid email address',
    password:'Required, any string of at least 6 characters that contains at least one lowercase and one uppercase',
    phone: 'Optional, but must be a valid phone number.',
    credit_card: 'Each section must have 4 digits'
  };

  function concatData(input) {
    return input.name + '=' + encodeURIComponent(input.value);
  };

  function bindEvents() {
    $('form').on('submit', (e) => {
      e.preventDefault();
      if (!e.currentTarget.checkValidity()) {
        console.log('Hi')
        // reportValidity() will revoke the `novalidate` attr of the form
        // then bring all the default error ui to use
        document.querySelectorAll('input').forEach(input => {
          input.dispatchEvent(new Event('input'))
        })
      } else {
        let credit_card_number = $("input[name=credit_card]").map((_, input) => input.value).get().join('');
        let serializedStr = '';
        document.querySelectorAll('input').forEach(input => {
          if (input.name !== 'credit_card') serializedStr += concatData(input) + "&";
        })
        serializedStr += 'credit_card=' + credit_card_number;
        console.log(serializedStr)
        $("#Serialized_Data").text(serializedStr)
      }
    })

    document.querySelectorAll('input').forEach(input => {
      let key = input.name;
      input.addEventListener('input', (e) => {
        if (input.checkValidity()) {
          input.parentElement.lastElementChild.textContent = '';
        } else {
          input.parentElement.lastElementChild.textContent = rules[key];
        }
      })
    })

    $("input[name=first_name]").on('keypress', (e) => {
      let input = e.currentTarget;
      if (!/[a-zA-Z]/.test(e.key)) {
        e.preventDefault()
        input.parentElement.lastElementChild.textContent = rules[input.name];
      }
    })

    $("input[name=last_name]").on('keypress', (e) => {
      let input = e.currentTarget;
      if (!/[a-zA-Z]/.test(e.key)) {
        e.preventDefault()
        input.parentElement.lastElementChild.textContent = rules[input.name];
      }
    })

    $("input[name=credit_card]").on('keypress', (e) => {
      let input = e.currentTarget;
      if (input.id !== 'final_section' && input.value.length === 4) {
        e.preventDefault();
        let nextInput = input.nextElementSibling;
        nextInput.value = e.key;
        nextInput.focus();
      }

      if (!/\d/.test(e.key) || input.value.length === 4) {
        e.preventDefault()
        input.parentElement.lastElementChild.textContent = rules[input.name];
      }
    })


  }

return {
  init: function() {
    bindEvents()
  }
}

})();

Form.init();

//
//
//
// form.reportValidity() --> evoke all `invalid` events on inputs
// control.checkValidity() --> evoke single `invalid` event on input
//
// form Submit
// - check all inputs one by one
