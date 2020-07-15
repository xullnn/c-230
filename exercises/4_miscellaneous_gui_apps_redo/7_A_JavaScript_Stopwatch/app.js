let App = (function() {
  const timeReferences = {
          millisecondsPerH: 1000 * 60 * 60,
          millisecondsPerM: 1000 * 60,
          millisecondsPerS: 1000,
          millisecondsPerC: 10,
        }

  function divModulo(number, factor) {
    return [parseInt(number / factor), parseInt(number % factor)];
  };

  function parseMilliseconds(elapsedMilliseconds) {
    let result = [],
        val;
    for (let key in timeReferences) {
      [val, elapsedMilliseconds] = [...divModulo(elapsedMilliseconds, timeReferences[key])]
      result.push(val);
    }

    return result;
  };

  function handleStart(e) {
    $('#start').hide();
    $('#stop').show();
    timeBase = timeRecords.reduce((acc, r) => {return acc + r}, 0)
    startingTime = Date.now();
    watchID = setInterval(() => {
      currentTime  = Date.now();
      timeElapsed = currentTime - startingTime;
      renderTime(parseMilliseconds(timeBase + timeElapsed));
    }, 10)
  }

  function handleStop(e) {
    $('#stop').hide();
    $('#start').show();
    timeRecords.push(timeElapsed);
    clearInterval(watchID);
  }

  function handleReset(e) {
    clearInterval(watchID);
    $('#stop').hide();
    $('#start').show();
    reset();
    renderTime(parseMilliseconds(0))
  }

  function bindEvents() {
    $('#start').on('click', handleStart);
    $('#stop').on('click', handleStop);
    $('#reset').on('click', handleReset);
  };

  function renderTime(timePortions) {
    $('#time_portions span').each((i, span) => {
      span.textContent = timePortions[i]
    });
  };

  function reset() {
    timeElapsed = 0,
    timePortions = [],
    watchID = null,
    timeRecords = [],
    timeBase = 0;
  };

  return {
    init: function() {
      reset();
      bindEvents();
    }
  }
})();

App.init();
