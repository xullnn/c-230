let count = 0;

function walk(node) {
  count += 1;
  let children = node.childNodes;
  if (children.length > 0) {
    children.forEach(child => {
      walk(child)
    })
  }
}

walk(document.body)

console.log(count)
