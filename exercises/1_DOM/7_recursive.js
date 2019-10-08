// [tagName, [[child1, []], [child2, []]]
//
// every element has an array as its shell, inside this shell
//   first element is the tagName
//   second element is an array(shell again) which contains possible childrends
// the same pattern continues

// only arrays can be mutated

function walk(node, callback) {
  callback(node);
  for(let i = 0; i < node.children.length; i += 1) {
    walk(node.children[i], callback);
  }
};

function nodesToArr() {
  var exShell = [] // outmost shell, shell for body element
  var current = document.body;

  (function engine(currentEle, currentShell) {
    currentShell[0] = currentEle.tagName;
    if (currentEle.children) {
      currentShell[1] = Array.from(currentEle.children).map((child) => {
        [engine(child, [])];
      })
    } else {
      currentShell[1] = [];
    }
  })(current, exShell)

  return exShell;
};

nodesToArr();


// -----------------------------------------------------------------------------


function nodesToArr() {
  var originShell = [document.body];

  function engine(currentShell) {
    currentShell[1] = Array.from(currentShell[0].children || []);
    currentShell[0] = currentShell[0].tagName;

    if (currentShell[1].length > 0) {
      currentShell[1] = currentShell[1].map((child) => {
        return engine([child]);
      })
    }
    
    return currentShell;
  };

  engine(originShell);
  return originShell;
};

nodesToArr()
