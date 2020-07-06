// console.log('test');

document.addEventListener('DOMContentLoaded', function() {
  function domTreeTracer(id) {
    let current = document.querySelector(`[id='${id}']`);
    let result = [];

    while (current.parentElement && Number(current.getAttribute('id')) >= 1) {
      result.push(Array.from(current.parentElement.children).map(child => child.tagName))
      current = current.parentElement;
    }

    console.log(result);
  }

  domTreeTracer(22);
})
