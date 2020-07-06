function walk(node, callback) {
  callback(node);
  if (node.childNodes.length > 0) {
    node.childNodes.forEach(child => walk(child, callback))
  }
};

let counts = {};

function countAllChildNodes(node) {
  let count = 0;
  walk(node, () => { count += 1 })
  return count - 1;
}

function observe(node) {
  if (node.hasAttribute && node.hasAttribute('id')) {
    let directChildNodesCount = node.childNodes.length;

    counts[node.getAttribute('id')] = {
      direct: directChildNodesCount,
      indirect: countAllChildNodes(node) - directChildNodesCount,
     };
  }
}

walk(document.body, observe)

console.log(counts)
