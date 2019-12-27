var app = (function() {
  var cars = [
    { make: 'Honda', image: 'images/honda-accord-2005.jpg', model: 'Accord', year: 2005, price: 7000 },
    { make: 'Honda', image: 'images/honda-accord-2008.jpg', model: 'Accord', year: 2008, price: 11000 },
    { make: 'Toyota', image: 'images/toyota-camry-2009.jpg', model: 'Camry', year: 2009, price: 12500 },
    { make: 'Toyota', image: 'images/toyota-corrolla-2016.jpg', model: 'Corolla', year: 2016, price: 15000 },
    { make: 'Suzuki', image: 'images/suzuki-swift-2014.jpg', model: 'Swift', year: 2014, price: 9000 },
    { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 25000 },
    { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 26000 },
  ];

  var optionTemp = Handlebars.compile($('#option_partial').html());
  var carTemp = Handlebars.compile($('#car_partial').html());

  var optionMap = {};

  function insertOptions() {
    Object.keys(cars[0]).forEach(key => {
      optionMap[key] = cars.map(car => car[key])
    })

    for(let key in optionMap) {
      var select = $('select#' + key);
      select.append(optionTemp({options: optionMap[key]}));
    }
  };

  function renderCars(cars) {
    var $container = $('section#car_list');
    $container.empty();
    cars.forEach(car => $container.append(carTemp(car)))
  };

  function collect_specs() {
    var specs = {};
    $('form.filter_form').serializeArray().forEach(obj => {
      specs[obj.name] = obj.value;
    })
    return specs;
  };

  function parseSpecValue(value) {
    return (/^\d+$/.test(value)) ? +value : value;
  };

  function findCars(specs) {
    var carsCopy = cars.slice();
    var specValue;

    for(let spec in specs) {
      specValue = parseSpecValue(specs[spec]);
      if (specValue !== 'All') {
        carsCopy = carsCopy.filter(car => car[spec] === specValue)
      }
    };

    return carsCopy;
  };

  function bindEvents() {
    $('form.filter_form').on('submit', function(event) {
      event.preventDefault();
      var filter_specs = collect_specs();
      var filtered_cars = findCars(filter_specs);
      renderCars(filtered_cars);
    })
  };

  return {
    init: function() {
      insertOptions();
      renderCars(cars);
      bindEvents();
      console.log(optionMap);
    },
  };
})();

app.init();
