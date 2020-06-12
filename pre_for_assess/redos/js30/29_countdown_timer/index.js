document.addEventListener('DOMContentLoaded', function() {
  const timerDisplay = document.querySelector('.display__time-left'),
        endTime = document.querySelector('.display__end-time'),
        buttons = document.querySelectorAll('[data-time]');

  let countdown;

  function timer(seconds) {
    clearInterval(countdown);

    let now = Date.now();

    let then = now + (seconds * 1000);
    displayTimeLeft(seconds);

    countdown = setInterval(() => {
      let secondsLeft = Math.round((then - Date.now()) / 1000);

      if (secondsLeft < 0) clearInterval(countdown);
      else displayTimeLeft(secondsLeft);
      // else  console.log(secondsLeft)
    }, 1000)

    displayEndTime(then);
  };

  function displayTimeLeft(seconds) {
    let minutes = Math.floor(seconds / 60),
        remainderSeconds = seconds % 60,
        display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
        document.title = display;
        timerDisplay.textContent = display;
  };

  function displayEndTime(timestamp) {
    let end = new Date(timestamp),
        hour = end.getHours(),
        adjustedHour = hour > 12 ? hour - 12 : hour,
        minutes = end.getMinutes(),
        adjustedMinutes = `${minutes < 10 ? '0' : ''}${minutes}`;

        endTime.textContent = `Be back at ${adjustedHour}:${adjustedMinutes}`;
  };

  function startTimer() {
    let seconds = parseInt(this.dataset.time);
    timer(seconds);
  }

  buttons.forEach(button => button.addEventListener('click', startTimer));

  document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
  })



})
