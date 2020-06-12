document.addEventListener('DOMContentLoaded', function() {
  let highlight = document.createElement('span');
  highlight.classList.add('highlight');
  document.body.appendChild(highlight);

  let triggers = document.querySelectorAll('a');
  triggers.forEach(a => a.addEventListener('mouseenter', highlightLink));

  function highlightLink() {
    let linkCoords = this.getBoundingClientRect();
    console.log(linkCoords);
    let coords = {
      width: linkCoords.width,
      height: linkCoords.height,

      top: linkCoords.top + window.scrollY,
      left: linkCoords.left + window.scrollX
    };
    highlight.style.width = `${coords.width}px`;
    highlight.style.height = `${coords.height}px`;
    highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`

  };
})
