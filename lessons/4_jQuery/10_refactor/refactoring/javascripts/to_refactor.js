function getTotal(cc_number) {
  var odd_total = 0, even_total = 0;

  cc_number = cc_number.split("").reverse();
  for (var i = 0, len = cc_number.length; i < len; i++) {
    if (i % 2 == 1) {
      cc_number[i] = (+cc_number[i] * 2) + "";
      if (cc_number[i].length > 1) {
        cc_number[i] = +cc_number[i][0] + +cc_number[i][1];
      }
      else {
        cc_number[i] = +cc_number[i];
      }
      odd_total += cc_number[i];
    }
    else {
      even_total += +cc_number[i];
    }
  }

  return odd_total + even_total;
};

const stoneTexts = {
  "January": "Your birthstone is garnet",
  "February": "Your birthstone is amethyst",
  "March": "Your birthstone is aquamarine or bloodstone",
  "April": "Your birthstone is diamond",
  "May": "Your birthstone is emerald",
  "June": "Your birthstone is pearl, moonstone, or alexandrite",
  "July": "Your birthstone is ruby",
  "August": "Your birthstone is peridot",
  "September": "Your birthstone is sapphire",
  "October": "Your birthstone is opal or tourmaline",
  "November": "Your birthstone is topaz or citrine",
  "December": "Your birthstone is turquoise, zircon, or tanzanite",
};

$(function() {
  $("nav a").on("mouseenter", function() {
    $(this).next("ul").addClass('opened');
  });

  $("nav").on("mouseleave", function() {
    $(this).find("ul ul").removeClass('opened').addClass('accordion');
  });

  $("button, .button").on("click", function(e) {
    e.preventDefault();

    $(this).addClass("clicked");
  });

  $(".toggle").on("click", function(e) {
    e.preventDefault();

    $(this).next(".accordion").toggleClass('opened')
  });

  $("form").on("submit", function(e) {
    e.preventDefault();
    var cc_number = $(this).find("[type=text]").val();
    var total = getTotal(cc_number);
    var valid = total % 10 === 0;

    $(this).find(".success").toggle(valid);
    $(this).find(".error").toggle(!valid);

  });

  $("ul a").on("click", function(e) {
    e.preventDefault();

    var month = $(this).text(),
        $stone = $("#birthstone");

      $stone.text(stoneTexts[month]);
  });
});
