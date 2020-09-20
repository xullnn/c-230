### Think about the life cycle of the whole app

### Test Check List

CRUD

**create**

Before
  - creation form is rendered correctly
    - initial state
    - after CRUD, no remnant data in the form
  - creation form is dismissed correctly
During
  - forbid marking todo 'complete' during creating
After
  - count and due_date are updated accordingly in sidebar
  - check the title and completion state of the newly created item in main panel
  - open the item, check if all fields are established correctly
  - back to main panel, check if done/undone works correctly

**Read**

Read and edit form are overlapped in this app.
- Choose both a completed and incomplete item
- open the item, check if all fields are established correctly

Choosing different sections in sidebar should highlight correctly.

**Update**

Including:
  - update information about a todo
  - change completion state of todo

Update information about a todo
  - open edit form, change every field of todo
  - then save and reopen, check if all changes remain
  - check if it can turn a todo back to state of 'no due date'
    - notice the condition(both month and year)
      - lack one of month and year
      - lack both
      - whether have 'day' has no effect

> Uses key/value pairs to set the attributes of the todo. If the key/value pair is not present, its previous value is preserved.

"Not present" means empty string?

Change completion state of todo
  - make a incomplete todo 'complete' from edit form
  - make a already completed todo 'complete' should not change a thing

Update/Complete a todo from a due date group should not change the 'active' section in the sidebar

**Delete**

- check if the numbers in different sections are changed accordingly.

Delete a todo from a due date group should not change the 'active' section in the sidebar

**Refresh Page**

Refresh page after different kinds of operations, see if data is remained correctly.
