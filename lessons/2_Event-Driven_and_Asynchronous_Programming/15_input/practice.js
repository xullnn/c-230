document.addEventListener('DOMContentLoaded', function() {
  var cursorId;
  var field = document.querySelector('.text-field');
  var contentArea = document.querySelector('.content');

  field.addEventListener('click', function(event) {
    event.stopPropagation();
    this.classList.add('focused');

    if (cursorId === undefined) {
      cursorId = setInterval(function() {
          field.classList.toggle('cursor');
      }, 500)
    };

    // cursorId = cursorId || setInterval(function() {
    //     field.classList.toggle('cursor');
    // }, 500)
  });

  document.addEventListener('click', function(event) {
    field.classList.remove('focused', 'cursor');
    clearInterval(cursorId);
    cursorId = undefined;
  });

  document.addEventListener('keydown', function(event) {
    if (field.classList.contains('focused')) {
      var lastKey = event.key
      var preText = contentArea.textContent
      if (lastKey === 'Backspace') {
        contentArea.textContent = preText.slice(0, preText.length - 1);
      } else {
        contentArea.textContent = preText + lastKey;
      }
    }
  })


})
