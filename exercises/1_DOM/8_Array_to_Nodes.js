// 1

var nodes = ["BODY",[["HEADER",[]],["MAIN",[]],["FOOTER",[]]]];

// 2

var nodes = ["BODY",[["DIV",[["DIV",[]],["DIV",[["DIV",[]]]]]],["DIV",[]],["DIV",[["DIV",[]],["DIV",[]],["DIV",[]]]]]];


arrayToNodes(nodes);


// input: structured array
// output: element object

// filter string(tag) + flat(2) recursively
// original state

[ 'BODY',
  [ 'DIV', [ [Array], [Array] ] ],
  [ 'DIV', [] ],
  [ 'DIV', [ [Array], [Array], [Array] ]   ] ]

// round 1

// nodes.filter(e => typeof e !== 'string').flat(2);
[ 'DIV',
  [ [ 'DIV', [] ], [ 'DIV', [Array] ] ],
  'DIV',
  [],
  'DIV',
  [ [ 'DIV', [] ], [ 'DIV', [] ], [ 'DIV', [] ] ] ]

// round 2

// nodes.filter(e => typeof e !== 'string').flat(2).filter(e => typeof e !== 'string').flat(2);
[ 'DIV', [], 'DIV', [ [ 'DIV', [] ] ], 'DIV', [], 'DIV', [], 'DIV', [] ]

// round 3

// nodes.filter(e => typeof e !== 'string').flat(2).filter(e => typeof e !== 'string').flat(2).filter(e => typeof e !== 'string').flat(2);
[ 'DIV', [] ]


// ----------------------------------------

// every array is an element corresponding to 1 tag string

// create -> transform -> insert ->

function arrayToNodes(nodes) {
  var body = document.createElement(nodes[0]);
  var childNodes = nodes[1];

  function processor(nodesArr, parentNode) {
    let nextChild = document.createElement(nodesArr[0]);
    parentNode.insertAdjacentElement('beforeend', nextChild)
    if (nodesArr[1].length === 0) {
      return;
    } else {
      nodesArr[1].forEach(arr => {
        processor(arr, nextChild)
      })
    }
  }

  childNodes.forEach(e => { processor(e, body) });

  return body;
};

var nodes = ['BODY',[['HEADER',[]],['MAIN',[]],['FOOTER',[]]]];

arrayToNodes(nodes)

//

var nodes = ["BODY",[["DIV",[["DIV",[]],["DIV",[["DIV",[]]]]]],["DIV",[]],["DIV",[["DIV",[]],["DIV",[]],["DIV",[]]]]]];
arrayToNodes(nodes)



//

function arrayToNodes(nodes) {
  let parent = document.createElement(nodes[0]);
  let children = nodes[1]; // nested array

  if (children.length === 0) {
    return parent;
  } else {
    children.forEach(element => { return parent.append(arrayToNodes(element))} )
  }

  return parent;
}

var nodes = ["BODY",[["DIV",[["DIV",[]],["DIV",[["DIV",[]]]]]],["DIV",[]],["DIV",[["DIV",[]],["DIV",[]],["DIV",[]]]]]];
arrayToNodes(nodes)
