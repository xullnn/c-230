// get all the scripts for handlebars
  // compile them into handlebar functions

// fetch data from /photos
  // render it with handlebar functions



$(function() {

  let templates = {},
      photos,
      $photosContainer = $('#slides'),
      $photoInfor = $('section > header'),
      currentId,
      $form = $('form');

  $("script[type='text/x-handlebars']").each(function() {
    let $temp = $(this);
    let id = $temp.attr('id');
    if (id === 'photo_comment') {
      Handlebars.registerPartial(id, $temp.html())
    } else {
      templates[id] = Handlebars.compile($temp.html());
    };

  });

  let requestForPhotos = {
    url: 'http://localhost:3000/photos',
    dataType: 'json',
    method: 'GET',
  };

  function renderPhotos() {
    $photosContainer.append(templates.photos({photos: photos}));
  };

  function renderPhotoInformation(id) {
    $photoInfor.empty().append(templates.photo_information(photos.find(f => f.id === id)));
  };

  function renderPhotoComments(comments) {
    $('#comments ul').empty().append(templates.photo_comments({comments: comments}))
  };

  function renderCommentsFor() {
    $.ajax({
      url: 'http://localhost:3000/comments',
      data: 'photo_id='+ String(currentId)
    }).done(function(response) {
      let comments = response;
      renderPhotoComments(comments);
    });
  };

  function bindEventsToArrows() {
    $('a.prev').on('click', handlePrev);
    $('a.next').on('click', handleNext);
  };

  function handlePrev(e) {
    e.preventDefault();
    let $currenPhoto = $('#slides > figure:visible'),
        $prevPhoto,
        $photos = $('#slides > figure');
    let currentIndex = $currenPhoto.index();
    if (currentIndex === 0) {
      $prevPhoto = $photos.last();
    } else {
      $prevPhoto = $currenPhoto.prev();
    };

    currentId = $nextPhoto.data('id');

    $prevPhoto.fadeIn();
    $currenPhoto.fadeOut();

    renderInforAndComments();
  };

  function handleNext(e) {
    e.preventDefault();
    let $currenPhoto = $('#slides > figure:visible'),
        $nextPhoto,
        $photos = $('#slides > figure');
    let currentIndex = $currenPhoto.index();
    if (currentIndex === $photos.length - 1) {
      $nextPhoto = $photos.first();
    } else {
      $nextPhoto = $currenPhoto.next();
    };

    currentId = $nextPhoto.data('id');

    $nextPhoto.fadeIn();
    $currenPhoto.fadeOut();

    renderInforAndComments();
  };

  function renderInforAndComments() {
    renderPhotoInformation(currentId);
    renderCommentsFor(currentId);
  };

  function bindEventsToButtons() {
    $('section > header').on('click', 'a', function(event) {
      event.preventDefault();
      $clicked = $(this);
      let path = $clicked.attr('href'),
          newTotal,
          currentPhoto = photos.find(p => p.id === currentId);

      $.ajax({
        method: 'POST',
        url: 'http://localhost:3000' + path,
        data: { photo_id: currentId }
      }).done(function(response) {
        newTotal = response.total;
        let oldText = $clicked.text(),
            newText = oldText.replace(/\d+/, String(newTotal));
        $clicked.text(newText);
        currentPhoto[$clicked.attr('data-property')] = newTotal;
      })
    })
  };

  function bindEventsOnForm() {
    $form.on('submit', function(event) {
      event.preventDefault();
      $form.find('input[name=photo_id]').val(currentId);
      let data = $form.serialize();

      $.ajax({
        method: 'POST',
        url: 'comments/new',
        data: data,
      }).done(function(response) {
        renderCommentsFor(currentId);
        $form[0].reset();
      })
    })
  };

  $.ajax(requestForPhotos)
    .done(function(response) {
      photos = response;
      renderPhotos();
      currentId = $('#slides > figure:visible').data('id')
      renderInforAndComments();
      bindEventsToArrows();
      bindEventsToButtons();
      bindEventsOnForm();
    })
})
