let App = (function() {
  let dates,
      bookingDetails,
      booking_template = Handlebars.compile(document.querySelector("#booking_template").innerHTML);

  function retrieveBookings() {
    return fetch("http://localhost:3000/api/bookings")
           .then(response => response.json())
           .then(data => dates = data)
  };

  function retrieveDetails() {
    let allPromises = dates.map(date => {
      return fetch("http://localhost:3000/api/bookings" + "/" + date)
      .then(response => response.json())
    })

    return Promise.all(allPromises)
                  .then(details => bookingDetails = details);
  }

  function bindEvents() {
    document.body.addEventListener('click', (e) => {
      let target = e.target;
      if (target.tagName === 'A') {
        e.preventDefault()
        target.nextElementSibling.classList.toggle("show")
      }
    })
  }

  function composeBookingObjects() {
    return dates.map((date, index) => {
      return {
        date: date,
        detail: String(bookingDetails[index]).split(",").join(" | "),
      }
    })
  }

  function renderBookings() {
    composeBookingObjects().forEach(booking => {
      document.body.insertAdjacentHTML("beforeend", booking_template(booking))
    })
  }


  return {
    init: async function() {
      await retrieveBookings();
      await retrieveDetails();
      console.log(composeBookingObjects())
      renderBookings();
      bindEvents();
    }
  }
})()

App.init();
