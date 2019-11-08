'use strict';

(function () {
  var filters = document.querySelector('.map__filters');
  var filteredNotices = [];
  filters.addEventListener('change', function () {

    filteredNotices = window.map.notices;
    window.pin.removePins();


    // фильтр по типу жилья
    var type = filters.querySelector('#housing-type');
    var housingTypes = filteredNotices.filter(function (notice) {
      return notice.offer.type === type.value;
    });

    if (type.value !== 'any') {
      filteredNotices = housingTypes;
    }

    // фильтр по цене
    var price = filters.querySelector('#housing-price');
    var housingPrice = filteredNotices.filter(function (notice) {
      if (price.value === 'low') {
        return notice.offer.price < 10000;
      } else if (price.value === 'middle') {
        return notice.offer.price >= 10000 && notice.offer.price <= 50000;
      }
      return notice.offer.price > 50000;
    });

    if (price.value !== 'any') {
      filteredNotices = housingPrice;
    }

    // фильтр по числу комнат
    var rooms = filters.querySelector('#housing-rooms');
    var housingRooms = filteredNotices.filter(function (notice) {
      return notice.offer.rooms === +rooms.value;
    });

    if (rooms.value !== 'any') {
      filteredNotices = housingRooms;
    }

    // фильтр по числу гостей
    var guests = filters.querySelector('#housing-guests');
    var housingGuests = filteredNotices.filter(function (notice) {
      return notice.offer.guests === +guests.value;
    });

    if (guests.value !== 'any') {
      filteredNotices = housingGuests;
    }

    // фильтр по удобствам

    window.pin.renderPins(filteredNotices);
  });

  window.filter = {
    filteredNotices: filteredNotices
  };

})();
