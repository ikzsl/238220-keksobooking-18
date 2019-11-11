'use strict';
(function () {
  var avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');

  avatarFileChooser.addEventListener('change', function () {

    var file = avatarFileChooser.files[0];

    if (file.type.substr(0, 6) === 'image/') {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });


  var photoFileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var photoPreview = document.querySelector('.ad-form__photo');

  photoFileChooser.addEventListener('change', function () {

    var file = photoFileChooser.files[0];

    if (file.type.substr(0, 6) === 'image/') {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        photoPreview.style.backgroundImage = 'URL(' + reader.result + ')';
        photoPreview.style.backgroundSize = 'contain';
        photoPreview.style.backgroundRepeat = 'no-repeat';
        photoPreview.style.backgroundPosition = 'center';
      });
      reader.readAsDataURL(file);
    }

  });

})();
