var image_paths = [
{id: 0, src: "public/images/B1EN59_MINK_186995-e1483996381225-1220x811.jpg", intro: "An exotic pet is a rare or unusual animal pet an animal kept within human households which is relatively unusual to keep or is generally thought of as a wild species rather than as a pet."}, {id: 1, src: "public/images/images.jpeg", intro: "An exotic pet is a rare or unusual animal pet an animal kept within human households which is relatively unusual to keep or is generally thought of as a wild species rather than as a pet."},
{id: 2, src: "public/images/1407440163000-inidc5-6gbd5e492exwrmpd8lu-original.jpg", intro: "An exotic pet is a rare or unusual animal pet an animal kept within human households which is relatively unusual to keep or is generally thought of as a wild species rather than as a pet."},
{id: 3, src: "public/images/42958098_m.jpg", intro: "An exotic pet is a rare or unusual animal pet an animal kept within human households which is relatively unusual to keep or is generally thought of as a wild species rather than as a pet."},
{id: 4, src: "public/images/Screen_Shot_2019-12-18_at_11.30.28.png", intro: "An exotic pet is a rare or unusual animal pet an animal kept within human households which is relatively unusual to keep or is generally thought of as a wild species rather than as a pet."},
{id: 5, src: "public/images/884682510.jpg", intro: "An exotic pet is a rare or unusual animal pet an animal kept within human households which is relatively unusual to keep or is generally thought of as a wild species rather than as a pet."},
{id: 6, src: "public/images/voxa6vxpeskkkq1jep1r.jpeg", intro: "An exotic pet is a rare or unusual animal pet an animal kept within human households which is relatively unusual to keep or is generally thought of as a wild species rather than as a pet."},
{id: 7, src: "public/images/strange-and-exotic-animals-at-wheeler-gorge.jpg", intro: "An exotic pet is a rare or unusual animal pet an animal kept within human households which is relatively unusual to keep or is generally thought of as a wild species rather than as a pet."},
{id: 8, src: "public/images/01-exotic-pets-nationalgeographic_1150241.jpg", intro: "An exotic pet is a rare or unusual animal pet an animal kept within human households which is relatively unusual to keep or is generally thought of as a wild species rather than as a pet."},
{id: 9, src: "public/images/exotic-animals-you-can-keep-as-pets-11-pictures-1.jpg", intro: "An exotic pet is a rare or unusual animal pet an animal kept within human households which is relatively unusual to keep or is generally thought of as a wild species rather than as a pet."},
{id: 10, src: "public/images/Dik-Dik.jpg", intro: "An exotic pet is a rare or unusual animal pet an animal kept within human households which is relatively unusual to keep or is generally thought of as a wild species rather than as a pet."}
];

let app = (function() {
  let thumbnailTemplate = Handlebars.compile(document.querySelector('#thumbnail_template').innerHTML);
  let main = document.querySelector('main');
  let debouncedHandleMouseOver = debouce(handleMouseOver, 1500);

  function handleMouseOver(e) {
    let target = e.target;
    if (target.tagName === 'IMG') {
      target.nextElementSibling.style.display = 'block';
    }
  };

  function handleMouseLeave(e) {
    let target = e.target;
    if (target.tagName === 'IMG') {
      target.nextElementSibling.style.display = 'none';
    }
  };

  function debouce(callback, delay) {
    let id;

    return function(event) {
      if (id) {
        clearTimeout(id)
        id = setTimeout(callback.bind(null, event), delay)
      } else {
        id = setTimeout(callback.bind(null, event), delay)
      }
    }
  };

  return {
    insertImages: function() {
      image_paths.forEach(image => {
        main.insertAdjacentHTML('beforeend', thumbnailTemplate(image))
      })
    },

    bindEvents: function() {
      main.addEventListener('mouseover', debouncedHandleMouseOver);
      main.addEventListener('mouseout', handleMouseLeave);
    },

    init: function() {
      this.insertImages()
      this.bindEvents();
    }
  }

})();

app.init();
