function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`),
        key = document.querySelector(`div[data-key="${e.keyCode}"]`)

  if (audio) {
    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');
  }
};

function removeTransition(e) {
  let target = e.target;

  if (target.tagName !== 'DIV') return;

  if(e.propertyName !== 'transform') return;
  target.classList.remove('playing');
};

document.addEventListener('DOMContentLoaded', function() {
  let keysDiv = document.querySelector('.keys');
  keysDiv.addEventListener('transitionend', removeTransition)


  window.addEventListener('keydown', playSound);
})
