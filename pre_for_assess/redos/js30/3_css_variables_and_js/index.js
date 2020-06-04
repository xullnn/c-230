document.addEventListener('DOMContentLoaded', function() {
  let inputs = document.querySelectorAll('.controls input')

  inputs.forEach(input => input.addEventListener('input', handleUpdate))

  function handleUpdate() {
    let suffix = this.dataset.sizing || '';
    document.querySelector('img').style.setProperty(`--${this.name}`, this.value + suffix);
    // document.body.style.setProperty(`--${this.name}`, this.value + suffix);
    // this also works cause the variable lookup path seems following a scope-lookup-like style
  }
})
