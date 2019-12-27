var languages = [
  {
    name: 'Ruby',
    description: 'Ruby is a dynamic, reflective, object-oriented, ' +
    'general-purpose programming language. It was designed and developed in the mid-1990s ' +
    'by Yukihiro Matsumoto in Japan. According to its creator, Ruby was influenced by Perl, ' +
    'Smalltalk, Eiffel, Ada, and Lisp. It supports multiple programming paradigms, ' +
    'including functional, object-oriented, and imperative. It also has a dynamic type ' +
    'system and automatic memory management.'
  },

  {
    name: 'JavaScript',
    description: 'JavaScript is a high-level, dynamic, untyped, and interpreted ' +
    'programming language. It has been standardized in the ECMAScript language ' +
    'specification. Alongside HTML and CSS, JavaScript is one of the three core ' +
    'technologies of World Wide Web content production; the majority of websites employ ' +
    'it, and all modern Web browsers support it without the need for plug-ins. JavaScript ' +
    'is prototype-based with first-class functions, making it a multi-paradigm language, ' +
    'supporting object-oriented, imperative, and functional programming styles.'
  },

  {
    name: 'Lisp',
    description: 'Lisp (historically, LISP) is a family of computer programming languages ' +
    'with a long history and a distinctive, fully parenthesized prefix notation. ' +
    'Originally specified in 1958, Lisp is the second-oldest high-level programming ' +
    'language in widespread use today. Only Fortran is older, by one year. Lisp has changed ' +
    'since its early days, and many dialects have existed over its history. Today, the best '+
    'known general-purpose Lisp dialects are Common Lisp and Scheme.'
  }
];

var App = {
  fTemp: Handlebars.compile($('#section').html()),

  excerptText: function(text, length) {
    return text.slice(0, length) + '......';
  },

  initializeParagraphes: function() {
    var $main = $('main');
    languages.forEach(lang => {
      $main.append(this.fTemp(lang))
    });
  },

  setData: function() {
    $('p').each(function(i, e) {
      $(e).data('full', e.textContent)
    });
  },

  showExcerpt: function() {
    var fullText;
    $('p').each(function(i, e) {
      fullText = e.textContent;
      e.textContent = this.excerptText(fullText, 120);
    }.bind(this));
  },

  bindEvents: function() {
    $('.show_more').on('click', function(event) {
      event.preventDefault();
      var $p = $(event.target).closest('div').find('p');
      $p.text($p.data('full'));
      $(event.currentTarget).hide();
      $(event.currentTarget).closest('div').find('.show_less').show();
    }.bind(this));

    $('.show_less').on('click', function(event) {
      event.preventDefault();
      var $p = $(event.target).closest('div').find('p');
      $p.text(this.excerptText($p.data('full'), 120));
      $(event.currentTarget).hide();
      $(event.currentTarget).closest('div').find('.show_more').show();
    }.bind(this));
  },

  init: function() {
    this.initializeParagraphes();
    this.setData();
    this.showExcerpt();
    this.bindEvents();
  }
};

App.init()
