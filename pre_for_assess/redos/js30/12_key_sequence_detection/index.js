let pressed = [];

let secretCode = 'yolo';

document.addEventListener('DOMContentLoaded', function() {
  window.addEventListener('keyup', (e) => {
    pressed.push(e.key);

    pressed = pressed.splice(-secretCode.length);

    if ((pressed.join('')).includes(secretCode)) {
      console.log("There it is!")
    }
  })

})
