var Autocomplete = {
  wrapInput: function() {
    var wrapper = document.createElement('div');
    wrapper.classList.add('autocomplete-wrapper');
    this.input.parentNode.appendChild(wrapper);
    wrapper.appendChild(this.input); // replace the existed one
  },

  createUI: function() {
    var listUI = document.createElement('ul');
    listUI.classList.add('autocomplete-ui');
    this.input.parentNode.appendChild(listUI);
    this.listUI = listUI;

    var overlay = document.createElement('div');
    overlay.classList.add('autocomplete-overlay');
    overlay.style.width = this.input.clientWidth + 'px';

    this.input.parentNode.appendChild(overlay);
    this.overlay = overlay;
  },

  bindEvents: function() {
    this.input.addEventListener('input', this.valueChanged);
    this.input.addEventListener('keydown', this.handleKeydown.bind(this));
    this.listUI.addEventListener('mousedown', this.handleMouseDown.bind(this));
  },

  handleMouseDown: function(event) {
    event.preventDefault();

    var element = event.target;

    if (element.classList.contains('autocomplete-ui-choice')) {
      this.input.value = element.textContent;
      this.reset();
    }
  },

  handleKeydown: function(event) {
    switch(event.key) {
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
        this.input.value = this.previouseValue;
        this.reset();
        break;
    }
  },

  valueChanged: function() {
    var value = this.input.value; // grasp user input chars
    this.previouseValue = value;

    if (value.length > 0) {
      this.fetchMatches(value, function(matches) {
        this.visible = true;
        this.matches = matches;
        this.bestMatchIndex = 0;
        this.selectedIndex = null;
        this.draw();
      }.bind(this));
    } else {
      this.reset();
    }
  },

  fetchMatches: function(query, callback) {
    var request = new XMLHttpRequest();

    request.addEventListener('load', function() {
      callback(request.response);
    });

    request.open('GET', this.url + encodeURIComponent(query));
    request.responseType = 'json';
    request.send();
  },

  draw: function() {
    while (this.listUI.lastChild) {
      this.listUI.removeChild(this.listUI.lastChild);
    }

    if (!this.visible) {
      this.overlay.textContent = '';
      return;
    };

    if (this.bestMatchIndex !== null && this.matches.length !== 0) {
      var selected = this.matches[this.bestMatchIndex];
      this.overlay.textContent = this.generateOverlayContent(this.input.value, selected);
    } else {
      this.overlay.textContent = '';
    };

    this.matches.forEach(function(match, index) {
      var li = document.createElement('li');
      li.classList.add('autocomplete-ui-choice');

      if (index === this.selectedIndex) {
        li.classList.add('selected');
        this.input.value = match.name;
      }

      li.textContent = match.name;
      this.listUI.appendChild(li);
    }.bind(this));
  },

  generateOverlayContent: function(value, match) {
    var end = match.name.substr(value.length);
    return value + end;
  },

  reset: function() {
    this.visible = false;
    this.matches = [];
    this.bestMatchIndex = null;
    this.selectedIndex = null;
    this.previouseValue = null;

    this.draw(); // render html
  },

  init: function() {  // set states
    this.input = document.querySelector('input');
    this.url = '/countries?matching=';

    this.listUI = null;
    this.overlay = null;

    this.wrapInput();
    this.createUI();

    this.valueChanged = debounce(this.valueChanged.bind(this), 300);

    this.bindEvents();
    this.reset();
  },
};

document.addEventListener('DOMContentLoaded', function() {
  Autocomplete.init();
});
