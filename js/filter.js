'use strict';

(function () {

  var filters = document.querySelector('.map__filters');
  var type = filters.querySelector('#housing-type');
  var filteredNotices = window.data.getNotices();

  type.addEventListener('change', function () {
    window.pin.removePins();
    var housingType = window.data.getNotices().filter(function (notice) {
      return notice.offer.type === type.value;
    });

    if (type.value !== 'any') {
      window.filter.filteredNotices = housingType;
    } else {
      window.filter.filteredNotices = window.data.getNotices();
    }
    window.pin.renderPins();
  });

  window.filter = {
    filteredNotices: filteredNotices
  };
})();
