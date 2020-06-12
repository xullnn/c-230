document.addEventListener('DOMContentLoaded', function() {
  let speed = document.querySelector('.speed'),
      bar = speed.querySelector('.speed-bar'),
      video = document.querySelector('video');

  const min = 0.4,
        max = 4;

  speed.addEventListener('mousemove', handleMove);

  function handleMove(e) {
    let y = e.pageY - this.offsetTop,
        percent = y / this.offsetHeight,
        height = Math.round(percent * 100) + '%'
        bar.style.height = height;

    const playbackRate = percent * (max - min) + min;
    bar.textContent = playbackRate.toFixed(2) + 'x';
    video.playbackRate = playbackRate;
  }

})
