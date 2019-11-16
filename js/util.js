'use strict';
(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action();
      }
    },

    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    }
  };

  var error = document.querySelector('#error');
  var errorTemplate = error.content.querySelector('.error');
  var main = document.querySelector('main');

  window.util.onError = function () {
    var errorMessage = errorTemplate.cloneNode(true);
    main.appendChild(errorMessage);
    var removeErrorMessage = function () {
      errorMessage.remove();
      document.removeEventListener('click', removeErrorMessage);
      document.removeEventListener('keydown', function (evt) {
        window.util.isEscEvent(evt, removeErrorMessage);
      });
    };
    document.addEventListener('click', removeErrorMessage);
    document.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, removeErrorMessage);
    });

  };
})();
