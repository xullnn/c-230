let App = (function() {
  let todo_items = [
    { id: 1, title: 'Homework' },
    { id: 2, title: 'Shopping' },
    { id: 3, title: 'Calling Mom' },
    { id: 4, title: 'Coffee with John '}
  ],
  current_id = null;

  const $delete_box = $('#delete_box'),
        $listContainer = $('#todo_list'),
        itemTemplate = Handlebars.compile($('#todo_item_template').html());

  function bindEvents() {
    $('#todo_list').on('click', 'a', (e) => {
      e.preventDefault();
      current_id = $(e.target.closest('li')).attr('id');
      console.log(current_id);
      $delete_box.show();
    });

    $('#delete').click((e) => {
      e.preventDefault();
      let item = todo_items.find(i => i.id === current_id),
          index = todo_items.indexOf(item);

      todo_items.splice(index, 1);
      reset();
    });

    $("#cancel").click((e) => {
      $delete_box.hide();
    })
  };

  function reset() {
    $('#todo_list').empty();
    $delete_box.hide();
    insertItems();
  };

  function insertItems() {
    todo_items.forEach(item => {
      $listContainer.append(itemTemplate(item));
    })
  };

  return {
    init: function() {
      // reset items

      reset();
      bindEvents();
      //
    }
  }
})();

App.init()
