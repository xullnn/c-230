// - Getting webcam data and displaying it via <video> element
// - Paint the data to a canvas
// - Take a photo at any given time
// - Add effects to the video in realtime

document.addEventListener('DOMContentLoaded', function() {
  let video = document.querySelector('.player'),
      canvas = document.querySelector('.photo'),
      ctx = canvas.getContext('2d'),
      strip = document.querySelector('.strip'),
      snap = document.querySelector('.snap'),
      button = document.querySelector('#take_photo'),
      stop = document.querySelector('#stop');

  Promise.resolve().then(getVideo).then(paintToCanvas);

  button.addEventListener('click', takePhoto);
  // stop.addEventListener

  function getVideo() {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then(localMediaStream => {
        video.srcObject = localMediaStream;
        video.play();
      })
      .catch(err => {
        console.error(`OH NO!!!`, err);
      })
  };

  function paintToCanvas() {
    let width = video.videoWidth,
        height = video.videoHeight;
        canvas.width = 200;
        canvas.height = 100;

    return setInterval(() => ctx.drawImage(video,0, 0, 200, 100), 16)
  };

  function takePhoto() {
    // play the sound

    // take the data out of the canvas
    let data = canvas.toDataURL('image/jpeg'),
        link = document.createElement('a');

    link.href = data;
    link.setAttribute('download', 'handsome');
    link.innerHTML = `<img src="${data}" alt="handsome man">`;
    strip.insertBefore(link, strip.firstChild);
  }

})
