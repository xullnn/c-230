var request = new XMLHttpRequest();
request.open('GET', 'htps://api.github.com/repos/rails/rails');

request.addEventListener('load', function() {
  var data = JSON.parse(request.response);
  console.log(request.status);
  console.log(data.open_issues);
})

request.addEventListener('error', function() {
  console.log('This request could not be completed!');
})

request.send();


// title: 'Eloquent JavaScript', author: 'Marijn Haverbeke'
// 'title=Eloquent+JavaScript&author=Marijn+Haverbeke'
