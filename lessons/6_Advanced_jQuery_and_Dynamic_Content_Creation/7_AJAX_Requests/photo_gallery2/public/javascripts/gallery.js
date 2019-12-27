  var photos;
  var comments;

  var templates = {};
  var fTemplates = {};

  function retrieveTemplates() {
    $('script[type="text/x-handlebars"]').each(function(_, temp) {
      templates[$(temp).attr('id')] = $(temp).html();
    })
  };

  function compileTemplates() {
    for (let key in templates) {
      fTemplates['f_' + key] = Handlebars.compile(templates[key]);
    };

    Handlebars.registerPartial('comment', templates['photo_comment']);
  };

  function renderPhotos() {
    $('#slides').html(fTemplates.f_photos({photos: photos}));
  };

  function renderPhotoInformation(id) {
    var photo = photos.find(p => p.id === id);
    $('section > header').html(fTemplates.f_photo_information(photo));
  };

  function nextPhoto($current) {
    if ($current.next().length !== 0) return $current.next();
    return $('#slides figure').eq(0);
  };

  function prevPhoto($current) {
    if ($current.prev().length !== 0) return $current.prev();
    return $('#slides figure').eq(-1);
  };

  function getCommentsFor(photo_id) {
    $.ajax({
      url: '/comments',
      data: 'photo_id=' + photo_id,
      success: function(comments_json) {
        // [{gravatar: 'fakePic.jpg', name: 'David', date: '2011-11-11', body: 'This is good.'}]
        comments = comments_json;
        $('#comments ul').html(fTemplates.f_photo_comments({comments: comments}))
      },
    });
  };

  // retrieve photos
  $.ajax({
    url: '/photos',
    // insert photo data
    success: function(json) {
      retrieveTemplates();
      compileTemplates();
      photos = json;
      renderPhotos();
      renderPhotoInformation(1);
      getCommentsFor(photos[0].id);
      bindEvents();
    }
  });

  function bindSlidePre() {
    $('a.prev').on('click', function(event) {
      event.preventDefault();
      var $current = $('#slideshow').find('figure:visible');
      var current_id = $current.data('id');
      var $prev = prevPhoto($current);
      var prevId = Number($prev.data('id'));

      $current.fadeOut(500);
      $prev.fadeIn(500);

      renderPhotoInformation(prevId);
      getCommentsFor(prevId);
    });
  };

function bindSlideNext() {
  $('a.next').on('click', function(event) {
    event.preventDefault();
    var $current = $('#slideshow').find('figure:visible');
    var current_id = $current.data('id');
    var $next = nextPhoto($current);
    var nextId = Number($next.data('id'));

    $current.fadeOut(500);
    $next.fadeIn(500);

    renderPhotoInformation(nextId);
    getCommentsFor(nextId);
  });
};

function bindLikeAndFavorite() {
  $('section > header').on('click', '.actions a', function(event) {
    event.preventDefault();

    var $button = $(this);
    var id = $button.data('id');
    var text = $button.text();

    $.ajax({
      url: $button.attr('href'),
      method: 'POST',
      data: 'photo_id=' + id,
      success: function(json) {
        $button.text(text.replace(/\d+/, String(json.total)));
      },
    });
  })
};

function updateIdField($form) {
  var id = $('figure:visible').data('id');
  $form.find('input[name="photo_id"]').val(id);
};

function binNewComment() {
  $form = $("form[action='/comments/new']");

  $form.on('submit', function(event) {
    event.preventDefault();
    updateIdField($form);
    var id = $form.find('input[name="photo_id"]').val();
    var data = $form.serialize();

    $.ajax({
      method: 'POST',
      url: '/comments/new',
      data: data,
      success: function(json) {
        $('#comments ul').append(fTemplates.f_photo_comment(json));
      }
    })
  })
};

function bindEvents() {
  bindSlidePre();
  bindSlideNext();
  bindLikeAndFavorite();
  binNewComment();
};


  // slide photos
