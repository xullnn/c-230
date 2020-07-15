// document.querySelector('html').addEventListener('click', function() {
//   document.querySelector('#container').style = 'display: none';
// }, true);
//
// document.querySelector('#container').addEventListener('click', function(event) {
//   this.style = 'display: block';
// });


// if we click on '#container' or its children, the click events will be stopped at the capturing phase
//   - so no click event will be triggered at the bubbling phase
// if we click on anywhere other than the '#container'
//   - event will not be stopped dispatching, and it can be triggered appropriately

let container = document.querySelector('#container')

document.querySelector('html').addEventListener('click', (e) => {
  if (!container.contains(e.target)) container.style = 'display: none';
});
