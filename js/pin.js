'use strict';

(function () {

  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;

  var MAX_PINS = 5;

  var createPins = function (pins) {

    var pinTemplate = document.querySelector('#pin').content;
    var newPinTemplate = pinTemplate.querySelector('.map__pin');
    var newPins = [];
    for (var i = 0; i < pins.length; i++) {
      newPins[i] = newPinTemplate.cloneNode(true);
      newPins[i].firstChild.alt = pins[i].offer.title;
      newPins[i].firstChild.src = pins[i].author.avatar;
      newPins[i].style.left = (pins[i].location.x - PIN_WIDTH / 2) + 'px';
      newPins[i].style.top = (pins[i].location.y - PIN_HEIGHT / 2) + 'px';
    }


    newPins.forEach(function (item, j) {
      item.addEventListener('click', function () {
        item.classList.add('map__pin--active');
        window.card.removeCard();
        window.card.renderCard(pins[j]);
      });
    });

    return newPins;
  };

  var renderPins = function (pins) {
    var newPins = createPins(pins);
    var mapPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < Math.min(pins.length, MAX_PINS); i++) {
      fragment.appendChild(newPins[i]);
    }
    mapPins.appendChild(fragment);

    return newPins;
  };

  var removePins = function () {
    var mapPins = document.querySelector('.map__pins');
    var mainPin = document.querySelector('.map__pin--main');
    var mapOverlay = document.querySelector('.map__overlay');
    mapPins.innerHTML = '';
    mapPins.appendChild(mapOverlay);
    mapPins.appendChild(mainPin);
  };


  window.pin = {
    renderPins: renderPins,
    removePins: removePins
  };
})();
