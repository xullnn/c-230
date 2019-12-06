Path for retrieving available schedules: get /api/schedules
  - data will be used in the first form

Path for booking schedule: post /api/bookings
Request body:
  - id(of schedule) by chosen
  - student_email by use input

Path for create new student: post /api/students
Request body:
  - email
  - name
  - booking_sequence(get from last request for booking schedule when a user doesn't exist)

---

Form 1(schedule booking):

   - a select field to provide available schedules(student_email is `null`) to be chosen
    - includes staff name | date | time
   - a field to input user email
When submitting form 1:
  - new a xml request, send it with data
  - alert request.responseText
  - if responseText regex matches `/Schedule is either booked or does not exist/` (means the same slot has been booked during the same time)
    - this won't happen locally, so I won't implement this feature, but in practice, we should take this into account
  - if responseText regex matches `/booking_sequence/` (means given student_email doesn't exist)
    - retrieve the booking_sequence from responseText
    - append a new form for student creation

Form 2(student creation):
  - new a xml request form creating student
  - alert responseText
  - if response status is 201 (student created successfully)
    - new a xml request for booking schedule
    - send this request, alert responseText
    - if response status is 204
      - reset form

Use of IIFE in these cases can make it easier to choose variable names.
