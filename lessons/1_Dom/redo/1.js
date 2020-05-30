// recursively walk through nodes

function walk(node, callback) {
  callback(node);
  for(let i = 0; i < node.childNodes.length; i += 1) {
    walk(node.childNodes[i], callback);
  }
}


let n = document.querySelector('p');
let f = function(node) {
  console.log(node);
};

walk(n, f);
