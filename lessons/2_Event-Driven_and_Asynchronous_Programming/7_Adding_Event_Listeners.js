function displayAlert() {
  var message = document.getElementById('message');
  alert(message);
};

document.addEventListener('DOMContentLoaded', function() {
  var button = document.getElementById('alert');
  button.addEventListener('click', displayAlert);
});
