document.addEventListener('DOMContentLoaded', function() {
  function nodeSwap(a, b) {
    let first = document.querySelector(`[id="${a}"]`),
        second = document.querySelector(`[id="${b}"]`);
    // check validity
    if ((!first || !second)
       || first.querySelector(`[id="${b}"]`)
       || second.querySelector(`[id="${a}"]`)) {
          return undefined;
    } else {   // swap logic
      let placeHolder = document.createElement('div');
      first.replaceWith(placeHolder);
      second.replaceWith(first);
      placeHolder.replaceWith(second);
    }
  };


  // console.log(nodeSwap(1, 20));
  // console.log(nodeSwap(1, 4));
  // console.log(nodeSwap(9, 3));

  // console.log(nodeSwap(1, 2));
  console.log(nodeSwap(2, 3));

})
