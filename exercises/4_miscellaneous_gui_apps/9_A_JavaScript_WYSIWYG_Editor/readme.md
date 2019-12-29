The important part is to first understand what concepts are involved in this case and how are they connected with each other.

What's a rich text editor?
- to simply put, it's just an input area on a page that can let you format the text you write.

How does the editor work?
- we can first use mouse cursor to choose a piece of text then click a format option like `B(bold)` to make it bold
- or we can first click the `B` then the following typed in text will default to bold font

Then we need to read some doc to know what's the js' way to do this. Here are some references that can provide useful information:

References:

- https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable
> The `contenteditable` global attribute is an enumerated attribute indicating if the element should be editable by the user. If so, the browser modifies its widget to allow editing.

- https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand
> When an HTML document has been switched to `designMode`, its document object exposes an `execCommand` method to run commands that manipulate the current editable region, such as form inputs or contentEditable elements.

> Most commands affect the document's selection (bold, italics, etc.), while others insert new elements (adding a link), or affect an entire line (indenting). When using contentEditable, `execCommand()` affects the currently active editable element.

- https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Editable_content/Rich-Text_Editing_in_Mozilla
> Once designMode has been set to "On", the document becomes a rich-text editing area and the user can type into it **as if it were a textarea.**


Basic flow:

-> set an element's `contenteditable` attribute to `"true"`
-> the text content in that element becomes editable
  -> formatting work can be performed by:
    -> keyboard shortcut keys(e.g `command + b` makes selected text bold)
    -> calling built-in method `execCommand` while passing the name of edit operation you want to perform(e.g `document.execCommand('bold', false)`)
  -> formats are achieved by adding html tags, and we don't have to handle this

---

**Needed method names:**

- bold
- italic
- underline
- createLink
- strikeThrough
- insertOrderedList
- insertUnorderedList
- justifyCenter
- justifyFull
- justifyLeft
- justifyRight

**Use a very simple example to confirm understanding:**

```HTML
<!-- code omitted -->
<body>
  <main>
    <nav>
      <button type="button" name="make_bold"><strong>B</strong></button>
    </nav>
    <p id="editArea" contenteditable="true">
      This is a sentence.
    </p>
  </main>

  <script type="text/javascript">
    var editArea = document.querySelector('#editArea');

    $('button[name=make_bold]').on('click', function(event) {
      document.execCommand('bold');
      editArea.focus();
    });
  </script>
</body>
<!-- code omitted -->
```

I simply make a `p` element editable by setting `contenteditable="true"`. Then use a button with text `B` as the trigger to toggle `bold` editing mode. And it does work like I expect. So I think I can rely on my understanding of the problem to finish the rest of the job.

I get the icons for free from [icons8.com](https://icons8.com/icons).

This is the final result:

![](https://tva1.sinaimg.cn/large/006tNbRwgy1gadufrpqhoj31ll0u0wgj.jpg)

## Js code

```js
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
```

The HTML, CSS and other resources [are here at github](https://github.com/xullnn/c-230/tree/master/exercises/4_miscellaneous_gui_apps/9_A_JavaScript_WYSIWYG_Editor).

## A word about how to show the current editing mode(s)

![](https://tva1.sinaimg.cn/large/006tNbRwgy1gadvnjc5o5j31l809o0v9.jpg)

An important feature in this problem is to show the user which modes are on. For example, if `bold` and `italic` are both turned on, then the two corresponding buttons should be different from others. A simple way is to add different background color.

My first try was to use a variable to record the return value of `document.execCommand()`, then change color based on that, but soon I found the behavior was a bit unpredictable. Then I tried to add a `data-triggered` attribute to each button, then toggle the value at each click, then to change the background based on the value. This way works but can only did half of the work. That's because when I used mouse cursor to click some styled text, the button won't change, but actually the editing mode has already changed to that style behind the scene. And if I press the button multiple times after moving the cursor, things may go wrong even further.

Then I came up with a way to make sure after each clicking, whether on button or on edit area, the states will be checked and then reflect on the buttons' background.

```js
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
```

This time I don't change the background on buttons' `click` events, I just toggle the editing mode during that event. I attach another `click` event listener to `main` element to iterate through the method names, check which modes are "on" and then render the background based on the data I just collected. So there are actually 2 events will be triggered by a `click` on buttons, but only one by a `click` on the editing area(due to event bubbling rule). Clicking on buttons will first call `execCommand()` to turn on an editing mode, then listener on `main` element updates the view based on the information collected under the hood. Moving cursor on editing area may or may not change the editing mode, this is done by browser, but either way the `renderBtnStates()` callback will be invoked to reflect the current turned on modes.
