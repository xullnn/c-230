function walk(node, callback) {
  callback(node);
  for(let i = 0; i < node.childNodes.length; i += 1) {
    walk(node.childNodes[i], callback)
  }
};

var count = 0;
walk(document, function(node) {
  count += 1;
})

console.log(count);
