let app = (function() {
  let cars = [
        { make: 'Honda', image: 'images/honda-accord-2005.jpg', model: 'Accord', year: 2005, price: 7000 },
        { make: 'Honda', image: 'images/honda-accord-2008.jpg', model: 'Accord', year: 2008, price: 11000 },
        { make: 'Toyota', image: 'images/toyota-camry-2009.jpg', model: 'Camry', year: 2009, price: 12500 },
        { make: 'Toyota', image: 'images/toyota-corrolla-2016.jpg', model: 'Corolla', year: 2016, price: 15000 },
        { make: 'Suzuki', image: 'images/suzuki-swift-2014.jpg', model: 'Swift', year: 2014, price: 9000 },
        { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 25000 },
        { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 26000 },
      ],
      fields = ['make', 'model', 'year', 'price'],
      options = {},
      currentCarSet = [],
      option_template = Handlebars.compile($('#option_template').html()),
      car_template = Handlebars.compile($('#car_template').html()),
      $car_container = $('#car_list');

  function renderCars(carSet) {
    $car_container.empty();
    carSet.forEach(car => {
      $car_container.append(car_template(car))
    });
  };

  function insertOptions(options, skip=null) {
    for(let key in options) {
      if (key !== skip) {
        let $parent = $('#' + key);
        $parent.empty();
        $parent.append(option_template({options: options[key]}))
      }
    }
  };

  function bindEvents() {
    $('form').on('input', (e) => {
      let criteria = {},
          field_name,
          value;
      // collect criteria
      $('option:selected').each((_, option) => {
        field_name = option.closest('select').id;
        value = option.value;
        if (value !== 'All') {
          criteria[field_name] = value;
        }
      });
      // filter cars. Each new filtering should start from the complete car set
      currentCarSet = cars;

      for (let key in criteria) {
        currentCarSet = currentCarSet.filter(car => car[key] == criteria[key])
      }

      renderCars(currentCarSet)
    }) // handle input callback

    $('#make').on('input', (e) => {
      let selectedMake = $(e.currentTarget).find('option:selected').val();
      let carSetByMake = cars.filter(car => car.make === selectedMake);
      if (selectedMake === 'All') return;
      collectOptions(carSetByMake);
      console.log(carSetByMake);
      console.log(options)
      insertOptions(options, 'make')
    })
  };

  function collectOptions(cars) {
    fields.map(field => {
      let values = cars.map(car => car[field])
      options[field] = Array.from(new Set(values));
    });
  }

  return {
    init: function() {
      currentCarSet = cars.slice();
      collectOptions(cars)
      renderCars(currentCarSet);
      insertOptions(options);
      bindEvents();
    },
  }
})();

app.init();

// set a global variable to hold current set of cars
//   - initially it's cars.slice(0);
// extract options and insert options to corresponding fields
// render cars to page
// bindEvents
//   - when `input` happens: filter car set then rerender cars to page


// Use `Set` to unique values
