document.addEventListener('DOMContentLoaded', function() {
  let items = Array.from(document.querySelectorAll('.videos li'));
  let times = items.map(item => { return item.dataset.time});
  let seconds = times.map(time => {
    [min, sec] = time.split(':').map(parseFloat);
    return min * 60 + sec
  })
  let totalSec = seconds.reduce((sum, time) => sum + time);

  let secs = totalSec % 60,
      totalMin = (totalSec - secs) / 60,
      mins = totalMin % 60,
      hours = (totalMin - mins) / 60;

  console.log(hours + ':' + mins + ':' + secs);
})
