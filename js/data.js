'use strict';

(function () {

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var error = errorTemplate.cloneNode(true);

  var errorHandler = function () {
    document.body.appendChild(error);
  };

  var successHandler = function (items) {
    window.data.notices = items;
    window.filter.filteredNotices = getNotices();
  };

  window.backend.load(successHandler, errorHandler);

  var getNotices = function () {
    return window.data.notices;
  };

  window.data = {
    getNotices: getNotices
  };

})();
