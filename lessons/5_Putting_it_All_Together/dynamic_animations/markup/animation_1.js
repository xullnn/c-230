var $canvas = $('#canvas'),
    $form = $('form');

function serializeData($form) {
  var arr = $form.serializeArray();
  var data = {};

  arr.forEach(obj => {
    data[obj.name] = obj.value
  });

  return data;
};

function resetPosition(element) {
  $(element).css({
    left: +$(element).data('start_x'),
    top: +$(element).data('start_y')
  })
};

function createShape() {
  var shape = $("input[name=shape_type]:checked").val();
  var $e = $(document.createElement('div'));
  var data = serializeData($form);
  $e.addClass(shape);
  $e.data(data);
  console.log($e);
  return $e;
};

$form.on('submit', function(event) {
  event.preventDefault();
  var $div = createShape();
  $canvas.append($div);
  resetPosition($div);
});

$('#animate').on('click', function(event) {
  event.preventDefault();
  $('#canvas > div').each(function(_, d) {
    $d = $(d);
    $d.stop();
    resetPosition(d);
    $d.animate({
      left: $d.data('end_x'),
      top: $d.data('end_y')
    }, 2000)
  })
});

$('#stop').on('click', function(event) {
  event.preventDefault();
  $('#canvas > div').stop();
})
