function toggleOpen() {
  this.classList.toggle('open');
  this.classList.toggle('open-active')
}

function toggleActive(e) {
  if(e.propertyName.includes('flex')) {
    this.classList.toggle('open-active')
  }
}

document.addEventListener('DOMContentLoaded', function() {
  let panels = document.querySelectorAll('.panel');

  panels.forEach(p => {
    p.addEventListener('click', toggleOpen)
  })

  panels.forEach(p => {
    p.addEventListener('transitionend', toggleActive);
  })

})
