'use strict';
(function () {

  var onLoadImage = function (chooser, preview) {
    chooser.addEventListener('change', function () {
      var file = chooser.files[0];
      if (file.type.substr(0, 6) === 'image/') {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          preview.src = reader.result;
        });
        reader.readAsDataURL(file);
      }
    });
  };

  var avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

  onLoadImage(avatarFileChooser, avatarPreview);


  var photoFileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var imageContainer = document.createElement('img');

  document.querySelector('.ad-form__photo').appendChild(imageContainer);
  var photoPreview = document.querySelector('.ad-form__photo img');
  photoPreview.width = 100;
  photoPreview.height = 100;

  onLoadImage(photoFileChooser, photoPreview);
})();
