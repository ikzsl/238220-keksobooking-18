'use strict';


(function () {

  var BUNGALO_PRICE_MIN = 0;
  var FLAT_PRICE_MIN = 1000;
  var HOUSE_PRICE_MIN = 5000;
  var PALACE_PRICE_MIN = 10000;


  var adForm = document.querySelector('.ad-form');
  var rooms = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');

  var roomsCapacityCheck = function () {
    if (rooms.value === '1' && capacity.value !== '1') {
      capacity.setCustomValidity('Только для 1 гостя');
    } else if (rooms.value === '2' && capacity.value !== '1' && capacity.value !== '2') {
      capacity.setCustomValidity('1 - 2 гостя');
    } else if (rooms.value === '3' && capacity.value !== '1' && capacity.value !== '2' && capacity.value !== '3') {
      capacity.setCustomValidity('Для гостей');
    } else if (rooms.value === '100' && capacity.value !== '0') {
      capacity.setCustomValidity('Не для гостей');
    } else {
      capacity.setCustomValidity('');
    }
  };

  var onCapacityCheck = roomsCapacityCheck;
  var onRoomsCheck = roomsCapacityCheck;


  capacity.addEventListener('input', onCapacityCheck);
  rooms.addEventListener('input', onRoomsCheck);

  // Поле «Цена за ночь»
  var price = adForm.querySelector('#price');

  //   Поле «Тип жилья»
  var type = adForm.querySelector('#type');

  var typePriceCheck = function () {
    if (type.value === 'bungalo') {
      price.min = BUNGALO_PRICE_MIN;
      price.placeholder = BUNGALO_PRICE_MIN;
    } else if (type.value === 'flat') {
      price.min = FLAT_PRICE_MIN;
      price.placeholder = FLAT_PRICE_MIN;
    } else if (type.value === 'house') {
      price.min = HOUSE_PRICE_MIN;
      price.placeholder = HOUSE_PRICE_MIN;
    } else {
      price.min = PALACE_PRICE_MIN;
      price.placeholder = PALACE_PRICE_MIN;
    }
  };
  var onTypeCheck = typePriceCheck;
  var onPriceCheck = typePriceCheck;


  type.addEventListener('input', onTypeCheck);
  price.addEventListener('input', onPriceCheck);

  // Поля «Время заезда», «Время выезда»
  var timein = adForm.querySelector('#timein');
  var timeout = adForm.querySelector('#timeout');

  timein.addEventListener('input', function () {
    timeout.value = timein.value;
  });

  timeout.addEventListener('input', function () {
    timein.value = timeout.value;
  });

  var main = document.querySelector('main');

  var success = document.querySelector('#success');
  var successTemplate = success.content.querySelector('.success');

  var onSuccess = function () {

    var successMessage = successTemplate.cloneNode(true);
    main.appendChild(successMessage);
    var onEscRemoveSuccessMessage = function (evt) {
      window.util.isEscEvent(evt, removeSuccessMessage);
    };

    var removeSuccessMessage = function () {
      successMessage.remove();
      document.removeEventListener('click', removeSuccessMessage);
      document.removeEventListener('keydown', onEscRemoveSuccessMessage);
      adForm.reset();
      window.map.deactivate();
    };

    document.addEventListener('click', removeSuccessMessage);
    document.addEventListener('keydown', onEscRemoveSuccessMessage);
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), onSuccess, window.util.onError);
  });

  var reset = adForm.querySelector('.ad-form__reset');
  reset.addEventListener('click', function (evt) {
    evt.preventDefault();
    adForm.reset();
    window.map.deactivate();
  });

})();
