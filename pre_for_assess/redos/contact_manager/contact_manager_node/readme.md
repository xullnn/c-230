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

---

Thoughts After first version:

- Data(contacts) retrieval happens when:
  - app first initialized
  - when contacts get created or updated

- Page rendering includes:
  - at index
    - contacts
    - tags(all and chosen ones)
  - at edit form page
    - existing contact data rendering
    - available tags
  - at create form page
    - available tags

---

Feedback from Victor: )

> If ever, one thing you may consider is to break down the ContactManager into multiple objects with more focused responsibilities. You could probably have one that is responsible for the collection of contacts, one for collection of tags, and maybe one that is responsible for interacting with the server.

My understanding:

Instead of letting all `contact` data (along with `tag`s data) flow within the whole program, different object types can be made based on the main feature of the app, such as `tag`, `contact`

Also responsibilities should be split into different parties, such as data related, presentation related, web API related.

So the idea is to make the program into a communication among different objects(components), responsibility of each component should be clear and simple.

---

ContactsManager
  - API
    - making ajax requests
  - Contact
    - holding contacts data
      - rendering logic
  - Tag
    - holding tags data
    - rendering logic

We don't need any api exposure to code level, all interactions are in the page.

```js
function ContactManager() {
  // private functions / data(in the form of declared variables)
    API: {
      // reference outer object?

    },

    Contact: {},

    Tag: {},

    UI: {
      // presentation tasks
    }


    a function to wrap all operations need to be performed such as retrieving data, binding events
}

```

I want an object
in that object
I can:
  reference UI, API, Tag, Contact

It does not need to return any object. All operations can be wrapped and executed inside function.
