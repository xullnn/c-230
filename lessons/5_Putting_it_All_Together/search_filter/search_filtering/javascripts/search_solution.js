$(function() {
  var catalog = [{
    "title": "The Legend of Zelda: Majora's Mask 3D",
    "id": 1,
    "category": "Nintendo 3DS"
  }, {
    "title": "Super Smash Bros.",
    "id": 2,
    "category": "Nintendo 3DS"
  }, {
    "title": "Super Smash Bros.",
    "id": 3,
    "category": "Nintendo WiiU"
  }, {
    "title": "LEGO Batman 3: Beyond Gotham",
    "id": 4,
    "category": "Nintendo WiiU"
  }, {
    "title": "LEGO Batman 3: Beyond Gotham",
    "id": 5,
    "category": "Xbox One"
  }, {
    "title": "LEGO Batman 3: Beyond Gotham",
    "id": 6,
    "category": "PlayStation 4"
  }, {
    "title": "Far Cry 4",
    "id": 7,
    "category": "PlayStation 4"
  }, {
    "title": "Far Cry 4",
    "id": 8,
    "category": "Xbox One"
  }, {
    "title": "Call of Duty: Advanced Warfare",
    "id": 9,
    "category": "PlayStation 4"
  }, {
    "title": "Call of Duty: Advanced Warfare",
    "id": 10,
    "category": "Xbox One"
  }];

  var $items = $("main li"),
      $categories = $(":checkbox");

  function findItem(idx) {
    return $items.filter("[data-id=" + idx + "]");
  }

  function toggleCategories() {
    $categories.each(function(i) {
      var $e = $categories.eq(i),
          checked = $e.is(":checked"),
          category = $e.val();

      catalog.filter(function(item) {
        return item.category === category;
      }).forEach(function(item) {
        findItem(item.id).toggle(checked);
      });
    });
  }

  $("#search").on("submit", function(e) {
    e.preventDefault();

    var term = $(e.target).find("[type=search]").val().toLowerCase();

    toggleCategories();
    catalog.forEach(function(item) {
      if (item.title.toLowerCase().indexOf(term) === -1) {
        findItem(item.id).hide();
      }
    });
  });

  $("aside :checkbox").on("change", function() {
    $("#search").submit();
  });
});
