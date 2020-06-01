function throttler(callback, thresholdTime, contextObj) {
  return (() => {
    if (contextObj.timeoutID) { // update
      clearTimeout(contextObj.timeoutID);
      contextObj.timeoutID = setTimeout((() => { contextObj.timeoutID = null; callback()}), thresholdTime);
    } else if (contextObj.timeoutID === null) { // starting point / long hault
      contextObj.timeoutID = setTimeout(callback, thresholdTime);
    }
  })
}

// every time we actually send a XHR, we set id to null
// every time if id is null, we set a new timeout
// the way to add an addtional operation to a function is to wrap the callback and the new operation in to a function expression


let Autocomplete = {
  wrapInput: function() { // the input element that we'll build the autocomplete functionality around
    let $wrapper = $('<div></div>', { class: 'autocomplete-wrapper' });
    $(this.input).parent().append($wrapper);
    $wrapper.append(this.input);
  },

  createUI: function() { // create 2 siblings of the input element
    let $listUI = $('<ul></ul>', { class: 'autocomplete-ui' });
    $(this.input).parent().append($listUI)
    this.listUI = $listUI[0];

    let $overlay = $('<div></div>', { class: 'autocomplete-overlay' });
    $overlay.css({ width: $(this.input).innerWidth() + 'px' });
    $(this.input).parent().append($overlay);
    this.overlay = $overlay[0];
  },

  bindEvents: function() {
    let throttledCallback = throttler(this.valueChanged.bind(this), 2000, this);
    this.input.addEventListener('input', throttledCallback); // when we invoke the callback it's a standalone function
    this.input.addEventListener('keydown', this.handleKeydown.bind(this));
  },

  handleKeydown: function(event) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (this.selectedIndex === null || this.selectedIndex === this.matches.length - 1) {
          this.selectedIndex = 0;
        } else {
          this.selectedIndex += 1;
        }

        this.bestMatchIndex = null;
        this.draw();
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (this.selectedIndex === null || this.selectedIndex === 0) {
          this.selectedIndex = this.matches.length - 1;
        } else {
          this.selectedIndex -= 1;
        }
        this.bestMatchIndex = null;
        this.draw();
        break;
      case 'Tab':

        if (this.bestMatchIndex !== null && this.matches.length !== 0) {
          this.input.value = this.matches[this.bestMatchIndex].name;
          event.preventDefault();
        }
        this.reset();
        break;
      case 'Enter':
        this.reset();
        break;
      case 'Escape':
        this.input.value = this.previousValue;
        this.reset();
        break;
    }
  },

  valueChanged: function() {
    let value = this.input.value;
    this.previousValue = value;

    if (value.length > 0) { // if any input

      this.fetchMatches(value, function(matches) {
        this.visible = true; // a global state of the app instance
        this.matches = matches; // xhr.response // a global data of the app instance
        this.bestMatchIndex = 0;
        this.selectedIndex = null;
        this.draw();
      }.bind(this))
    } else {
      this.reset();
    };
  },

  fetchMatches: function(query, callback) {
    let request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000' + this.url + query)

    request.addEventListener('load', function() {
      callback(request.response);
    });

    request.responseType = 'json';
    request.send();
  },

  draw: function() {
    // clean work
    $(this.listUI).empty();
    if (!this.visible) $(this.overlay).empty();

    if (this.bestMatchIndex !== null && this.matches.length !== 0) {
      let selected = this.matches[this.bestMatchIndex];
      $(this.overlay).text(this.generateOverlayContent(this.input.value, selected));
    } else {
      $(this.overlay).empty();
    }

    this.matches.forEach(function(match, index) {
      let $li = $('<li></li>', { class: ' autocomplete-ui-choice'});

      if (index === this.selectedIndex) {
        $li.addClass('selected')
        this.input.value = match.name;
      }

      $li.text(match.name);
      $(this.listUI).append($li);
    }.bind(this));
  },

  generateOverlayContent: function(input, match) {
    let end = match.name.substr(input.length);
    return input + end;
  },

  reset: function() {
    this.visible = false;
    this.matches = [];

    this.draw();
  },

  init: function() { //
    this.input = $('input')[0];
    this.url = '/countries?matching=';

    this.listUI = null;
    this.overlay = null;

    this.visible = false;
    this.matches = [];
    this.bestMatchIndex = null;
    this.selectedIndex = null;
    this.timeoutID = null;

    this.wrapInput();
    this.createUI();
    this.bindEvents();
    this.reset();
  }
};


$(function() {
  Autocomplete.init();
});


// throttling

// if the time duration between the current 'valuechange' and the previous 'valuechange' >= 500 ms
//   send the XHR
// else restart time counting
