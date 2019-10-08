var firstWords = [];

walk(document, function(node) {
  if(node.nodeName === 'P') {
    firstWords.push(node.textContent.trim().split(' ')[0]);
  }
})

console.log(firstWords);

//

var firstP = document.querySelector('p')

walk(document, function(node) {
  if(node.nodeName === 'P') {
    if (node !== firstP) {
      node.classList.add('stanza')
    }
  }
})

//
var countPNG = 0;

walk(document, function(node) {
  if (node.nodeName === 'IMG') {
    if (node.getAttribute('src').trim().match(/\.png/i)) {
      countPNG += 1;
    }
  }
})

countPNG;

//

walk(document, function(node) {
  if (node.nodeName === 'A') {
    node.style.color = 'red';
  }
})
