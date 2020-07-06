document.addEventListener('DOMContentLoaded', function() {

  // function nodesToArr(node) {
  //   if (!node) return [];
  //   let arr = [node.tagName];
  //   arr[1] = Array.from(node.children).map(child => nodesToArr(child));
  //   return arr;
  // }

  function nodesToArr(node) {
    return [node.tagName, [...node.children].map(nodesToArr)]
  }

  console.log(nodesToArr(document.body))
})
