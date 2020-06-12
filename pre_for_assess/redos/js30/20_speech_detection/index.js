document.addEventListener('DOMContentLoaded', function() {
  let arrow = document.querySelector('.arrow'),
      speed = document.querySelector('.speed-value');

  navigator.geolocation.watchPosition((data) => {
    console.log(data)
    speed.textContent = data.coords.speed;
    arrow.style.transform = `rotata(${data.coords.heading}deg)`;
  }), (err) => {
    console.error(err);
  };


});
