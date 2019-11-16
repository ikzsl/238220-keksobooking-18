'use strict';


(function () {

  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_WIDTH = 65;
  var ACTIVE_MAIN_PIN_HEIGHT = 75;
  var ACTIVE_MAIN_PIN_WIDTH = 65;
  var MAP_BORDER = {
    top: 130,
    right: 1200,
    bottom: 630,
    left: 0
  };

  var START_PIN = {
    x: 570,
    y: 375
  };


  var map = document.querySelector('.map');


  // Добавляет аттрибут disabled к элементам массива
  var disableFields = function (array) {
    array.forEach(function (field) {
      field.setAttribute('disabled', 'disabled');
    });
  };

  // Удаляет аттрибут disabled у элементов массива
  var enableFields = function (array) {
    array.forEach(function (field) {
      field.removeAttribute('disabled');
    });
  };

  // Выключает элементы формы объявления
  var adForm = document.querySelector('.ad-form');
  var adFormFieldsets = adForm.querySelectorAll('fieldset');
  disableFields(adFormFieldsets);

  // Выключает элементы фильтра объявлений
  var mapFilters = document.querySelector('.map__filters');
  var mapFilterFieldsets = mapFilters.querySelectorAll('fieldset');
  var mapFilterSelects = mapFilters.querySelectorAll('select');
  disableFields(mapFilterFieldsets);
  disableFields(mapFilterSelects);

  var activateMap = function () {
    map.classList.remove('map--faded');
    enableFields(adFormFieldsets);
    adForm.classList.remove('ad-form--disabled');
  };

  var activateStateOnEnter = function (evt) {
    window.util.isEnterEvent(evt, activateState);
  };

  var getNotices = function () {
    var onSuccess = function (items) {
      window.map.notices = items;
      window.filter.filteredNotices = window.map.notices;
      window.pin.render(window.filter.filteredNotices);
      pinMain.removeEventListener('mousedown', activateState);
      pinMain.removeEventListener('keydown', activateStateOnEnter);
      enableFields(mapFilterFieldsets);
      enableFields(mapFilterSelects);
    };
    window.backend.load(onSuccess, window.util.onError);
  };

  var activateState = function () {
    getNotices();
    setAddress();
    activateMap();
  };

  var onMouseDown = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (pinMain.offsetLeft - shift.x >= MAP_BORDER.left - ACTIVE_MAIN_PIN_WIDTH / 2 &&
        pinMain.offsetLeft - shift.x <= MAP_BORDER.right - ACTIVE_MAIN_PIN_WIDTH / 2) {
        pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
      }

      if (pinMain.offsetTop - shift.y >= MAP_BORDER.top - ACTIVE_MAIN_PIN_HEIGHT &&
        pinMain.offsetTop - shift.y <= MAP_BORDER.bottom - ACTIVE_MAIN_PIN_HEIGHT) {
        pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      }

      setAddress();
    };

    var onMouseUp = function () {

      map.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    map.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  // Активное состояние при клике на маркер
  var pinMain = map.querySelector('.map__pin--main');
  pinMain.addEventListener('mousedown', activateState);
  pinMain.addEventListener('mousedown', onMouseDown);


  // Активное состояние - Enter на маркере
  pinMain.addEventListener('keydown', activateStateOnEnter);


  var deactivate = function () {
    mapFilters.reset();
    adForm.classList.add('ad-form--disabled');
    map.classList.add('map--faded');
    disableFields(adFormFieldsets);
    disableFields(mapFilterFieldsets);
    disableFields(mapFilterSelects);
    window.card.close();
    window.pin.clean();
    pinMain.style.left = START_PIN.x + 'px';
    pinMain.style.top = START_PIN.y + 'px';

    address.value = (Math.floor(pinMain.offsetLeft + MAIN_PIN_WIDTH / 2)
      + ', ' + Math.floor(pinMain.offsetTop + MAIN_PIN_HEIGHT / 2));

    pinMain.addEventListener('mousedown', activateState);

  };

  // Строка в поле "Адрес"
  var mainPinLocation = (Math.floor(pinMain.offsetLeft + MAIN_PIN_WIDTH / 2)
    + ', ' + Math.floor(pinMain.offsetTop + MAIN_PIN_HEIGHT / 2));
  var address = adForm.querySelector('input[name=address]');
  address.value = mainPinLocation;

  var setAddress = function () {
    address.value = (Math.floor(pinMain.offsetLeft + ACTIVE_MAIN_PIN_WIDTH / 2)
      + ', ' + Math.floor(pinMain.offsetTop + ACTIVE_MAIN_PIN_HEIGHT));
  };


  window.map = {
    deactivate: deactivate,
    pinMain: pinMain
  };

}());
