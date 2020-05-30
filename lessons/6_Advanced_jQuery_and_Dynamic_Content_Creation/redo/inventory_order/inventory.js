var inventory;

(function() {

  function setDate() {
    let dateStr = (new Date()).toDateString();
    $('#order_date').text(dateStr);
  };

  function getTemp() {
    this.template = $('#inventory_item').text();
  };

  function lastID() {
    return this.collection.length;
  };

  function handleAdd(event) {
    event.preventDefault();
    let newID = lastID.call(this) + 1;
    let tempInstance = this.template.replace(/ID/g, String(newID))
    $('table').append(tempInstance);
    this.collection.push({
      id: newID,
      name: '',
      stockNumber: '',
      quantity: 1,
    })
  };

  function handleBlur(event) {
    if (event.target.tagName === 'A') return; // to avoid clicking on 'delete' triggering the 'blur' event on input

    let $currentTr = $(event.currentTarget);
    let id = $currentTr.find('input[name^=item_id_]').val();
    let item = this.collection.find(o => o.id == id);
    item.name = $currentTr.find('input[name^=item_name_]').val();
    item.stockNumber = $currentTr.find('input[name^=item_stock_number_]').val();
    item.quantity = $currentTr.find('input[name^=item_quantity_]').val() || 1;
  };

  function removeFromArray(element, array) {
    let index = array.indexOf(element);
    array.splice(index, 1);
  };

  function handleDelete(event) {
    event.preventDefault();
    event.stopPropagation();
    let $currentTr = $(event.target).closest('tr');
    let id = $currentTr.find('input[name^=item_id_]').val();
    let item = this.collection.find(o => o.id == id);
    removeFromArray(item, this.collection)
    $currentTr.remove();
  };

  inventory = {
    collection: [],

    init: function() {
      setDate();
      getTemp.call(this);
      $('#add_item').on('click', handleAdd.bind(this));
      $('table').on('blur', 'tr', handleBlur.bind(this));
      $('table').on('click', 'a', handleDelete.bind(this));
    },
  };

})();

$(function() {
  inventory.init();
});
