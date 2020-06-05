let checkboxes, lastChecked;

function handleCheck(e) {
  // when clicked check if shift key is pressed and the checkbox is checked
  if (e.shiftKey) {
    let firstIndex = Array.from(checkboxes).indexOf(lastChecked);
    let lastIndex = Array.from(checkboxes).indexOf(this);

    if (firstIndex <= lastIndex) { // clicking is from up to down
      for(let i = firstIndex += 1; i < lastIndex; i += 1) {
        checkboxes[i].checked = true;
      }
    } else {
      for(let i = lastIndex; i <= firstIndex; i += 1) {
        checkboxes[i].checked = false;
      }
    }

    console.log(firstIndex, lastIndex)
  }

  lastChecked = this;
}

document.addEventListener('DOMContentLoaded', function() {
  checkboxes = document.querySelectorAll('.inbox input[type=checkbox]');
  checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck))

  console.log(checkboxes)
})
