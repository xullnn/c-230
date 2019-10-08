var h2s = document.querySelectorAll('h2');
var counts = [];
for(let i = 0; i < h2s.length; i += 1) {
  counts.push(h2s[i].textContent.trim().split(' ').length)
}

console.log(counts);

//

document.querySelector('#toc');
document.querySelector('.toc');
document.querySelector('.toc, #toc');

document.body.getElementById('toc');
document.body.getElementByClassName('toc')

//

function walk(node, callback) {
  callback(node);

  for(let i = 0; i < node.childNodes.length; i += 1) {
    walk(node.childNodes[i], callback);
  }
}

var container = document.getElementById('toc');
walk(container, function(node) {
  if (node.nodeName === 'A') {
    node.style.color = 'red';
  }
})


var anchors = document.querySelectorAll('.toc a');

for(let i = 0; i < anchors.length; i += 1) {
  if (i % 2 !== 0) {
    anchors[i].style.color = 'green';
  }
}

var captions = document.querySelectorAll('.thumbcaption');
var texts = Array.from(captions).map(node => node.textContent.trim());

//

var ranks = ['Kindom', 'Phylum', 'Class', 'Order', 'Family', 'Genus', 'Species']
var trs = document.querySelectorAll('tbody tr');
var classification = {};
var regex = RegExp(ranks.join('|'));

let key;
let value;

for(let i = 0; i < trs.length; i += 1) {
  key = trs[i].firstElementChild.textContent.trim();
  if (regex.test(key)) {
    classification[key] = trs[i].lastElementChild.textContent.trim();
  }
}


classification;

//


function walk(node, callback) {
  callback(node);

  for(let i = 0; i < node.childNodes.length; i += 1) {
    walk(node.childNodes[i], callback);
  }
}

var lis = document.querySelectorAll('.toc a');

for(let i = 0; i < lis.length; i += 1) {
  if (i % 2 === 0) {
    Array.from(lis[i].querySelectorAll('span')).forEach(s => s.style.color = 'red');
  }
}

//

var caps = document.querySelectorAll('.thumbcaption');
Array.from(caps).map(cp => cp.textContent.trim())

//

// - iterate each tr
//   - if the tr's textContent matchs one of the word (firstElementChild)
//     - value is the lastElementChild's textContent
//   - write in the object


var ranks = ['Kindom:', 'Phylum:', 'Class:', 'Order:', 'Family:', 'Genus:', 'Species:'];
var trs = document.querySelectorAll('tr');
var obj = {};

var key;
var value;
Array.from(trs).forEach(tr => {
  key = tr.firstElementChild.textContent.trim();
  console.log(key);
  if (ranks.includes(key)) {
    value = tr.lastElementChild.textContent.trim();
    obj[key] = value;
  }
});

obj;
