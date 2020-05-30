// General functions and variables
function charCount(char, array) {
  let count = 0;
  array.forEach(c => {
    if (char === c) count += 1;
  });
  return count;
};

let fruits = ['apple', 'apricot', 'avocado', 'olive', 'orange'];

function randomWord() {
  let index = Math.floor(Math.random() * fruits.length);
  return fruits.splice(index, 1)[0];
};

// -----------------------------------------------------------

$('#replay').on('click', function(event) {
  event.preventDefault();
  Object.create(Game).init();
})

//

let Game = {
  totalAllowedWrongTimes: 6,

  reset: function() {
    this.targetWord = randomWord().split(''); // reset
    this.wordGuessed = this.targetWord.map(e => ''); // reset
    this.allGuess = []; // reset
    this.charIndexes = this.extractIndexes(); //reset
    this.incorrectCount = 0; //reset
    this.drawSpans(this.wordGuessed, $('#spaces h2')); //reset
    this.drawSpans(this.allGuess, $('#guesses h2'))
  },

  bindEvent: function() {
    $(document).off('keypress');
    $(document).on('keypress', this.processGuess.bind(this));
  },

  processGuess: function(event) {
    let pressed = event.key;
    if (!pressed.match(/[a-zA-Z]/)) return;

    this.allGuess.push(pressed);
    this.drawSpans(this.allGuess, $('#guesses h2'));
    if (this.guessed(pressed)) {
      let nextIndex = this.charIndexes[pressed][charCount(pressed, this.wordGuessed)]
      this.wordGuessed[nextIndex] = pressed;
      this.drawSpans(this.wordGuessed, $('#spaces h2'));
      if (this.wordGuessed.join('') === this.targetWord.join('')) {
        $('body').addClass('win');
        $(document).off('keypress');
      }
    } else {
      this.incorrectCount += 1;
      $('#apples').addClass('guess_' + String(this.incorrectCount));
      if (this.incorrectCount >= this.totalAllowedWrongTimes) {
        $('body').addClass('lose');
        $(document).off('keypress');
      }
    }
  },

  extractIndexes: function() {
    let indexes = {};
    this.targetWord.forEach((c, i) => {
      if (indexes[c]) {
        indexes[c].push(i)
      } else {
        indexes[c] = [i];
      }
    });
    return indexes;
  },

  drawSpans: function(letters, $parent) {
    console.log(this.targetWord);
    $parent.find('span').remove();
    let $span;
    letters.forEach(l => {
      $span = $(document.createElement('span'));
      $span.text(l || '')
      $parent.append($span);
    })
  },

  guessed: function(pressed) {
    return this.targetWord.includes(pressed)
    && this.targetWord.lastIndexOf(pressed)
      !== this.wordGuessed.lastIndexOf(pressed);
  },

  init: function() {
    this.reset();
    this.bindEvent();
    return this;
  },
};

Object.create(Game).init();
