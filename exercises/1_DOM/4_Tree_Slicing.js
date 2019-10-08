// from inner to out

function sliceTree(a, b) {
  let startElement = document.getElementById(String(a));
  let endElement = document.getElementById(String(b));
  if (!startElement || !endElement) return undefined;

  let result = [];
  for(let current = endElement; ; current = current.parentElement) {
    result.unshift(current.tagName);
    if (Number(current.id) === a) return result;
    if (current.parentElement.tagName === 'BODY') return undefined;
  };
};

console.log(sliceTree(1, 4));
console.log(sliceTree(1, 76));
console.log(sliceTree(2, 5));
console.log(sliceTree(5, 4));
console.log(sliceTree(1, 23));
console.log(sliceTree(1, 22));
console.log(sliceTree(11, 19));
