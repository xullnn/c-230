// One way to find out indentation:
//   a.previousSibling.nodeValue.replace("\n", '').length;
//

// set body's first child element's indentation as base indentation value

// - walk thruogh all elements
//   - if current element's previousSibling node has the type of '#text'
//     - calculate its indentation
//       - color satisfied element

var baseIndentation = document.body.firstChild.nodeValue.replace(/.*\n/, '').length;

function indentationOf(node) {
  let pre = node.previousSibling;
  if (pre.nodeType === 3) {
    return ((pre.nodeValue.replace(/.*\n/, '').length - baseIndentation) / 2) + 1;
  }
};

function walkElements(node, callback) {
  callback(node);
  for(let i = 0; i < node.children.length; i += 1) {
    walkElements(node.children[i], callback);
  };
};

function colorGeneration(n) {
  walkElements(document.body, function(e) {
    if (indentationOf(e) === n) e.classList.add('generation-color');
  });
};

// test cases

colorGeneration(1);
colorGeneration(4);
colorGeneration(7);
colorGeneration(8);
colorGeneration(3);
colorGeneration(0);


// counting level way

function colorGeneration(n) {
  let elements = Array.from(document.body.children);
  let currentLevel = 1;

  while(currentLevel < n) {
    elements = elements.flatMap(parent => Array.from(parent.children));
    currentLevel += 1;
  }

  elements.forEach(e => e.classList.add('generation-color'))
};
