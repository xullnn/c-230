- shape
- coordinates(relative)
  - start
  - end
- first start: from start to end
- second start: from end to start
- third start: reverse and animate again


---

How to create an img element?

https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image


---

When clicking 'ADD' button

  function(Get data from html form (shape, locations)
    SerializeArray
    Encapsulate data into an object(the 4 coordinates)

    function()Create div
      - assign class based on the 'shape' property of the data object(addClass())
      - assign coordinates to div(data())

  Append div to canvas
    - function() set its initial position

When clicking 'animate'
  - function() set its initial position
  - animate it

When clicking 'stop'
  - find all divs inside canvas
    - call stop()
