var figureTemStr = $("script[type='text/handlebar-template']").html();
var fTemp = Handlebars.compile(figureTemStr);
var timeoutId;

image_paths.forEach(path => {
  $('main').append(fTemp(path));
});

function enter(event) {
  var $figcaption = $(event.currentTarget.nextElementSibling);
  timeoutId = setTimeout(function() { $figcaption.fadeIn() }, 1000);
};

function leave(event) {
  var $figcaption = $(event.currentTarget.nextElementSibling);
  clearTimeout(timeoutId);
  $('img').stop();
  $figcaption.fadeOut();
};

$('img').hover(enter, leave);
