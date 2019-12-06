// use OLOO pattern

// currently not supporting duplicate letters in a word
var wordCollection = ['pick', 'ad', 'bbc', 'roger', 'gooooogle'] //'under', 'proud', 'bear',

function randomWord() {
  var length = wordCollection.length;
  var randomIndex = Math.floor(Math.random() * length);
  return wordCollection.splice(randomIndex, 1)[0];
};

function dropAllEventListener() {
  $(window).unbind();
};

// fill in blank when guessing a right letter
function fillLetter(letter) {
  var $spans = $('#spaces span');
  var slot = $spans.filter(function(_, span) {
    return $(span).data('letter') === letter && span.textContent.trim() !== letter;
  })[0];
  slot.textContent = letter;
};

// callback to call on each keypress/up event
function gameHandler(event) {
  event.preventDefault();
  var key = String.fromCharCode(event.which).toLowerCase();
  game.guess(key);
};


var baseObj = {
  checkWordStock: function() {
    if (this.word === undefined) {
      $('#message').text('Sorry, we got no words left. Please refresh the browser to play again.');
      dropAllEventListener();
      $('#replay').hide();
      return false;
    } else {
      this.charsLeftToGuess = this.word.split('');
      return true;
    };
  },

  hitALetter: function(letter) {
    return this.word.indexOf(letter) !== -1 && this.charsLeftToGuess.includes(letter);
  },

  guess: function(letter) {
    var span = document.createElement('span');
    span.textContent = letter;
    $('#guesses').append(span);

    if (this.hitALetter(letter)) { // guess a letter
      this.guessedWords.push(letter);
      this.charsLeftToGuess.splice(this.charsLeftToGuess.indexOf(letter), [1]);
      fillLetter(letter);
    } else { // missed
      this.guesses += 1;
      $('#apples').addClass('guess_' + String(this.guesses));
    };

    // win the game
    if (this.guessedWords.length === this.word.length) {
      $('#message').text("You Won!");
      $('body').addClass('win');
      dropAllEventListener();
    }

    // lose the game
    if (this.guesses === this.guessLimit) {
      $('#message').text("Sorry, no more chances!");
      $('body').addClass('lose');
      dropAllEventListener();
    }
  },

// draw out all blanks for correct letters
  drawBlanks: function() {
    var $spaces = $('#spaces');
    var span;
    this.word.split('').forEach(letter => {
      span = document.createElement('span');
      $(span).data('letter', letter);
      $spaces.append(span);
    });
  },

  init: function() {
    this.word = randomWord();
    if (!this.checkWordStock()) return;
    this.guesses = 0;
    this.guessLimit = 6;
    this.guessedWords = [];
    this.drawBlanks();
    return this;
  }
};

// -----------------------------------------------------------------------------

// after first loading the page, event listener should be added
$(window).on('keyup', gameHandler);

// reset game when clicking the replay link
$('#replay').on('click', function(event) {
  event.preventDefault();
  $('#spaces span').remove();
  $('#guesses span').remove();
  $('#message').text('');
  $('#apples').removeClass();
  $('body').removeClass();
  $(window).on('keyup', gameHandler);
  game = Object.create(baseObj).init();
})

var game = Object.create(baseObj).init();
