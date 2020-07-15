let questions = [
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
    questionTemplate = Handlebars.compile($('#question').text());

function Question(fieldset) {
  this.fieldset = fieldset;
  this.msgElement = fieldset.nextElementSibling;
}

function renderQuestions() {
  questions.forEach(question => {
    $('form').prepend(questionTemplate(question))
  })
};

Question.prototype.checkState = function() {
  let id = this.fieldset.id,
      checkedInput = this.fieldset.querySelector('input:checked');

  if (checkedInput === null) return 'unchecked';

  let checkedValue = checkedInput.value;

  if (checkedValue === this.getAnswer()) return 'correct';
  return 'incorrect';
};

Question.prototype.renderMsg = function() {
  let state = this.checkState(),
      text;

  if (state === 'unchecked') text = 'Unchecked: ';
  if (state === 'incorrect') text = 'Incorrect: ';
  if (state === 'correct') {
    text = 'Correct: ';
    this.msgElement.classList.add('correct_message')
  }

  this.msgElement.textContent = text + 'the correct answer is ' + this.getAnswer();
  this.msgElement.style.display = 'block';

  this.markCorrectLabel();
};


Question.prototype.getAnswer = function() {
  return answerKey[String(this.fieldset.id)];
};

Question.prototype.resetFieldset = function() {
  this.msgElement.style.display = "none";
  this.msgElement.classList.remove("correct_message");
  [...this.fieldset.querySelectorAll('label')].forEach(label => label.style.color = 'black');
};

Question.prototype.markCorrectLabel = function() {
  let correctLabel = [...this.fieldset.querySelectorAll('label')].find(label => label.innerText.trim() === this.getAnswer())
  correctLabel.style.color = 'green'
}

App = (function() {

  let $form = $('form');

  function renderQuestions() {
    questions.forEach(question => {
      $form.prepend(questionTemplate(question))
    })
  };

  function handleSubmit(e) {
    console.log('On submitting')
    $form.find('button[type=submit]').attr('disabled', true)
    e.preventDefault();

    this.questions = [...document.querySelectorAll('fieldset')].map((fieldset) => new Question(fieldset));
    this.questions.forEach(question => {
      question.renderMsg();
    })
  };

  function handleReset(e) {
    e.preventDefault()
    this.questions.forEach(question => {
      question.resetFieldset();
    });

    $form[0].reset();
    $form.find('button[type=submit]').attr('disabled', false)
  }

  function bindEvents() {
    $form.on('submit', handleSubmit.bind(this));
    $('#reset_button').on('click', handleReset.bind(this))
  };

  return {
    init: function() {
      renderQuestions();
      bindEvents.call(this);
    }
  }

})();

App.init();
