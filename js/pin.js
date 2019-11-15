'use strict';

(function () {

  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;

  var MAX_PINS = 5;

  var createPins = function (pins) {

    var pinTemplate = document.querySelector('#pin').content;
    var newPinTemplate = pinTemplate.querySelector('.map__pin');
    var newPins = [];

    pins.forEach(function (pin, i) {
      newPins[i] = newPinTemplate.cloneNode(true);
      newPins[i].firstChild.alt = pin.offer.title;
      newPins[i].firstChild.src = pin.author.avatar;
      newPins[i].style.left = (pin.location.x - PIN_WIDTH / 2) + 'px';
      newPins[i].style.top = (pin.location.y - PIN_HEIGHT / 2) + 'px';
    });


    window.pin.activePin = '';

    newPins.forEach(function (item, j) {
      item.addEventListener('click', function () {
        if (window.pin.active) {
          window.pin.active.classList.remove('map__pin--active');
        }
        item.classList.add('map__pin--active');
        window.pin.active = item;
        window.card.onChangeRemoveActive();
        window.card.render(pins[j]);
      });


    });

    return newPins;
  };

  var render = function (pins) {
    var newPins = createPins(pins);
    var mapPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < Math.min(pins.length, MAX_PINS); i++) {
      fragment.appendChild(newPins[i]);
    }
    mapPins.appendChild(fragment);

    return newPins;
  };

  var clean = function () {
    var mapPins = document.querySelector('.map__pins');
    var mainPin = document.querySelector('.map__pin--main');
    var mapOverlay = document.querySelector('.map__overlay');
    mapPins.innerHTML = '';
    mapPins.appendChild(mapOverlay);
    mapPins.appendChild(mainPin);
  };


  window.pin = {
    render: render,
    clean: clean
  };
})();
