- CRUD of a contact
- real time search contact
- tagging feature
  - create tags
  - attach tags to a contact
  - show contacts by selecting tag(s)

- APIs for contact resource:
  - http://localhost:3000/doc/
- The solution to the storage of the `tag`
  - 1: use localStorage of browser
    - https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
  - 2: add new APIs to the node server
  - it's better to implement both

---

- Build basic html and css
  - use flex as layout tool
  - set UIs need to be interacted with
  - repeated html components should use templates
- Retrieve DOM objects need to be used
  - attach event handlers, inside:
    - prepare data to be sent
    - send request
    - normalize response data
    - handle possible errors
    - update the page with new data shown


Notes:

- overuse of jQuery's `html()` method will lose the bindings of events
- so it's better to use `hide()` and `show()` or other animation methods to rearrange elements

---

Problems:

Changing of the document leads to loses of event binding.
- to solve this:
  - find out all fixed containers on the page, hard code all the html
  - bind(delegate) all events on these containers
  - then the change of dynamic elements won't lead to the lose of events

---

Also, implement a "tagging" feature, which allows you to create tags, such as "marketing," "sales," "engineering," and when you add/edit a contact, you can select a tag to attach to the contact. Finally, you can click on a tag and show all the contacts with that tag.

- create tag
- select/attach tags to contact
- click tag to filter contacts

- Tags are now appear at:
  - contact cards
  - editing form
  - creating form

- use of tag
  - create: when creating and editing contact
    - input area or click existing tag list
  - filter: select tag(s) to filter contacts at index page
