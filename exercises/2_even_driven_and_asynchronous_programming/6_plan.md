// build two maps which reflect the relationship between classifications and animals
  // embed logic into data structure

```js
var cToA = {
  Vertebrate: ['Bear', 'Turtle', 'Whale', 'Salmon', 'Ostrich'],
  // ...
};

var aToC = {
  Bear: ['Vertebrate', 'Warm-blooded', 'Mammal'],
}
```

// 1
- when click
 - set "display none" to all unrelated options
 - set "display block" to all related options

// 2
collect all related options
clear the parent node (set innerHtml to '')
append the selected options one by one

// 2

query select all options into an array
detect what is clicked (find the 'key')
  use subarray in map to select related options
clear parent node
  append selected options one by one
