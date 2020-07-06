// from inner to out

// if the second is not included in the first return undefined
//   - first.querySelector(id of the second)


document.addEventListener('DOMContentLoaded', function() {
  function sliceTree(a, b) {
    let first = document.querySelector(`[id="${a}"]`),
        second = first.querySelector(`[id="${b}"]`);

    if (!second) return undefined;

    let result = [];
    while (second.id >= first.id) {
      result.unshift(second.tagName);
      second = second.parentElement;
    }

    return result;
  };


  console.log(sliceTree(1, 4));
  console.log(sliceTree(1, 76));
  console.log(sliceTree(2, 5));
  console.log(sliceTree(5, 4));
  console.log(sliceTree(1, 23));
  console.log(sliceTree(1, 22));
  console.log(sliceTree(11, 19));

})
