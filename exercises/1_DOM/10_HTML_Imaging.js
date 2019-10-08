var node1 = document.createElement('header'); // create <header></header>
var node2 = document.createTextNode('Dynamic Content'); // create text node with content

node1.innerHTML = '<p>Hello World!</p>'; // header becomes <header><p>Hello World!</p></header>
document.body.appendChild(node1); // append header into body
document.body.firstElementChild.insertBefore(node2, node1.firstElementChild);

var node3 = document.createElement('h1'); // <h1></h1>
node3.appendChild(node2); // <h1>Dynamic Content</h1> (same reference)
document.body.firstElementChild.insertBefore(node3, node1.firstElementChild);

node1.setAttribute('id', 'header');
node3.classList.add('emphasis');
node3.classList.add('light');

var node4 = document.createElement('style'); // <style></style>
var css1 = ".emphasis { font-weight: bold; }";
var css2 = ".light { color: gray; }";
node4.type = 'text/css';

node4.appendChild(document.createTextNode(css1));
node4.appendChild(document.createTextNode(css2));

// <style>
//   .emphasis { font-weight: bold; }
//   .light { color: gray; }
// </style>

document.head.appendChild(node4);
