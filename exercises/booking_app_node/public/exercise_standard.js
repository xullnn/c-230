function retrieveSchedules() {
  const request = new XMLHttpRequest();

  request.open('GET', 'http://localhost:3000/api/schedules');
  request.timeout = 5000;
  request.responseType = 'json';

  request.addEventListener('load', event => {
    const schedules = request.response;
    const staffs = [];
    const tally = [];

    if (schedules.length > 0) {
      schedules.forEach(schedule => {
        const key = `staff ${String(schedule.staff_id)}`;
        if (!staffs.includes(key)) {
          staffs.push(key);
          tally.push(1);
        } else {
          tally[staffs.indexOf(key)] += 1;
        }
      });

      alert(tally.map((_, index) => {
        `${staffs[index]}: ${tally[index]}`
      }).join("\n"));
    } else {
      alert("There are currently no schedules available for booking");
    }
  })

  request.addEventListener('timeout', event => {
    alert("It is taking longer than unsual, please try again later.")
  });

  request.addEventListener('loadend', event => {
    alert("The request has completed.")
  })

  request.send();
};

retrieveSchedules()
