let player,
    video,
    progress,
    progressBar,
    toggle,
    skipButtons,
    ranges;

function togglePlay() {
  if (video.paused) video.play();
  else video.pause();
};

function updateButton() {
  let icon = this.paused ? '►' : '❚❚';
  toggle.textContent = icon;
};

function skip() {
  video.currentTime += parseFloat(this.dataset['skip']);
};

function handleRangeUpdate() {
  video[this.name] = this.value; // handle both volume and play rate
};


function handleProgress() {
  let percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
};

function scrub(e) {
  let scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
};


document.addEventListener('DOMContentLoaded', function() {
  player = document.querySelector('.player'),
  video = player.querySelector('.viewer'),
  progress = player.querySelector('.progress'),
  progressBar = player.querySelector('.progress__filled'),
  toggle = player.querySelector('.toggle'),
  skipButtons = player.querySelectorAll('[data-skip]'),
  ranges = player.querySelectorAll('.player__slider');

  video.addEventListener('click', togglePlay);
  toggle.addEventListener('click', togglePlay);

  video.addEventListener('play', updateButton);
  video.addEventListener('pause', updateButton);

  skipButtons.forEach(button => button.addEventListener('click', skip));

  ranges.forEach(range => range.addEventListener('input', handleRangeUpdate));

  video.addEventListener('timeupdate', handleProgress);

  progress.addEventListener('click', scrub);

  let mousedown = false;
  progress.addEventListener('mousemove', (e) => {if (mousedown) scrub(e)});
  progress.addEventListener('mousedown', () => mousedown = true);
  progress.addEventListener('mouseup', () => mousedown = false);
})
