function walk(node, callback) {
  callback(node);
  for(let i = 0; i < node.childNodes.length; i += 1) {
    walk(node.childNodes[i], callback)
  }
};

var start = document.querySelector("[id = '1']");

var countParents = 0;

walk(start, function(node) {
  if (node.childNodes.length > 0) {
    countParents += 1;
  }
});

console.log(countParents);

var countChildren = 0;

walk(start, function(node) {
  if (node.parentNode && node.id !== '1') {
    countChildren += 1;
  }
});

console.log(countChildren);

// direct and indirect child nodes
// direct childNodes: startNode.childNodes
// indirect childNodes: walk and count all childNodes, minus direct ones

function walk(node, callback) {
  callback(node);
  for(let i = 0; i < node.childNodes.length; i += 1) {
    walk(node.childNodes[i], callback)
  }
};

function childNodes(id) {
  let start = document.querySelector(`[id = '${id}']`);
  let total = 0;
  walk(start, node => {if (node) total += 1});
  let direct = start.childNodes.length;
  let indirect = total - 1 - direct;
  return [direct, indirect]
}

console.log(childNodes(1));
console.log(childNodes(4));
console.log(childNodes(9));
