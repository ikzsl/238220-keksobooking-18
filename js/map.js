'use strict';


(function () {

  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_WIDTH = 65;
  var ACTIVE_MAIN_PIN_HEIGHT = 75;
  var ACTIVE_MAIN_PIN_WIDTH = 65;
  var TOP_MAP_BORDER = 130;
  var BOTTOM_MAP_BORDER = 630;
  // var START_PIN = {
  //   x: Math.floor(570 + MAIN_PIN_WIDTH / 2),
  //   y: Math.floor(375 + MAIN_PIN_HEIGHT / 2)
  // };


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
      field.removeAttribute('disabled', 'disabled');
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
    enableFields(mapFilterFieldsets);
    enableFields(mapFilterSelects);
    adForm.classList.remove('ad-form--disabled');
  };

  var deactivateMap = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');

    mapPinMain.addEventListener('mousedown', activeState);
  };

  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var error = errorTemplate.cloneNode(true);
  var errorHandler = function () {
    document.body.appendChild(error);
  };

  var getNotices = function () {
    var successHandler = function (items) {
      window.map.notices = items;
      window.filter.filteredNotices = window.map.notices;
      window.pin.renderPins(window.filter.filteredNotices);
      activateMap();
      mapPinMain.removeEventListener('mousedown', activeState);
    };
    window.backend.load(successHandler, errorHandler);

  };


  var activeState = function () {
    getNotices();
    setAddress();
    mapPinMain.addEventListener('mousedown', onMouseDown);
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


      if (mapPinMain.offsetTop < TOP_MAP_BORDER - ACTIVE_MAIN_PIN_HEIGHT) {
        shift.y = -1;
      } else if (mapPinMain.offsetTop > BOTTOM_MAP_BORDER - ACTIVE_MAIN_PIN_HEIGHT) {
        shift.y = 1;
      }

      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function () {
      setAddress();
      map.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    map.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };


  // Активное состояние при клике на маркер
  var mapPinMain = map.querySelector('.map__pin--main');
  mapPinMain.addEventListener('mousedown', activeState);

  // Активное состояние - Enter на маркере
  mapPinMain.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, activeState);
  });

  // Строка в поле "Адрес"
  var mainPinLocation = (Math.floor(mapPinMain.offsetLeft + MAIN_PIN_WIDTH / 2)
    + ', ' + Math.floor(mapPinMain.offsetTop + MAIN_PIN_HEIGHT / 2));
  var address = adForm.querySelector('input[name=address]');
  address.value = mainPinLocation;

  var setAddress = function () {
    address.value = (Math.floor(mapPinMain.offsetLeft + ACTIVE_MAIN_PIN_WIDTH / 2)
      + ', ' + Math.floor(mapPinMain.offsetTop + ACTIVE_MAIN_PIN_HEIGHT));


  };

  window.map = {
    deactivateMap: deactivateMap,
    mapPinMain: mapPinMain
  };

}());
