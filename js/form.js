'use strict';


(function () {

  var adForm = document.querySelector('.ad-form');
  var rooms = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');

  var capacityCheck = function () {
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

  capacity.addEventListener('input', capacityCheck);
  rooms.addEventListener('input', capacityCheck);

  // Поле «Цена за ночь»
  var price = adForm.querySelector('#price');

  //   Поле «Тип жилья»
  var type = adForm.querySelector('#type');

  var priceCheck = function () {
    if (type.value === 'bungalo') {
      price.min = 0;
      price.placeholder = '0';
    } else if (type.value === 'flat') {
      price.min = 1000;
      price.placeholder = '1000';
    } else if (type.value === 'house') {
      price.min = 5000;
      price.placeholder = '5000';
    } else {
      price.min = 10000;
      price.placeholder = '10000';
    }
  };

  type.addEventListener('input', priceCheck);
  price.addEventListener('input', priceCheck);

  // Поля «Время заезда», «Время выезда»
  var timein = adForm.querySelector('#timein');
  var timeout = adForm.querySelector('#timeout');

  timein.addEventListener('input', function () {
    timeout.value = timein.value;
  });

  timeout.addEventListener('input', function () {
    timein.value = timeout.value;
  });


  var successHandler = function () {

    var successMessageTemplate = document.querySelector('#success').content;
    var successMessage = successMessageTemplate.cloneNode(true);
    var main = document.querySelector('main');

    main.appendChild(successMessage);
    var newsuccessMessage = document.querySelector('.success');
    window.card.removeCard();
    window.pin.removePins();
    adForm.reset();
    window.map.deactivateMap();


    var removeSuccessMessage = function () {
      newsuccessMessage.remove();
      document.removeEventListener('click', function () {
        removeSuccessMessage();
      });
    };


    document.addEventListener('click', function () {
      removeSuccessMessage();
    });


    document.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, removeSuccessMessage);
    });
  };


  var errorHandler = function () {

  };

  var submit = adForm.querySelector('.ad-form__submit');
  submit.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), successHandler, errorHandler);
  });

})();
