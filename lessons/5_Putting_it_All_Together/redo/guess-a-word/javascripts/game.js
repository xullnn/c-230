function charCount(char, array) {
  let count = 0;
  array.forEach(c => {
    if (char === c) count += 1;
  });
  return count;
};

$(function() {

  let fruits = ['apple', 'apricot', 'avocado', 'olive', 'orange'];

  function randomWord() {
    let index = Math.floor(Math.random() * fruits.length);
    return fruits.splice(index, 1)[0];
  };

  function Game() {
    this.targetWord = randomWord().split('');
    this.wordGuessed = this.targetWord.map(e => '');
    this.allGuess = [];
    this.charIndexes = this.extractIndexes();
    this.incorrectCount = 0;
    this.totalAllowedWrongTimes = 6;
    this.drawSpans(this.wordGuessed, $('#spaces h2'));
  };

  Game.prototype.extractIndexes = function() {
    let indexes = {};
    this.targetWord.forEach((c, i) => {
      if (indexes[c]) {
        indexes[c].push(i)
      } else {
        indexes[c] = [i];
      }
    });
    return indexes;
  };

  Game.prototype.drawSpans = function(letters, $parent) {
    console.log(this.targetWord);
    $parent.find('span').remove();
    let $span;
    letters.forEach(l => {
      $span = $(document.createElement('span'));
      $span.text(l || '')
      $parent.append($span);
    })
  };

  Game.prototype.guessed = function(pressed) {
    return this.targetWord.includes(pressed)
    && this.targetWord.lastIndexOf(pressed)
      !== this.wordGuessed.lastIndexOf(pressed);
  };

  let game = new Game();

  $(document).on('keypress', function(event) {
    let pressed = event.key;
    if (!pressed.match(/[a-zA-Z]/)) return;

    game.allGuess.push(pressed);
    game.drawSpans(game.allGuess, $('#guesses h2'));
    if (game.guessed(pressed)) {
      let nextIndex = game.charIndexes[pressed][charCount(pressed, game.wordGuessed)]
      game.wordGuessed[nextIndex] = pressed;
      game.drawSpans(game.wordGuessed, $('#spaces h2'));
      if (game.wordGuessed.join('') === game.targetWord.join('')) {
        $('body').addClass('win');
        $(this).off('keypress');
      }
    } else {
      game.incorrectCount += 1;
      $('#apples').addClass('guess_' + String(game.incorrectCount));
      if (game.incorrectCount >= game.totalAllowedWrongTimes) {
        $('body').addClass('lose');
        $(this).off('keypress');
      }
    }
  });
})
