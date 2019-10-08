// itself and its siblings elements
// it's parent and its siblings elements
//
// both need a certain node's siblings elements

// - Node.parentElement
// - Node.previousSibling
// - NonDocumentTypeChildNode.nextElementSibling
// - NonDocumentTypeChildNode.previousElementSibling
//
// // approach 1
// find current node's siblings
// locate current nodes' parent element
//   find all siblings of it
//
// // approach 2
// find current element's parent node
//   find out all of its childNodes
//   filter out all non-element type nodes (toString())
// same approach to current node's parent's parent
//
// - find current node by id
//   - map to its parent node `parent`
//   - get `childNodes`, `filter` node.toString() match `'Element'`
//
//   - map to current node's `grandparent`
//   - get `childNodes`, `filter` node.toString() match `'Element'`

function domTreeTracer(id) {
  let currentSiblingElements;
  let result = [];

  for(let current = document.querySelector(`[id = '${id}']`); current.id >= 1; current = current.parentNode) {
    currentSiblingElements = Array.from(current.parentNode.childNodes).filter(node => node.constructor.name.match(/Element/));
    result.push(currentSiblingElements.map(e => e.nodeName));
  }

  return result;
};

console.log(domTreeTracer(22));

//

function domTreeTracer(id) {
  let currentSiblingElements;
  let origin = document.querySelector(`[id = '${id}']`);
  let result = [];

  for(let current = origin; current.id >= 1; current = current.parentNode) {
    currentSiblingElements = Array.from(current.parentNode.childNodes).filter(node => node.constructor.name.match(/Element/));
    result.push(currentSiblingElements.map(e => e.nodeName));
  }

  return result;
};

console.log(domTreeTracer(22));
