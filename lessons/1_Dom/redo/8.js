let target = document.querySelector('#notice'), currentClass;

document.getElementById('toggle').onclick = function(event) {
  event.preventDefault();
  currentClass = target.getAttribute('class');
  if (currentClass === 'hidden') {
    target.setAttribute('class', 'visible');
  } else {
    target.setAttribute('class', 'hidden');
  };
};

target.onclick = function(event) {
  event.preventDefault();
  this.setAttribute('class', 'hidden');
};

let multiplication = document.getElementById('multiplication');
multiplication.textContent = '117';

//
document.querySelector('body').setAttribute('id', 'styled')
