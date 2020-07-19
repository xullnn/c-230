let App = (function() {

  let availables,
      current_students,
      staffs,
      booking_form = document.querySelector("#booking_schedule"),
      chosenScheduleId,
      chosenStudentEmail,
      adding_student_form_template = Handlebars.compile(document.querySelector("#adding_student_form_template").innerHTML);

  function updateAvailableSchedules() {
    return fetch("http://localhost:3000/api/schedules")
    .then(response => response.json())
    .then(all_schedules => {
      availables = all_schedules.filter(schedule => schedule.student_email === null)
    })
  };

  function updateCurrentUsers() {
    return fetch("http://localhost:3000/api/students")
      .then(response => response.json())
      .then(students => current_students = students)
  };

  function getStaffs() {
    return fetch("http://localhost:3000/api/staff_members")
    .then(response => response.json())
    .then(allStaff => staffs = allStaff);
  }

  function scheduleToString(schedule) {
    let staff_name = staffs.find(staff => staff.id == schedule.staff_id).name;
    return (`${staff_name} | ${schedule.date} | ${schedule.time}`)
  }

  function insertOptions(schedules) {
    let select = document.querySelector("#schedules"),
        option;

    select.innerHTML = '';
    schedules.forEach(schedule => {
      option = document.createElement('option');
      option.value = schedule.id;
      option.textContent = scheduleToString(schedule);
      select.appendChild(option);
    })
  };

  function studentExists(email) {
    return current_students.find(student => student.email === email)
  }

  function handleSubmitCreatingStudent(e) {
    e.preventDefault();

    let form = e.currentTarget;
    let data = new FormData(form);

    if (form.reportValidity()) {
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "http://localhost:3000/api/students");
      xhr.addEventListener('load', () => {
        alert("Student Added.");
        booking_form.dispatchEvent(new Event('submit'))
      })
      xhr.send(data);
    }
  }

  async function resetForms() {
    let forms = document.querySelectorAll('form')
    forms.forEach(form => form.reset());
    document.body.removeChild(forms[1]);
    await updateAvailableSchedules();
    insertOptions(availables)
  }

  function handleSubmitBooking(e) {
    e.preventDefault()
    let inputEmail = booking_form.querySelector("input[name='email']").value.trim(),
        id = [...booking_form.querySelectorAll("option")].find(option => option.selected).value;

    createBooking(id, inputEmail)
  };

  function createBooking(schedule_id, student_email) {
    let data = JSON.stringify({
      id: schedule_id,
      student_email: student_email,
    });

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/api/bookings");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.addEventListener('load', () => {
      if (xhr.status == '204') {
        alert("Booked.")
        resetForms();
      } else if (xhr.status == '404') {
        let msg = xhr.responseText;
        let sequence = msg.match(/\d+/)[0];
        alert(msg);

        let dataObj = {
          email: student_email,
          booking_sequence: sequence,
        }
        let studentForm = adding_student_form_template(dataObj);
        document.body.insertAdjacentHTML('beforeend', studentForm);
        form = document.querySelector("#create_student");
        form.addEventListener('submit', handleSubmitCreatingStudent);
      }
    });

    xhr.send(data);
  }

  function bindEvents() {
    booking_form.addEventListener('submit', handleSubmitBooking)
  };

  return {
    init: async function() {
      await updateAvailableSchedules();
      await updateCurrentUsers();
      await getStaffs();
      insertOptions(availables);
      bindEvents();
    }
  }
})()

App.init()
