document.addEventListener('DOMContentLoaded', function() {
  function colorGeneration(targetLevel) {
    let currentLevel = 1,
        elements = Array.from(document.body.children);

    while (currentLevel < targetLevel) {
      currentLevel += 1;
      elements = elements.flatMap(e => Array.from(e.children))
    }

    elements.forEach(e => e.classList.add('generation-color'))
  }


  colorGeneration(7);

})




// counting level way
