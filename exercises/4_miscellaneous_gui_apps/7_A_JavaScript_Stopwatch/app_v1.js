const timeUnits = {
  hours: 3600000,
  minutes: 60000,
  seconds: 1000,
  centiseconds: 10,
};

var Clock = (function() {
  var clockId,
      baseTime = 0;
      elapsedMilliseconds = 0;
      portions = {};

  function divmod(number, factor) { // returns two-item array
    return [Math.floor((number / factor)), (number % factor)];
  };

  function updateTimePortions(milliseconds) {
    var remainder = milliseconds,
        result;
    for(let aspect in timeUnits) {
      result = divmod(remainder, timeUnits[aspect])
      portions[aspect] = result[0];
      remainder = result[1];
    };
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

  function handleStart() {
    var start = Date.now();
    clockId = setInterval(function(){
      elapsedMilliseconds = baseTime + (Date.now() - start);
      updateTimePortions(elapsedMilliseconds);
      renderClock();
    }, 10);

    embedStopButton();
  };

  function handleStop() {
    baseTime += elapsedMilliseconds;
    clearInterval(clockId);
    renderClock();
    embedStartButton();
  };

  function handleReset() {
    baseTime = 0;
    clearInterval(clockId);
    resetClock();
    embedStartButton();
  };

  function bindEvents() {
    $('#start_and_stop').on('click', handleStart);
    $('#reset').on('click', handleReset);
  };

  function resetClock() {
    elapsedMilliseconds = 0;
    updateTimePortions(0);
    renderClock();
  };

  function embedStartButton() {
    $('#start_and_stop').off('click').text('Start').on('click', handleStart);
  };

  function embedStopButton() {
    $('#start_and_stop').off('click').text('Stop').on('click', handleStop);
  };

  return {
    init: function() {
      resetClock();
      bindEvents();
    },
  };

})();

Clock.init()
