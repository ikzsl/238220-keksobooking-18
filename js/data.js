'use strict';

(function () {

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var error = errorTemplate.cloneNode(true);

  var errorHandler = function () {
    document.body.appendChild(error);
  };

  var successHandler = function (items) {
    window.data.notices = items;
    window.filter.filteredNotices = window.data.notices;
  };

  window.backend.load(successHandler, errorHandler);

  window.data = {
    notices: []
  };

})();
