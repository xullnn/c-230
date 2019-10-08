function walk(node, callback) {
  callback(node);
  for(let i = 0; i < node.childNodes.length; i += 1) {
    walk(node.childNodes[i], callback)
  }
}

function getElementsByTagName(tag) {
  var find = [];
  walk(document.body, function(node) {
    if (node.nodeName.trim()[0].match(RegExp(tag, 'i'))) {
      find.push(node);
    }
  })

  return find;
}

//

document.getElementsByTagName('p')

var intro;

walk(document, function(node) {
  if (node.class === 'intro') {
    intro = node;
    return;
  }
})


//

document.getElementsByClassName('intro')[0].getElementsByTagName('p')[0];
