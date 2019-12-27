var app = (function() {
  var current_id;

  var todo_items = [
    { id: 1, title: 'Homework' },
    { id: 2, title: 'Shopping' },
    { id: 3, title: 'Calling Mom' },
    { id: 4, title: 'Coffee with John '}
  ];

  var fTemp = Handlebars.compile($('#todo_item_template').html());

  function renderTodos() {
    $('#todo_list').empty();
    todo_items.forEach(item => {
      $('#todo_list').append(fTemp(item));
    })
  };

  function bindEventsToDelete() {
    $('#cancel').on('click', function(event) {
      event.preventDefault();
      $('.delete_box').hide();
    });

    $('#delete').on('click', function(event) {
      event.preventDefault();
      var item = todo_items.find(item => item.id === current_id);
      var index = todo_items.indexOf(item);
      todo_items.splice(index, 1);
      renderTodos();
      $('.delete_box').hide();
    }.bind(this))
  };

  function bindEvents() {
    $('ul').on('click', 'a', function(event) {
      event.preventDefault();
      var $li = $(event.target).closest('li');
      current_id = +$li.attr('id');
      $('.delete_box').show();
    });
  };

  return {
    init: function() {
      $('.delete_box').hide();
      renderTodos();
      bindEvents();
      bindEventsToDelete();
    },
  };
})();

app.init();
