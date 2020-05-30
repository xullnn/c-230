function Autocomplete(url, inputElement) {
  this.url = url;
  this.input = inputElement;
  this.listUI = null;
  this.overlay = null;

  this.wrapInput();
  this.createUI();
  this.valueChanged = debounce(this.valueChanged.bind(this), 300);
  this.bindEvents();

  this.reset();
};

Autocomplete.prototype.wrapInput = function() {
  var wrapper = document.createElement('div');
  wrapper.classList.add('autocomplete-wrapper');
  this.input.parentNode.appendChild(wrapper);
  wrapper.appendChild(this.input);
};

Autocomplete.prototype.createUI = function() {
    var listUI = document.createElement('ul');
    listUI.classList.add('autocomplete-ui');
    this.input.parentNode.appendChild(listUI);
    this.listUI = listUI;

    var overlay = document.createElement('div');
    overlay.classList.add('autocomplete-overlay');
    overlay.style.width = this.input.clientWidth + 'px';

    this.input.parentNode.appendChild(overlay);
    this.overlay = overlay;
};

Autocomplete.prototype.bindEvents = function() {
    this.input.addEventListener('input', this.valueChanged);
    this.input.addEventListener('keydown', this.handleKeydown.bind(this));
    this.listUI.addEventListener('click', this.handleClick.bind(this));
};

Autocomplete.prototype.handleClick = function(event) {
    let clicked = event.target;
    if (this.matches.length === 0 || clicked.tagName !== 'LI') return;

    let value = clicked.textContent.trim();
    this.input.value = value;
    this.reset();
};

Autocomplete.prototype.handleClick = function(event) {
    let clicked = event.target;
    if (this.matches.length === 0 || clicked.tagName !== 'LI') return;

    let value = clicked.textContent.trim();
    this.input.value = value;
    this.reset();
};

Autocomplete.prototype.valueChanged = function() { // hard bound with `Autocomplete` as execution context
    value = this.input.value;
    this.previousValue = value;

    if (value.length > 0) {
      this.fetchMatches(value, matches => {
        this.visible = true;
        this.matches = matches;
        this.bestMatchIndex = 0;
        this.selectedIndex = null;
        this.draw();
      });
    } else {
      this.reset();
    }
};


Autocomplete.prototype.fetchMatches = function(query, callback) {
    let request = new XMLHttpRequest();

    request.addEventListener('load', function() {
      callback(request.response);
    });

    request.open('GET', this.url + encodeURIComponent(query));
    request.responseType = 'json';
    request.send();
},

Autocomplete.prototype.draw = function() {
    while (this.listUI.lastChild) {
      this.listUI.removeChild(this.listUI.lastChild);
    }; //clear previous results

    if (!this.visible) {
      this.overlay.textContent = '';
      return;
    };

    if (this.bestMatchIndex !== null && this.matches.length !== 0) {
      let selected = this.matches[this.bestMatchIndex];
      this.overlay.textContent = this.generateOverlayContent(this.input.value, selected);
    } else {
      this.overlay.textContent = '';
    };

    this.matches.forEach((match, index) => {
      let li = document.createElement('li');
      li.classList.add('autocomplete-ui-choice');

      if (index === this.selectedIndex) {
        li.classList.add('selected');
        this.input.value = match.name;
      }

      li.textContent = match.name;
      this.listUI.appendChild(li);
    })
};


Autocomplete.prototype.generateOverlayContent = function(value, match) {
  let end = match.name.substr(value.length);
  return value + end;
};

Autocomplete.prototype.generateOverlayContent = function(value, match) {
  let end = match.name.substr(value.length);
  return value + end;
};

Autocomplete.prototype.generateOverlayContent = function(value, match) {
  let end = match.name.substr(value.length);
  return value + end;
};

Autocomplete.prototype.reset = function() {
  this.visible = false;
  this.matches = [];
  this.bestMatchIndex = null;
  this.selectedIndex = null;
  this.previousValue = null;

  this.draw();
};

Autocomplete.prototype.handleKeydown = function(event) {
    switch(event.key) {
      case 'ArrowDown':
        event.preventDefault();
        if (this.selectedIndex === null || this.selectedIndex === this.matches.length - 1) {
          this.selectedIndex = 0; // to the top
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
  };


document.addEventListener('DOMContentLoaded', function() {
  new Autocomplete('/countries?matching=', document.querySelector('input[name="country"]'));
});
