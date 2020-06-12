document.addEventListener('DOMContentLoaded', function() {
  window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;

  let recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = 'en-US'

  let p = document.createElement('p'),
      words = document.querySelector('.words');
      words.appendChild(p);

  recognition.addEventListener('result', e => {
    console.log(e);

    let transcript = e.results[0][0].transcript;

    if (e.results[0].isFinal) {
      p = document.createElement('p');
      p.textContent = transcript;
      words.appendChild(p);
    }
  })

  recognition.start();
  recognition.addEventListener('end', recognition.start)
})
