document.addEventListener('DOMContentLoaded', function() {
  let triggers = document.querySelectorAll('.cool > li'),
      background = document.querySelector('.dropdownBackground'),
      nav = document.querySelector('.top');

  triggers.forEach(trigger => trigger.addEventListener('mouseenter', handleEnter));
  triggers.forEach(trigger => trigger.addEventListener('mouseleave', handleLeave));


  function handleEnter() {
    this.classList.add('trigger-enter');
    setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 150);
    background.classList.add('open');

    let dropdown = this.querySelector('.dropdown'),
        dropdownCoords = dropdown.getBoundingClientRect(),
        height = dropdownCoords.height,
        width = dropdownCoords.width;

    background.style.setProperty('width', `${width}px`);
    background.style.setProperty('height', `${height}px`);

    let navCoords = nav.getBoundingClientRect(),
        top = dropdownCoords.top - navCoords.top, // y
        left = dropdownCoords.left - navCoords.left; // x
        console.log(top, left)
        background.style.setProperty('transform', `translate(${left}px, ${top}px)`)

  };


  function handleLeave() {
    this.classList.remove('trigger-enter', 'trigger-enter-active');
    background.classList.remove('open');
  };

})
