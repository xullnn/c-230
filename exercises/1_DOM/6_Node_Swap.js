// a valid swap should:
//   both exist on DOM tree
//   has 2 unique ids
//   be at the same level on the DOM tree
//     means should not have relationship like parent or child
//
// to let a swap happen
//   get a, b elements by variables
//   create a placeholder element `document.createElement(tagName)` p
//   replace a with p
//   replace b with a
//   replace p with b
//
//

// check for both existence
// find a's all siblings
// check if b is one of a's siblings
// swap them

function nodeSwap(a, b) {
  let first = document.getElementById(String(a));
  let second = document.getElementById(String(b));

  if (!first || !second) return undefined; // defend clause

  let siblings = Array.from(first.parentNode.children);

  if (!siblings.includes(second)) return undefined; // defend clause

  let placeholder = document.createElement('p');
  let parent = first.parentNode;

  parent.replaceChild(placeholder, first);
  parent.replaceChild(first, second);
  parent.replaceChild(second, placeholder);

  return true;
};

console.log(nodeSwap(1, 20));
console.log(nodeSwap(1, 4));
console.log(nodeSwap(9, 3));

console.log(nodeSwap(1, 2));
console.log(nodeSwap(2, 3));

// test for event listener

// add a onclick event listener to all elements which will change an element's color to red and back to transparent

function clickRed(event) {

}
