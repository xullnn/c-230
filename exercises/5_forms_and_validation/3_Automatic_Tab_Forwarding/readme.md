Changing of focus should be happening only when `keyup`. 'click' or other events should not trigger the handler.

Events only bind to the first 3 credit card inputs area.

Use `prev ~ siblings` selector.

https://api.jquery.com/next-siblings-selector/

---

Handle key combinations such as `shift` + `tab` to focus back to previous `input` field.

References *jQuery has no such events*:

- https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/isComposing
- https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionstart_event
- https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionupdate_event
- https://developer.mozilla.org/en-US/docs/Web/API/Element/compositionend_event

https://stackoverflow.com/questions/51226598/what-is-javascripts-compositionevent-please-give-examples

Relationship between other keyboard events:

-----------------------------------------------> time line

`keydown` - `compositionstart` - `compositionupdate` - `keyup` - `compositionend`

- `compositionstart` is triggered when pressing a key and holding it without releasing
- if second key is pressed `compositionupdate` is triggered
- when all keys are released `compositionend` should be triggered

---

Turns out a slight change on regex can do the work. We may need to make a list for function keys to rule out, then make them a regex.
