'use strict';

(function () {
  var filters = document.querySelector('.map__filters');
  var type = filters.querySelector('#housing-type');
  var filteredNotices = [];

  type.addEventListener('change', function () {
    window.pin.removePins();
    filteredNotices = window.map.notices;

    var housingTypes = filteredNotices.filter(function (notice) {
      return notice.offer.type === type.value;
    });

    if (type.value !== 'any') {
      filteredNotices = housingTypes;
    }

    window.filter = {
      filteredNotices: filteredNotices
    };
    window.pin.renderPins();

  });
  window.filter = {
    filteredNotices: filteredNotices
  };

})();
