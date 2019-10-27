'use strict';

(function () {

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var error = errorTemplate.cloneNode(true);
  var notices = [];

  var errorHandler = function () {
    document.body.appendChild(error);
  };

  var successHandler = function (items) {
    notices = items;
  };

  window.backend.load(successHandler, errorHandler);

  var getNotices = function () {
    return notices;
  };

  window.data = {
    getNotices: getNotices
  };

})();
