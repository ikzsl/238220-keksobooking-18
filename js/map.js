'use strict';


(function () {

  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_WIDTH = 65;
  var ACTIVE_MAIN_PIN_HEIGHT = 75;
  var ACTIVE_MAIN_PIN_WIDTH = 65;
  var TOP_MAP_BORDER = 130;
  var BOTTOM_MAP_BORDER = 630;
  var LEFT_MAP_BORDER = 0;
  var RIGHT_MAP_BORDER = 1200;
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

  var onError = function () {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorMessage = errorTemplate.cloneNode(true);
    var main = document.querySelector('main');

    main.appendChild(errorMessage);

    var removeErrorMessage = function () {
      errorMessage.remove();
      document.removeEventListener('click', removeErrorMessage);
      document.removeEventListener('keydown', function (evt) {
        window.util.isEscEvent(evt, removeErrorMessage);
      });
    };

    document.addEventListener('mousedown', removeErrorMessage);

    document.addEventListener('keydown', function (evt) {
      window.util.isEscEvent(evt, removeErrorMessage);
    });
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
    };
    window.backend.load(onSuccess, onError);
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


      if (pinMain.offsetTop < TOP_MAP_BORDER - ACTIVE_MAIN_PIN_HEIGHT) {
        shift.y = -1;
      } else if (pinMain.offsetTop > BOTTOM_MAP_BORDER - ACTIVE_MAIN_PIN_HEIGHT) {
        shift.y = 1;
      } else if (pinMain.offsetLeft < LEFT_MAP_BORDER - ACTIVE_MAIN_PIN_WIDTH / 2) {
        shift.x = -1;
      } else if (pinMain.offsetLeft > RIGHT_MAP_BORDER - ACTIVE_MAIN_PIN_WIDTH / 2) {
        shift.x = 1;
      }

      pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';

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
    window.card.clean();
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
