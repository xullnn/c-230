// What about modulo?

// centiseconds % 59, maybe divmodulo?

var clock = {
  incrementCentiseconds: function() {
    var interval = 0;
    while(true) {
      setTimeout((function() {
        this.centiseconds += 1;
      }).bind(this), interval += 10);
    };
  },

  renderClock: function() {

  },

  run: function() {
    this.incrementCentiseconds();
  },

  stop: function() {

  },

  continue: function() {

  },

  reset: function() {

  },

  init: function() {

    this.count = 0;
    this.state = 'run';
    this.hours = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.centiseconds = 0;

    return this;
  },
}

clock.init().run();
