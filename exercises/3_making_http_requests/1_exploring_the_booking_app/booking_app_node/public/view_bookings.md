GET /api/bookings: return dates
  HTTP/1.1 200 OK
  ['07-03-18', '08-02-18']

GET /api/bookings/:date: return booking detail for a date
  HTTP/1.1 200 OK
  [["Vincent Ortiz","garth@king.org","06:00"],["Laurine Feil","garth@king.org","06:00"]]

- retrieve all booking dates
  - display each date

  ```html
  <ul>
    <li id="07-03-18">07-03-18
      <li></li>
    </li>
  </ul>
  ```
