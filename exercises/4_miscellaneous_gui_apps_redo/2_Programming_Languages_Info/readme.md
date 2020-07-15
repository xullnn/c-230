pure css seems not easy to implement.

data-excerpt

"This is a string.".slice(0,5)

We have a 'p' element with text.
We know the number of chars for excerpt.

set data-paragraph to full text
function excerpt(text, length)

when page load
  get excerpt, sub textContent

when click show_more
  slide down full text

when click show_less
  get excerpt, sub textContent


---
