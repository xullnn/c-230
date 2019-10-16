function randomNumber() {
  return Math.floor(Math.random() * 101);
}

document.addEventListener('DOMContentLoaded', function() {
  var answer = randomNumber();
  var counter = 0;
  var p = document.querySelector('p');
  var inputArea = document.getElementById('guess');
  var message;
  var button = document.querySelector("input[type='submit']")

  function newGame() {
    answer = randomNumber();
    counter = 0;
    p.textContent = 'New Game!'
    inputArea.value = '';
    button.style.display = 'block';
  };

  document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    var guess = parseInt(inputArea.value, 10);
    var lowerOrHigher;

    if (isNaN(guess)) {
      message = "Invalid input, please submit number between 0 and 100."
    } else {
      lowerOrHigher = answer > guess ? 'higher' : 'lower';
      if (guess === answer) {
        message = 'You guessed it! The number is: ' + answer.toString();
        button.style.display = 'none';
      } else {
        message = `The number is ${lowerOrHigher} than ${guess}.`
      }
      counter += 1;
      message += ` ${counter} guesses consumed.`;
    }

    p.textContent = message;
  })

  document.querySelector('a').addEventListener('click', function(event) {
    event.preventDefault();
    newGame();
  })
});
