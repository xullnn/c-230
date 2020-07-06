
document.addEventListener('DOMContentLoaded', function() {


  // var nodesArr = ['BODY',[['HEADER',[]],['MAIN',[]],['FOOTER',[]]]];
  var nodesArr = ["BODY",[["DIV",[["DIV",[]],["DIV",[["DIV",[]]]]]],["DIV",[]],["DIV",[["DIV",[]],["DIV",[]],["DIV",[]]]]]];


  function arrayToNodes(nodesArr) {
    let parent = document.createElement(nodesArr[0]);
    if (nodesArr[1].length === 0) return parent;

    nodesArr[1].forEach(childrenArr => {
      parent.appendChild(arrayToNodes(childrenArr))
    })


    return parent;
  }

  console.log(arrayToNodes(nodesArr))

})
