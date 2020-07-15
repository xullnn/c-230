var app = (function() {
  var current_id;

  var todo_items = [
    { id: 1, title: 'Homework' },
    { id: 2, title: 'Shopping' },
    { id: 3, title: 'Calling Mom' },
    { id: 4, title: 'Coffee with John '}
  ];

  var fTemp = Handlebars.compile($('#todo_item_template').html());

  function updateCurrentId(event) {
    event.preventDefault();
    var $li = $(event.target).closest('li');
    current_id = +$li.attr('id');
  }

  function renderTodos() {
    $('#todo_list').empty();
    todo_items.forEach(item => {
      $('#todo_list').append(fTemp(item));
    })
  };

  function bindCancel() {
    $('#cancel').on('click', function(event) {
      event.preventDefault();
      $('.delete_box').hide();
    });
  };

  function bindDelete() {
    $('#delete').on('click', function(event) {
      event.preventDefault();
      var item = todo_items.find(item => item.id === current_id);
      var index = todo_items.indexOf(item);
      todo_items.splice(index, 1);
      renderTodos();
      $('.delete_box').hide();
      $('#menu').hide();
    });
  };

  function bindEventsToDeleteBox() {
    bindCancel();
    bindDelete();
  };

  function bindEventsToContextmenu() {
    $('ul#todo_list').on('contextmenu', 'li', function(event) {
      updateCurrentId(event);
      var $menu = $('#menu');
      $menu.offset({left: event.pageX, top: event.pageY});
      $menu.show();

      $('#menu_delete').on('click', function() {$('.delete_box').show()});
    });
  }

  return {
    init: function() {
      $('.delete_box').hide();
      renderTodos();
      // bindEventsToLinkDelete();
      bindEventsToDeleteBox();
      bindEventsToContextmenu();
    },
  };
})();

app.init();
