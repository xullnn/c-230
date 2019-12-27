var Clock = (function() {
  var clockId;
  var elapsedMilliseconds = 0;
  var baseTime = 0;
  var portions = {
    hours: 0,
    minutes: 0,
    seconds: 0,
    centiseconds: 0,
  };

  function divmod(number, factor) { // returns two-item array
    return [Math.floor((number / factor)), (number % factor)];
  }

  function updateTimePortions(milliseconds) {
    var remainder, hours, minutes, seconds, centiseconds;
    [hours, remainder] = divmod(milliseconds, 3600000);
    [minutes, remainder] = divmod(remainder, 60000);
    [seconds, remainder] = divmod(remainder, 1000);
    [centiseconds, remainder] = divmod(remainder, 10);
    portions.hours = hours;
    portions.minutes = minutes;
    portions.seconds = seconds;
    portions.centiseconds = centiseconds;
  };

  function handleStart(event) {
    event.preventDefault();
    var start = Date.now()
    clockId = setInterval(function(){
      elapsedMilliseconds = baseTime + (Date.now() - start);
      updateTimePortions(elapsedMilliseconds);
      renderClock();
    }, 10);

    $('#start').attr('id', 'stop').text('Stop');
    $('#stop').on('click', handleStop).off('click', handleStart);
  };

  function paddingWithZero(number) {
    if (number < 10) return '0' + number;
    return String(number);
  };

  function renderClock() {
    for(let portion in portions) {
      $('#' + portion).text(paddingWithZero(portions[portion]));
    };
  };

  function handleStop(event) {
      event.preventDefault();
      baseTime += elapsedMilliseconds;
      clearInterval(clockId);
      renderClock();

      $('#stop').attr('id', 'start').text('Start');
      $('#start').on('click', handleStart).off('click', handleStop);
  };

  function handleReset(event) {
    event.preventDefault();
    clearInterval(clockId);
    baseTime = 0;
    elapsedMilliseconds = 0;
    updateTimePortions(elapsedMilliseconds);
    renderClock();
  };

  function bindEvents() {
    $('#start').on('click', handleStart);
    $('#reset').on('click', handleReset);
  };

  return {
    init: function() {
      this.portions = portions;
      bindEvents();
    },
  };

})();

Clock.init()
