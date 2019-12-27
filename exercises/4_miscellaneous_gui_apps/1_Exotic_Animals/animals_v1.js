var image_paths = [{id: 0, src: "public/images/B1EN59_MINK_186995-e1483996381225-1220x811.jpg", intro: "An exotic pet is a rare or unusual animal pet an animal kept within human households which is relatively unusual to keep or is generally thought of as a wild species rather than as a pet."}, {id: 1, src: "public/images/images.jpeg", intro: "An exotic pet is a rare or unusual animal pet an animal kept within human households which is relatively unusual to keep or is generally thought of as a wild species rather than as a pet."}, {id: 2, src: "public/images/1407440163000-inidc5-6gbd5e492exwrmpd8lu-original.jpg", intro: "An exotic pet is a rare or unusual animal pet an animal kept within human households which is relatively unusual to keep or is generally thought of as a wild species rather than as a pet."}, {id: 3, src: "public/images/42958098_m.jpg", intro: "An exotic pet is a rare or unusual animal pet an animal kept within human households which is relatively unusual to keep or is generally thought of as a wild species rather than as a pet."}, {id: 4, src: "public/images/Screen_Shot_2019-12-18_at_11.30.28.png", intro: "An exotic pet is a rare or unusual animal pet an animal kept within human households which is relatively unusual to keep or is generally thought of as a wild species rather than as a pet."}, {id: 5, src: "public/images/884682510.jpg", intro: "An exotic pet is a rare or unusual animal pet an animal kept within human households which is relatively unusual to keep or is generally thought of as a wild species rather than as a pet."}, {id: 6, src: "public/images/voxa6vxpeskkkq1jep1r.jpeg", intro: "An exotic pet is a rare or unusual animal pet an animal kept within human households which is relatively unusual to keep or is generally thought of as a wild species rather than as a pet."}, {id: 7, src: "public/images/strange-and-exotic-animals-at-wheeler-gorge.jpg", intro: "An exotic pet is a rare or unusual animal pet an animal kept within human households which is relatively unusual to keep or is generally thought of as a wild species rather than as a pet."}, {id: 8, src: "public/images/01-exotic-pets-nationalgeographic_1150241.jpg", intro: "An exotic pet is a rare or unusual animal pet an animal kept within human households which is relatively unusual to keep or is generally thought of as a wild species rather than as a pet."}, {id: 9, src: "public/images/exotic-animals-you-can-keep-as-pets-11-pictures-1.jpg", intro: "An exotic pet is a rare or unusual animal pet an animal kept within human households which is relatively unusual to keep or is generally thought of as a wild species rather than as a pet."}, {id: 10, src: "public/images/Dik-Dik.jpg", intro: "An exotic pet is a rare or unusual animal pet an animal kept within human households which is relatively unusual to keep or is generally thought of as a wild species rather than as a pet."}];

var app = {
  fTemp: Handlebars.compile(this.$("script[type='text/handlebar-template']").html()),

  insertFigures: function() {
    image_paths.forEach(path => {
      $('main').append(this.fTemp(path));
    }
  )},

  enter: function enter(event) {
    var $figcaption = $(event.currentTarget.nextElementSibling);
    this.timeoutId = setTimeout(function() { $figcaption.fadeIn() }, 1000);
  },

  leave: function leave(event) {
    var $figcaption = $(event.currentTarget.nextElementSibling);
    clearTimeout(this.timeoutId);
    $('img').stop();
    $figcaption.fadeOut();
  },

  init: function() {
    this.insertFigures();
    $('img').hover(this.enter, this.leave);
  },
};

app.init();
