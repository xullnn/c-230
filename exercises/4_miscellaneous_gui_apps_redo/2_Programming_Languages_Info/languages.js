var langs = [
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
  },

  {
    name: 'madeup',
    description: 'This description is short than 120 chars.'
  }
];


// App.init() doesn't need to expose any interface to user, just to bind events


let App = (function() {
  const Length = 120;

  let languages = langs.map(l => {
    let full_text = l.description;
    l.excerpt = excerptText(full_text, Length);
    l.trimmed = full_text.slice(Length - 1);
    delete l.description;
    return l;
  });

  let langTemplate = Handlebars.compile(document.querySelector('#section').innerHTML),
      main = document.querySelector('main');

  function excerptText(text, length) {
    return text.slice(0, length - 1) + ' ...';
  };

  function insertLanguages() {
    languages.forEach(l => main.insertAdjacentHTML('beforeend', langTemplate(l)))
  };

  function nearestNeighbor(meNode) { // near up or near down, not certain, up first
    let tagName = meNode.tagName,
        pre = meNode.previousElementSibling,
        aft = meNode.nextElementSibling;

    if (pre && pre.tagName === tagName) {
      return pre;
    } else if (aft && aft.tagName === tagName) {
      return aft;
    } else {
      return null;
    }
  };

  function bindEvents() {
    document.querySelectorAll('.show_less').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        let target = e.currentTarget;

        target.closest('div').querySelector('.trimmed').style.display = 'none';
        target.style.display = 'none';
        nearestNeighbor(target).style.display = 'block';
      })
    });

    document.querySelectorAll('.show_more').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        let target = e.currentTarget;

        target.closest('div').querySelector('.trimmed').style.display = 'inline';
        target.style.display = 'none';
        console.log(target);
        console.log(nearestNeighbor(target));
        nearestNeighbor(target).style.display = 'block';
      })
    });
  };

  function hideButtonsForShorts() {
    document.querySelectorAll('.excerpt').forEach(span => {
      if (span.innerText.length < Length) {
        let parent = span.closest('div');
        parent.querySelectorAll('button').forEach(btn => parent.removeChild(btn))
      }
    })
  }

  return {
    init: function() {
      insertLanguages();
      hideButtonsForShorts();
      bindEvents();
    }
  }
})();

App.init()
