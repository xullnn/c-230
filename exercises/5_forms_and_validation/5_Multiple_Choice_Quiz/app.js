App = (function() {
  var questions = [
    {
      id: 1,
      description: "Who is the author of <cite>The Hitchhiker's Guide to the Galaxy</cite>?",
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

  var answerKey = { '1': 'Douglas Adams', '2': '42', '3': 'A drink', '4': 'Betelgeuse' },
      questionTemp = Handlebars.compile($('#question_temp').html()),
      answers = {};
      // {1: "Douglas Adams", 2: "42", 3: "None of the above", 4: "Algol"}
      // missing one(3): {1: "Douglas Adams", 2: "42", 4: "Betelgeuse"}

  function insertQuestions() {
    $('form').prepend(questionTemp({questions: questions}));
  };

  function renderMessage() {
    var paragraph,
        content;

    for(let id in answerKey) {
      $paragraph = $('#' + id);
      if (answers[id] === undefined) {
        content = "You didn't answer this question, the correct answer is: " + answerKey[id];
      } else if (answers[id] !== answerKey[id]) {
        content = "Wrong answer, the correct answer is: " + answerKey[id];
      } else {
        content = "Correct!"
        $paragraph.addClass('correct_message');
      }
      $paragraph.text(content);
      $paragraph.show();
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    var entries = (new FormData(document.querySelector('form'))).entries();
    for(let entry of entries) {
      answers[String((Number(entry[0]) + 1))] = entry[1];
    };

    renderMessage();
    $('#submit').attr('disabled', 'disabled');
  };

  function handleReset() {
    $('form').reset();
  }

  function bindEvents() {
    $('#submit').on('click', handleSubmit);
    $('#reset').on('click', handleReset);
  }

  return {
    init: function() {
      insertQuestions();
      bindEvents();
    },
  };
})();

App.init();
