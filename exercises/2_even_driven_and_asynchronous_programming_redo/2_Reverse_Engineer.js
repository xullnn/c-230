// document.querySelector('html').addEventListener('click', function() {
//   document.querySelector('#container').style = 'display: none';
// }, true);
//
// document.querySelector('#container').addEventListener('click', function(event) {
//   this.style = 'display: block';
// });


document.querySelector('html').addEventListener('click', function() {
  var container = document.querySelector('#container');

  if (!container.contains(event.target)) {
    container.style = 'display: none';
  }
});
