For each page there are:
  - 1 inventory order which holds
    - 1 requester information(name, address etc)
    - any number of items be included in the current order

General structure:
  - a global var `inventory` - object which
    - initialized by an IIFE
    - holds item collections
    - defines all functions
      - including an `init` method setting information except for item information

---

click "add item"
  - clone code in template
  - substitute all the `ID` in name areas

---

Redo version:

when page load
  - initialize the inventory object as a global variable
  - define methods
  - bind events

when click 'add item'
  - insert html
  - insert item into collection

when lose focus on inputs area
  - update certain item in collection with corresponding id
