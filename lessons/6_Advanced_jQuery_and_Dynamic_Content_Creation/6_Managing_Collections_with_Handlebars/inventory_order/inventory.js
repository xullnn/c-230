var inventory;

// page load
(function () { // bound to inventory
  function setDate() {
    return (new Date()).getUTCDate();
  };

  function addItem(event) {
      event.preventDefault();
      this.lastID += 1;
      var id = this.lastID;

      var item = {
        id: id,
        name: '',
        stockNumber: '',
        quantity: 1,
      };

      this.collection.push(item);

      var $table = $('#inventory > tbody');
      var fTemplate = Handlebars.compile(this.template);
      // var rowString = this.template.replace(/ID/g, String(id));
      $table.append(fTemplate({ID: item.id}));
  };

  function updateItem(event) {
    event.preventDefault();
    var $tr = $(event.target).closest('tr');
    var id = getID($tr);
    var item = this.collection.find(e => e.id === id);

    item.name = $tr.find('input[name^=item_name]').val();
    item.stockNumber = $tr.find('input[name^=item_stock_number]').val();
    item.quantity = +$tr.find('input[name^=item_quantity]').val();
  };

  function removeItem(event) {
    event.preventDefault();
    var $target = $(event.target);
    var $tr = $target.closest('tr');
    var id = getID($tr);
    var item = this.collection.find(e => e.id === id);

    if ($target.hasClass('delete')) {
      $tr.remove();
      inventory.collection.splice(this.collection.indexOf(item), 1);
    }
  };

  function getID($row) {
    return +$row.find('input[name^=item_id]').eq(0).val();
  };

  inventory = {
    init: function() {
      this.date = setDate();
      this.collection = [];
      this.template = $('#inventory_item').html();
      this.lastID = 0;
      this.bindEvents();

      return this;
    },

    bindEvents: function() {
      $('#add_item').on('click', addItem.bind(this));
      $('table').on('click', 'a.delete', removeItem.bind(this));
      $('table').on('blur', 'input', updateItem.bind(this));
    },

  };
}).bind(inventory)();

$(function() { // jQuery DOM ready wrapper
  inventory.init();
}); // DOM Ready
