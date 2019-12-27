var inventory;
$(function() {

  // initialization
  (function() {
    inventory = {
      collection: [],

      setDate: function() {
        return (new Date()).toDateString();
      },

      initializeItem: function(id) {
        return {
          id: Number(id),
          name: '',
          stockNumber: '',
          quantity: 1,
        }
      },

      init: function() {
        var time = this.setDate();
        $('#order_date').text(time);
        this.template = $('#inventory_item').html();
      },
    }
  })();

  inventory.init.bind(inventory)();

  // add event

  $('#add_item').on('click', function(event) {
    event.preventDefault();

    var $table = $('#inventory > tbody');
    var $newRow = $(document.createElement('tr'));
    var nextID = String($table.children().length);
    var rowString = inventory.template.replace(/ID/g, nextID);

    inventory.collection.push(inventory.initializeItem(nextID));
    $newRow.attr('id', nextID);
    $newRow.html(rowString);
    $table.append($newRow);
  });

  $('input[type=submit]').on('click', function(event) {
    event.preventDefault();
    var $rows = $('tr[id]');

    $rows.each(function(i, tr) {
      var inputs = $(tr).find('input');
      var item = inventory.collection[i];
      item.name = $(`input[name=item_name_${i}]`).val();
      item.stockNumber = $(`input[name=item_stock_number_${i}]`).val();
      item.quantity = $(`input[name=item_quantity_${i}]`).val();
    });
  });

  $('table').on('click', function(event) {
    event.preventDefault();
    var $target = $(event.target);

    if ($target.hasClass('delete')) {
      // delete from dom
      var $tr = $target.closest('tr')
      $tr.remove();
      // delete from data array
      var item = inventory.collection.find(e => e.id === +$tr.attr('id'));
      inventory.collection.splice(inventory.collection.indexOf(item), 1);
    }
  });

  $('table').on('blur', 'input', function(event) {
    event.preventDefault();

    var $input = $(event.target);
    var $tr = $($input.closest('tr'));
    console.log($tr);
    var id = +$tr.attr('id');
    console.log(id);
    var item = inventory.collection.find(obj => obj.id === id);
    console.log(item);

    item.name = $tr.find('[name^=item_name]').val();
    item.stockNumber = $tr.find('[name^=item_stock_number]').val();
    item.quantity = $tr.find('[name^=item_quantity]').val();

  })

}) //  dom ready end
