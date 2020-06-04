document.addEventListener('DOMContentLoaded', function() {
  let secondHand = document.querySelector('.second-hand'),
      minuteHand = document.querySelector('.min-hand'),
      hourHand = document.querySelector('.hour-hand');

  function setDate() {
    let now = new Date(),
        seconds = now.getSeconds(),
        mins = now.getMinutes(),
        hours = now.getHours();

    let secondsDegrees = ((seconds / 60) * 360) + 90,
        minsDegrees = ((mins + seconds / 60) / 60 * 360) + 90,
        hoursDegrees = ((hours + mins / 60) / 12) * 360 + 90;

    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minsDegrees}deg)`;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
  };

  // setInterval(setDate, 1000);
})
