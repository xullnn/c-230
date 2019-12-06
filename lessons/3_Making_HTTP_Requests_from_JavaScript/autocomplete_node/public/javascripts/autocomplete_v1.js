Autocomplete is an object
  states:
    input: the input element abstracted from the dom
    url: basic address prefix
    listUI: newly created sibling ul element for holding matching li items
    overlay: a 'floating', sibling element of input, it shows the best matched result in a ligter color in the inupt area

    visible: determines the presence of overlay
    matches: contains matched items
    bestMatchIndex: the index of the best matched item, which showed in overlay
    selectedIndex: the index of item which chosen by clicking mouse up and down arrow
    previouseValue: records what user has typed in no matter what have matched and best matched

  behaviors:
    wrapInput: create a prarent div element to wrap input element
    createUI:
      create a sibling unordered list after input element to hold all matched items if any
      create the overlay div to show the best matched item in the input area

    bindEvents:
      binds `valueChanged`: when input value changed
      binds `handleKeydown`: when pressing up or down arrow on keyboard
      binds `handleMouseDown`: when clicking an item inside the ul list

    (main functions react to different events)
      valueChanged
      handleMouseDown
      handleKeydown

    fetchMatches:
      trigger when value changed(`valueChanged` function) in input area
      it sends xhr request within a reasonable time interval
      then invoke a passed in callback while passing the request.response to the callback
        this will set the response array to `this.matches` when `valueChanged` triggered

    draw:
      use js to render relating elements on the page, based on the matched items
      render best matched item -- `overlay`
      render all matches -- insert newly created `li` into ul

    generateOverlayContent:
      adjust best matched item and user input, so the texts dont mess up

    reset:
      reset some states of Autocomplete, then rerender page
      which will clear previouse result showed on the page

    init:
      initialize states of Autocomplete, including:
        extracting input element
        set states for Autocomplete
        set delay for valueChanged
        bind events to corresponding elements

---

when DOM finishes loading, initialize Autocomplete object by calling `init` function on it.
