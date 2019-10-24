'use strict';

(function () {

  var filters = document.querySelector('.map__filters');
  var type = filters.querySelector('#housing-type');
  var filteredNotices = window.data.notices;
  type.addEventListener('change', function () {

    window.pin.removePins();


    var housingType = window.data.notices.filter(function (notice) {
      return notice.offer.type === type.value;
    });

    if (type.value === 'any') {
      window.filter.filteredNotices = window.data.notices;
    } else {
      window.filter.filteredNotices = housingType;
    }
    window.pin.renderPins();
  });

  window.filter = {
    filteredNotices: filteredNotices
  };

})();
