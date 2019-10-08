var target = document.getElementById('notice');

document.getElementById('toggle').onclick = function(e) {
  e.preventDefault;
  let currentState = target.getAttribute('class');
  if (currentState === 'hidden') {
    target.setAttribute('class', 'visible')
  } else {
    target.setAttribute('class', 'hidden')
  }
}


target.onclick = function(e) {
  e.preventDefault;
  this.setAttribute('class', 'hidden');
}

//

var target = document.getElementById('multiplication');
target.textContent = '117'

var body = document.body;

//

var target =  document.getElementById('notice');
document.getElementById('toggle').onclick = function(e) {
  e.preventDefault;
  if (target.className === 'hidden') {
    target.setAttribute('class', 'visible');
  } else {
    target.setAttribute('class', 'hidden');
  }
}

target.onclick = function(e) {
  e.preventDefault;
  this.setAttribute('class', 'hidden');
};
