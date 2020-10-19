const img_upload = document.querySelector('#img_upload');
const img_thumbnail = document.querySelector('#img_thumbnail');
const img_explain = document.querySelector('#img_explain');

img_upload.addEventListener('change', function (e) {
  img_thumbnail.innerHTML = '미리보기 로딩 중..⏳';
  const reader = new FileReader();
  reader.onload = (e) => {
    img_thumbnail.innerHTML = `<img src="${e.target.result}">`;
    img_thumbnail.style.display = 'block';
  };
  reader.readAsDataURL(e.target.files[0]);
});
