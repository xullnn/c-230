function shadow(e) {

};

document.addEventListener('DOMContentLoaded', function() {
  let hero = document.querySelector('.hero'),
      text = hero.querySelector('h1');


  hero.addEventListener('mousemove', shadow);
})
