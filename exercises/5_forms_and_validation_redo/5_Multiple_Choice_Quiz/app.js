App = (function() {
  var questions = [
    {
      id: 1,
      description: "Who is the author of <cite> The Hitchhiker's Guide to the Galaxy</cite>?",
      options: ['Dan Simmons', 'Douglas Adams', 'Stephen Fry', 'Robert A. Heinlein'],
    },
    {
      id: 2,
      description: 'Which of the following numbers is the answer to Life, the \
                    Universe and Everything?',
      options: ['66', '13', '111', '42'],
    },
    {
      id: 3,
      description: 'What is Pan Galactic Gargle Blaster?',
      options: ['A drink', 'A machine', 'A creature', 'None of the above'],
    },
    {
      id: 4,
      description: 'Which star system does Ford Prefect belong to?',
      options: ['Aldebaran', 'Algol', 'Betelgeuse', 'Alpha Centauri'],
    },
  ];

  let answerKey = { '1': 'Douglas Adams', '2': '42', '3': 'A drink', '4': 'Betelgeuse' },
      questionTemplate = Handlebars.compile($('#question').text()),
      $form = $('form');

  function renderQuestions() {
    questions.forEach(question => {
      $form.prepend(questionTemplate(question))
    })
  };

  function handleSubmit(e) {
    console.log('On submitting')
    $form.find('button[type=submit]').attr('disabled', true)
    e.preventDefault();
    let state;
    $('fieldset').each((_, fieldset) => {
      state = checkStateOf(fieldset);
      markFieldset(fieldset, state);
      markCorrectRadio(fieldset);
    })

  };

  function markCorrectRadio(fieldset) {
    let correctAnswer = answerKey[String(fieldset.id)],
        correctLabel = [...fieldset.querySelectorAll('label')].find(label => label.innerText.trim() === correctAnswer)
    correctLabel.style.color = 'green'

  }

  function markFieldset(fieldset, state) {
    let msgElement = fieldset.nextElementSibling,
        correctAnswer = answerKey[String(fieldset.id)],
        text;

    if (state === 'unchecked') text = 'Unchecked: ';
    if (state === 'incorrect') text = 'Incorrect: ';
    if (state === 'correct') {
      text = 'Correct: ';
      msgElement.classList.add('correct_message')
    }

    msgElement.textContent = text + 'the correct answer is ' + correctAnswer;
    msgElement.style.display = 'block';
  }

  function checkStateOf(field) {
    let id = field.id,
        checkedInput = field.querySelector('input:checked');

    if (checkedInput === null) return 'unchecked';

    let checkedValue = checkedInput.value,
        correctAnswer = answerKey[String(id)];

    if (checkedValue === correctAnswer) return 'correct';
    return 'incorrect';
  }

  function clearStyle(fieldset) {

  }

  function clearMsg() {
    let msgElements = document.querySelectorAll('p.message'),
        labels = document.querySelectorAll('label');

    console.log(msgElements)

    msgElements.forEach(e => {
      e.style.display = "none"
      e.classList.remove("correct_message")
    })
    labels.forEach(label => label.style.color = 'black');
  }

  function bindEvents() {
    $form.on('submit', handleSubmit);
    $('#reset_button').on('click', (e) => {
      e.preventDefault()
      $form[0].reset();
      clearMsg();
      $form.find('button[type=submit]').attr('disabled', false)
    })
  };

  return {
    init: function() {
      renderQuestions();
      bindEvents();
    }
  }

})();

App.init();
