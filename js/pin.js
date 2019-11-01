'use strict';

(function () {

  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;

  var maxPins = 5;

  var createPins = function () {

    var pinTemplate = document.querySelector('#pin').content;
    var newPinTemplate = pinTemplate.querySelector('.map__pin');
    var newPins = [];
    for (var i = 0; i < window.filter.filteredNotices.length; i++) {
      newPins[i] = newPinTemplate.cloneNode(true);
      newPins[i].firstChild.alt = window.filter.filteredNotices[i].offer.title;
      newPins[i].firstChild.src = window.filter.filteredNotices[i].author.avatar;
      newPins[i].style.left = (window.filter.filteredNotices[i].location.x - PIN_WIDTH / 2) + 'px';
      newPins[i].style.top = (window.filter.filteredNotices[i].location.y - PIN_HEIGHT / 2) + 'px';
    }


    newPins.forEach(function (item, j) {
      item.addEventListener('click', function () {
        item.classList.add('map__pin--active');
        window.card.removeCard();
        window.card.renderCards(window.filter.filteredNotices[j]);
      });
    });

    return newPins;
  };

  var renderPins = function () {
    var newPins = createPins();
    var mapPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < Math.min(window.filter.filteredNotices.length, maxPins); i++) {
      fragment.appendChild(newPins[i]);
    }
    mapPins.appendChild(fragment);

    return newPins;
  };

  var removePins = function () {
    var mapPins = document.querySelector('.map__pins');
    var mainPin = document.querySelector('.map__pin--main');
    mapPins.innerHTML = '';
    mapPins.appendChild(mainPin);
  };


  window.pin = {
    renderPins: renderPins,
    removePins: removePins
  };
})();
