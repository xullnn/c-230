document.addEventListener('DOMContentLoaded', function() {
  const holes = document.querySelectorAll('.hole'),
        scoreBoard = document.querySelector('.score'),
        moles = document.querySelectorAll('.mole');

  let lastHole;

  function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  function randomHole(holes) {
    let idx = Math.floor(Math.random() * holes.length),
        hole = holes[idx];

        if (hole === lastHole) {
          console.log('duplicate hole');
          return randomHole(holes);
        }

        lastHole = hole;
        return hole;
  };

  function peep() {
    let time = randomTime(200, 1000),
        hole = randomHole(holes);
        hole.classList.add('up');
        setTimeout(() => {
          hole.classList.remove('up');
          if (!timeUp) peep();
        }, time)
  }

  let timeUp = false;
  function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 15000)
  }

  function bonk(e) {
    if (!e.isTrusted) return;
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
  }

  moles.forEach(mole => mole.addEventListener('click', bonk));

  document.querySelector('#start').addEventListener('click', startGame);
})
