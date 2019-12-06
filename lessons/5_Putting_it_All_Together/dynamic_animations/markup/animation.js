$canvas = $('#canvas');

function createShape(name, start_x, start_y, end_x, end_y) {
  var img = new Image(50, 50);
  img.src = url;
  $(img).attr({
    start_x: start_x,
    start_y: start_y,
    end_x: end_x,
    end_y: end_y,
  });

  return img;
};

function initializeShape(element) {

}

// how to preserve data with an img element
// the animation is not in back and forth pattern
  // every time it starts from the orignal set location anew

$("form").on('submit', function(event) {
  event.preventDefault();
  // serializeArray
  var start_x = $("input[name='start_x']").val(); // string
  var start_y = $("input[name='start_y']").val();
  var end_x = $("input[name='end_x']").val();
  var end_y = $("input[name='end_y']").val();

  var star = createShape('images/star.png', start_x, start_y, end_x, end_y);
  console.log(star);
  $canvas.append(star);
});


$('#animate').on('click', function(event) {
  event.preventDefault();

  $('img').each(function(i, image) {
    $(image).css({
      // new inline styles have to be passed with Number value
      'position': 'absoluate',
      'left': +$(image).attr('start_x'),
      'top': +$(image).attr('start_y'),

    });

    $(image).animate({
      left: $(image).attr('end_x'),
      top: $(image).attr('end_y')
    }, 2000)

  })
});

$('#stop').on('click', function(event) {
  event.preventDefault();
  $('img').stop();
})
