function cancelBooking(booking_id) {
  return (new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open("PUT", "http://localhost:3000/api/bookings" + "/" + booking_id);
      xhr.addEventListener('load', () => {
        if (xhr.status == '204') {
          resolve("Booking has been cancelled successfully.")
        } else if (xhr.status == '404') {
          reject("Booking was not found.")
        }
      });

      xhr.send();
  }))
}

function cancelSchedule(schedule_id) {
  return (new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open("DELETE", "http://localhost:3000/api/schedules" + "/" + schedule_id);
      xhr.addEventListener('load', () => {
        if (xhr.status == '204') {
          resolve("Booking has been cancelled successfully.")
        } else if (xhr.status == '403') {
          reject(xhr.responseText)
        }
      });

      xhr.send();
  }))
}
