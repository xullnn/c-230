Staff - Staff cancels schedule
DELETE
/api/schedules/:schedule_id
status:
  - 204
  - 4xx

Student - Student cancels a booking
PUT
/api/bookings/:booking_id
status
  - 204
  - 4xx

functions take arguments

---

Implement interfaces:

Since there's no authorization feature
  So interfaces are public
    Means anyone is allowed to click on a certain button to shoot a request to cancel schedule or booking
