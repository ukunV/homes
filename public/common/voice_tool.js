const voiceBt = document.querySelector('#voice_bt');
const textareaTarget = document.querySelector('textarea[name="content"]');
const voiceTemp = document.querySelector('#voice_temp');

let recognition;
let recognitionInited = false;
let recognitionStarted = false;

const startRecognition = (e) => {
  e.preventDefault();
  if (recognitionStarted) recognitionStarted = false;
  else recognitionStarted = true;

  if (recognitionStarted) {
    initRecognition();
    voiceBt.innerHTML = '음성인식 중... 종료하기';
    voiceTemp.style.display = 'block';
  } else {
    recognition.stop();
    voiceBt.innerHTML = '<i class="fas fa-microphone"></i> 음성인식 다시 시작하기';
    voiceTemp.style.display = 'none';
  }
};

const initRecognition = () => {
  window.SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition ||
    window.mozSpeechRecognition ||
    window.msSpeechRecognition;

  recognition = new SpeechRecognition();
  recognition.interimResults = true;
  recognition.lang = 'ko-KR';
  recognition.addEventListener('result', (e) => {
    const transcript = [...e.results]
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join('');

    voiceTemp.textContent = transcript;

    if (e.results[0].isFinal) {
      textareaTarget.textContent += transcript + ' ';
      voiceTemp.textContent = '';
    }

    if (voiceTemp.textContent === '') {
      voiceTemp.style.display = 'none';
    } else {
      voiceTemp.style.display = 'block';
    }
  });
  recognition.addEventListener('end', () => {
    if (recognitionStarted) recognition.start();
  });

  recognitionInited = true;
  recognition.start();
};

voiceBt.addEventListener('click', startRecognition);
