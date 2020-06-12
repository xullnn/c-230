document.addEventListener('DOMContentLoaded', function() {
  let slider = document.querySelector('.items'),
      isDown = false,
      startX,
      scrollLeft;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX;
    scrollLeft = slider.scrollLeft;
  })

  slider.addEventListener('mouseleave', () => {
    isDown = false;
  })


  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
  })

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();

    let x = e.pageX;
    console.log(startX, x)
    let walk = x - startX;
    slider.scrollLeft = scrollLeft - walk;

  })

})
