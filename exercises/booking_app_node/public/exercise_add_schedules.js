document.addEventListener('DOMContentLoaded', function() {


let App = (function() {
  let allStaffs,
      form_template = Handlebars.compile(document.querySelector('#form_template').innerHTML)

  function bindEvents() {
    document.querySelector("#add_field").addEventListener('click', handleAddField);
    document.querySelector("#submit_form").addEventListener('click', handleSubmit);
  };

  function handleSubmit(e) {
    e.preventDefault();
    let data = processData();
    let xhr = new XMLHttpRequest();
    xhr.open('POST',"http://localhost:3000/api/schedules");
    xhr.setRequestHeader('Content-Type', "application/json")
    xhr.addEventListener('load', () => { console.log(xhr.response)} )

    xhr.send(JSON.stringify({"schedules": data}));
  }

  function handleAddField(e) {
    e.preventDefault();
    insertFormSection();
  }

  function requestListOfStaffs() {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET',"http://localhost:3000/api/staff_members");
      xhr.addEventListener('load', () => { resolve(JSON.parse(xhr.response))} )
      xhr.addEventListener('error', () => { reject(xhr.responseText)})
      xhr.send();
    })
  }

  function getStaffs() {
    return requestListOfStaffs()
           .then(staffsData => allStaffs = staffsData)
           .catch(msg => alert(msg))
  }

  function insertFormSection() {
    document.querySelector('main').insertAdjacentHTML('beforeend', form_template({staffs: allStaffs}))
  };

  function processData() {
    let forms = document.querySelectorAll('form');
    return [...forms].map(form => constructFormObject(form))
  };

  function constructFormObject(form) {
    let obj = {},
        data = new FormData(form);

    for(let pair of data.entries()) {
      obj[pair[0]] = pair[1];
    }

    return obj;
  };

  return {
    init: async function() {
      await getStaffs(); // get all staffs data
      console.log(allStaffs)
      insertFormSection();
      bindEvents();
    },
  }
})()

App.init()








}) // DOM Ready
