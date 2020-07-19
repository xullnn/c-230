
// Raw XML way
// function getSchedules() {
//   let xhr = new XMLHttpRequest();
//   xhr.open("GET", "http://localhost:3000/api/schedules");
//   xhr.addEventListener('load', () => {
//     console.log(xhr.response)
//   });
//
//   xhr.send();
// }
//
// getSchedules()


// Promise way

// function getSchedules() {
//   return new Promise(resolve => {
//     let xhr = new XMLHttpRequest();
//     xhr.open("GET", "http://localhost:3000/api/schedules");
//     xhr.addEventListener('load', () => {
//       resolve(xhr.response)
//     });
//
//     xhr.send();
//   })
// };
//
// getSchedules().then((response) => console.log(response))


// Fetch way

// async function getSchedules() {
//   let p = await fetch("http://localhost:3000/api/schedules");
//   p.json().then(data => console.log(data))
// }
//
//
// getSchedules()

// {id: 9, staff_id: 3, student_email: null, date: "09-04-18", time: "08:40"}
//
// {
//   'staff 1': 3
// }

// 1 get all schedules
// 2 find all schedules that have student_email that is null
// 3 transform data to:
// {
//   'staff 1': 3
// }

// function makeError(msg) {
//   let err = new Error();
//   err.message = msg;
//   return err;
// }
//
// let timeoutError = makeError("Request aborted, timout 500!")
//
// async function getSchedules() {
//   let all_schedules, availables,
//       controller = new AbortController(),
//       signal = controller.signal;
//
//   setTimeout(() => {  // set a timer to abort a request
//     if (!all_schedules) {
//       controller.abort();
//     }
//   }, 5000);
//
//   await fetch("http://localhost:3000/api/schedules", { signal: signal })
//         .then(response => response.json())
//         .then(data => all_schedules = data)
//         .catch((e) => console.error("Request aborted, timout 5000!"));
//
//   if (all_schedules) {
//     availables = all_schedules.filter(schedule => schedule.student_email === null);
//   }
//
//   return availables ;
// }
//
//
//
// console.log(getSchedules().then(result => console.log(result)))
//


// manually throw error
// then catch

// reject + catch
// xhr.abort()

// function requestAllSchedules(timeoutSet) {
//   return new Promise((resolve, reject) => {
//     let xhr = new XMLHttpRequest();
//     xhr.open("GET", "http://localhost:3000/api/schedules");
//     xhr.addEventListener('load', () => {
//       resolve(JSON.parse(xhr.response))
//     });
//
//     xhr.send();
//
//     setTimeout(() => {
//       if (!xhr.response)
//       xhr.abort();
//       reject(timeoutError)
//     }, timeoutSet)
//
//   })
// };
//
// function reportAvailableSchedules(all_schedules) {
//   let availables = all_schedules.filter(schedule => schedule.student_email === null);
//   if (availables.length === 0) {
//     console.log("There's no currently available schedule for booking.");
//   } else {
//     let counts = {},
//         staff_n;
//     availables.forEach(schedule => {
//       staff_n = `staff ${schedule.staff_id}`;
//       counts[staff_n] = (counts[staff_n] + 1) || 1;
//     })
//     console.log(counts)
//   }
// }
//
// function reporstStaffSlotCounts(timeoutSet) {
//   requestAllSchedules(timeoutSet)
//     .then(reportAvailableSchedules)
//     .catch(e => console.info(e.message));
// };
//
// reporstStaffSlotCounts(5000);


// refactor

let timeoutError = new Error("Request aborted, timout 5000, please try again later.");

function requestAllSchedules(timeoutSet) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/api/schedules");
    xhr.timeout = timeoutSet;
    xhr.responseType = 'json';

    xhr.addEventListener('load', () => resolve(xhr.response));
    xhr.addEventListener('timeout', () => reject(timeoutError));

    xhr.send();
  })
};

function reportAvailableSchedules(all_schedules) {
  let availables = all_schedules.filter(schedule => schedule.student_email === null);
  if (availables.length === 0) {
    alert("There's no currently available schedule for booking.");
  } else {
    let counts = {}, staff_n;
    availables.forEach(schedule => {
      staff_n = `staff ${schedule.staff_id}`;
      counts[staff_n] = (counts[staff_n] + 1) || 1;
    })
    alert(JSON.stringify(counts));
  }
};

function reporstStaffSlotCounts(timeoutSet) {
  requestAllSchedules(timeoutSet) // try fetching data
  .then(reportAvailableSchedules) // handle success case
  .catch(e => alert(e.message)); // catch timeout
};

// reporstStaffSlotCounts(5000);


let App = (function() {
  let addStaffForm = document.querySelector('#create_staff');

  function createStaffMember() {  // return promise
    return new Promise((resolve, reject) => {
      if (addStaffForm.checkValidity()) {
        let data = new FormData(addStaffForm);
        let xhr = new XMLHttpRequest();
        xhr.open('POST',"http://localhost:3000/api/staff_members");
        xhr.addEventListener('load', () => { resolve(JSON.parse(xhr.response))} )
        xhr.addEventListener('error', () => { reject(xhr.responseText)})
        xhr.send(data);
      } else {
        addStaffForm.dispatchEvent(new Event('invalid'))
      }
    })
  }

  function handleSubmit(e) {
    e.preventDefault();
    createStaffMember()
    .then(json => console.log(`Successfully created Staff with id: ${json.id}`))
    .catch(msg => console.log(msg));
    addStaffForm.reset();
  };

  function handleInvalidForm(e) {
    alert("Fail to create staff, please check you input.")
  };

  function bindEvents() {
    addStaffForm.addEventListener('invalid', handleInvalidForm)
    addStaffForm.addEventListener('submit', handleSubmit)
  }

  return {
    init: function() {
      bindEvents();
    }
  }
})();

App.init()
