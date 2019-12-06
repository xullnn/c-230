var request = new XMLHttpRequest();
request.open('POST', 'https://ls-230-web-store-demo.herokuapp.com/v1/products');
request.setRequestHeader('Content-Type', 'application/json');
request.setRequestHeader('Authorization', 'token AUTH_TOKEN');

var data = {
  name: 'New json product',
  sku: 'abcdedf',
  price: 999,
};

var jsonData = JSON.stringify(data);

request.addEventListener('load', function() {
  alert(request.response);
});

request.send(jsonData);
