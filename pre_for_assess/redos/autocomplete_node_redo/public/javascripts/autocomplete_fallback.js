function debounce(callback, delay) {
  let id;

  return function() {
    if (id) {
      clearTimeout(id);
      id = setTimeout(callback, delay);
    } else {
      id = setTimeout(callback, delay);
    }
  }
}

const Autocomplete = {
  init: function() {
    this.debouncedValueChanged = debounce(this.valueChanged.bind(this), 1000);
    this.input = document.querySelector('input');
    this.url = "/countries?matching=";
    this.listUI = null; // for results list
    this.overlay = null; // for best match
    // this.bestMatchIndex = null; // in overlay
    // this.selectedIndex = null; // pinpoint the item by pressing up and down
    // this.visible = false; // hide originally(moved into reset)
    // this.matches = []; // set to empty at first(moved into reset)

    this.wrapInput();
    this.createUI();
    this.bindEvents();

    this.reset();
  },

  wrapInput: function() {
    let wrapper = document.createElement('div');
    wrapper.classList.add("autocomplete-wrapper");
    this.input.parentNode.appendChild(wrapper);
    wrapper.appendChild(this.input);
  },

  createUI: function() {
    let listUI = document.createElement('ul');
    listUI.classList.add('autocomplete-ui');
    this.input.parentNode.appendChild(listUI);
    this.listUI = listUI;

    let overlay = document.createElement('div');
    overlay.classList.add('autocomplete-overlay');
    overlay.style.width = `${this.input.clientWidth}px`

    this.input.parentNode.appendChild(overlay);
    this.overlay = overlay;
  },

  bindEvents: function() {
    this.input.addEventListener('input', this.debouncedValueChanged);
    this.input.addEventListener('keydown', this.handleKeydown.bind(this));
    this.listUI.addEventListener('click', this.handleClick.bind(this));
  },

  handleClick: function(event) {
    event.preventDefault();
    let target = event.target;
    if (target.tagName === 'LI') {
      this.input.value = target.textContent;
      this.reset();
    }
  },

  handleKeydown: function(event) {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (this.selectedIndex === null || this.selectedIndex === this.matches.length - 1) {
          this.selectedIndex = 0;
        } else {
          this.selectedIndex += 1;
        }
        this.bestMatchIndex = null;
        this.draw();
        break;

      case "ArrowUp":
        event.preventDefault();
        if (this.selectedIndex === 0 || this.selectedIndex === null ) {
          this.selectedIndex = this.matches.length - 1;
        } else {
          this.selectedIndex -= 1;
        }
        this.bestMatchIndex = null;
        this.draw();
        break;

      case 'Tab':
        event.preventDefault();
        if(this.bestMatchIndex !== null && this.matches.length > 0) {
          this.input.value = this.matches[this.bestMatchIndex].name;
        }
        this.reset();
        break;

      case 'Escape':
        this.input.value = this.previousValue;
        this.reset();
        this.input.dispatchEvent(new Event('input'));
        break;

      case 'Enter':
        this.input.value = this.previousValue;
        this.reset();
        break;

    }
  },

  valueChanged: function() {
    let value = this.input.value;
    this.previousValue = value;

    if (value.length > 0) {
      this.fetchMatches(value, matches => {
        this.visible = true; // appear to the page
        this.matches = matches; // update matches
        this.bestMatchIndex = 0;
        this.selectedIndex = null;
        this.draw(); // render results to page
      })
    } else {
      this.reset(); // clear the UIs
    }
  },

  fetchMatches: function(value, callback) {
    let request = new XMLHttpRequest();

    request.addEventListener('load', () => {
      callback(request.response);
    });

    request.open('GET', `${this.url}${encodeURIComponent(value)}`);
    request.responseType = 'json'; // suggest the server reponds with json format
    request.send(); // data are contained in query string
  },

  draw: function() {
    this.listUI.innerHTML = '';

    if (!this.visible) {
      this.overlay.textContent = '';
      return;
    }

    if (this.bestMatchIndex !== null && this.matches.length !== 0) {
      let selected = this.matches[this.bestMatchIndex];
      this.overlay.textContent = this.generateOverlayContent(this.input.value, selected);
    } else {
      this.overlay.textContent = '';
    }

    this.matches.forEach((match, index) => {
      let li = document.createElement('li');
      li.classList.add('autocomplete-ui-choice');

      if (index === this.selectedIndex) {
        li.classList.add("selected");
        this.input.value = match.name;
      }

      li.textContent = match.name;
      this.listUI.appendChild(li);
    })
  },

  generateOverlayContent: function(inputValue, match) {
    return inputValue + match.name.substr(inputValue.length);
  },

  reset: function() {
    this.visible = false;
    this.matches = [];
    this.bestMatchIndex = null; // in overlay
    this.selectedIndex = null; // pinpoint the item by pressing up and down
    this.previousValue = null;
    this.draw();
  },


}

document.addEventListener('DOMContentLoaded', () => {
  Autocomplete.init();
})
