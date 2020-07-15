RichEditor = (function() {
  var icons = {
    bold: 'public/icons/bold.png',
    italic: 'public/icons/italic.png',
    underline: 'public/icons/underline.png',
    strikeThrough: 'public/icons/strikeThrough.png',
    insertOrderedList: 'public/icons/insertOrderedList.png',
    insertUnorderedList: 'public/icons/insertUnorderedList.png',
    justifyCenter: 'public/icons/justifyCenter.png',
    justifyFull: 'public/icons/justifyFull.png',
    justifyLeft: 'public/icons/justifyLeft.png',
    justifyRight: 'public/icons/justifyRight.png',
    createLink: 'public/icons/createLink.png',
  };

  var icon_template = Handlebars.compile($('#icon_template').html());

  function insertIcons() {
    var $nav = $('#toolbar');
    for(let methodName in icons) {
      $nav.append(icon_template({name: methodName, path: icons[methodName]}))
    };
  };

  function renderBtnStates() {
    var modesOn = [];
    var modesOff = [];
    Object.keys(icons).forEach(name => {
      if (document.queryCommandState(name)) {
        $('#' + name).css({'backgroundColor': 'lightgrey'});
      } else {
        $('#' + name).css({'backgroundColor': 'transparent'});
      };
    })
  };

  function bindEvents() {
    $('button').each(function(_, btn) {
      $(btn).on('click', function(event) {
        event.preventDefault();
        var $b = $(event.currentTarget);
        var methodName = $b.attr('id');
        if (methodName === 'createLink') {
          var link = prompt("Enter the link you want to insert:");
          if (link === null) return;
          document.execCommand(methodName, false, link);
        } else {
          document.execCommand(methodName);
        };

        $('#editArea').focus();
      })
    });

    $('main').on('click', renderBtnStates);
  };

  return {
    init: function() {
      insertIcons();
      bindEvents();
      $('#editArea').focus();
    },
  }
})();

RichEditor.init();
