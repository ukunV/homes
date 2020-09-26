window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'ko-KR'; //en-US

let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);

recognition.addEventListener('result', (e) => {
  const transcript = [...e.results]
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join('');

  if (transcript.includes('날씨')) {
    window.open(
      'https://www.google.com/search?q=%EB%82%A0%EC%94%A8&oq=%EB%82%A0%EC%94%A8&aqs=chrome..69i57j35i39l2j0j69i61j69i65j69i61l2.1234j0j7&sourceid=chrome&ie=UTF-8',
    );
  }

  p.textContent = transcript;

  if (e.results[0].isFinal) {
    p = document.createElement('p');
    words.appendChild(p);
  }
});
recognition.addEventListener('end', recognition.start);

recognition.start();
