Hi Victor:

Sorry I was unable to check the clip you sent me before, that's partly because I had no access to Google service without a VNP in China yesterday. Anyway I did revision and here are some notes:

- Problem in clip 1 and 3 is that the `Due Date` section can be create or update correctly
  - first some issues about the `html` (You may notice I used html and css file provided in the instruction)
    - the `<select>`s relate to due date have wrong `name` value(`due_day`, `due_month` and `due_year`) which are inconsistent with the server side requirement(`day`, `month` and `year`). So due date related data can't be created or updated correctly.
    - another problem is the `year` options have no `value` set, but `day` and `month` do. So `year` data can't be collected from the form.
    - here's a screenshot about the html.
    ![](https://tva1.sinaimg.cn/large/007S8ZIlgy1gh1xzeunszj30f80bxdjn.jpg)

  - I noticed the `name` value of `<select>` in html but failed noticing the inconsistency with server side requirement. So I tried to render data to edit form with the wrong key prefixed with `due_`, additionally I also made an error with the using of `=` operator which should have been `===`

  ![](https://tva1.sinaimg.cn/large/007S8ZIlgy1gh1yde8qpmj30dm0283z2.jpg)


- Problem in clip 2 is that remnant information is retained in "new form" after rendering and dismissing an edit form.
  - this is because I didn't reset the form after dismissing an edit form.
    - and this is solved by add a reset step when dismissing form.

- About the file name of the main html file.
  - I kept the originally file name `todo.html` and didn't change it back to the required `index.html`.
    - I have fixed this now.
  - Also I should have noticed issues in the `HTML` file I mentioned before. I nearly used it without any touching.

If there's any new issue noticed by you, just let me know.
Thanks for taking time leaving feedback!
