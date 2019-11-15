'use strict';

(function () {
  var filters = document.querySelector('.map__filters');
  var filteredNotices = [];

  var filterNotices = function () {
    filteredNotices = window.map.notices;
    var type = filters.querySelector('#housing-type');
    var price = filters.querySelector('#housing-price');
    var rooms = filters.querySelector('#housing-rooms');
    var guests = filters.querySelector('#housing-guests');
    var features = Array.from(filters.querySelectorAll('#housing-features input:checked'));

    // фильтр по удобствам
    var featuresOn = [];

    features.forEach(function (item, i) {
      featuresOn[i] = item.value;
    });

    var compareArr = [];
    filteredNotices.forEach(function (notice, j) {
      compareArr[j] = featuresOn.every(function (featureOn) {
        return (notice.offer.features.includes(featureOn));
      });
    });

    filteredNotices = filteredNotices.filter(function (notice, i) {
      var typeOf = (type.value === 'any') ? true : notice.offer.type === type.value;
      var priceOf;
      switch (price.value) {
        case 'any': priceOf = true;
          break;
        case 'low': priceOf = notice.offer.price < 10000;
          break;
        case 'middle': priceOf = notice.offer.price >= 10000 && notice.offer.price <= 50000;
          break;
        default: priceOf = notice.offer.price > 50000;
      }
      var roomsOf = (rooms.value === 'any') ? true : notice.offer.rooms === +rooms.value;
      var guestsOf = (guests.value === 'any') ? true : notice.offer.guests === +guests.value;
      var featureOf = (featuresOn.length === 0) ? true : compareArr[i];

      return (typeOf && roomsOf && guestsOf && priceOf && featureOf);
    });

    window.card.clean();
    window.pin.clean();
    window.pin.render(filteredNotices);
  };

  filters.addEventListener('change', window.debounce(filterNotices));

  window.filter = {
    filteredNotices: filteredNotices
  };

})();
