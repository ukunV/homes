const img_upload = document.querySelector('#img_upload');
const img_thumbnails = document.querySelector('#img_thumbnail');
const img_explain = document.querySelector('#img_explain');

img_upload.addEventListener('change', function (e) {
  const reader = new FileReader();
  reader.onload = (e) => {
    let img = document.createElement('img');
    img.setAttribute('src', e.target.result);
    img_thumbnail.appendChild(img);
  };
  reader.readAsDataURL(e.target.files[0]);
  img_explain.style.visibility = 'hidden';
});
