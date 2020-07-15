var str = 'first_name=Lee&last_name=House&email=290016537%40qq.com&password=12345Fd3&phone=&card_number=1234&card_number=5678&card_number=1234&card_number=5678'

var pairs = str.split('&');
var card_numbers = pairs.splice(-4, 4);
var full_number = card_numbers.map(pairStr => {
  return pairStr.match(/\d+$/).toString();
}).join('');
