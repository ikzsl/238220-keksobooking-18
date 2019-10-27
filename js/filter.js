'use strict';

(function () {
  var filters = document.querySelector('.map__filters');
  var type = filters.querySelector('#housing-type');
  var filteredNotices = [];

  var successHandler = function (data) {
    window.filter = {
      filteredNotices: data
    };
  };

  window.backend.load(successHandler);

  type.addEventListener('change', function () {
    var housingTypes = window.data.getNotices().filter(function (notice) {
      return notice.offer.type === type.value;
    });
    window.pin.removePins();

    if (type.value !== 'any') {
      filteredNotices = housingTypes;
    } else {
      filteredNotices = window.data.getNotices();
    }

    window.filter = {
      filteredNotices: filteredNotices
    };
    window.pin.renderPins();
  });
})();
