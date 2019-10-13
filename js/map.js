'use strict';


(function () {


  var PIN_HEIGHT = 70;
  var PIN_WIDTH = 50;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_PIN_WIDTH = 65;
  var ACTIVE_MAIN_PIN_HEIGHT = 75;
  var ACTIVE_MAIN_PIN_WIDTH = 65;


  var map = document.querySelector('.map');

  var createPins = function () {
    var pinTemplate = document.querySelector('#pin').content;
    var newPinTemplate = pinTemplate.querySelector('.map__pin');
    var newPins = [];
    for (var i = 0; i < window.data.noticesArray.length; i++) {
      newPins[i] = newPinTemplate.cloneNode(true);
      newPins[i].firstChild.alt = window.data.noticesArray[i].offer.title;
      newPins[i].firstChild.src = window.data.noticesArray[i].author.avatar;
      newPins[i].style.left = (window.data.noticesArray[i].location.x - PIN_WIDTH / 2) + 'px';
      newPins[i].style.top = (window.data.noticesArray[i].location.y - PIN_HEIGHT / 2) + 'px';
    }
    return newPins;
  };


  var renderPins = function () {
    var newPins = createPins();
    var mapPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < newPins.length; i++) {
      fragment.appendChild(newPins[i]);
    }
    mapPins.appendChild(fragment);
  };


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

  var activeState = function () {
    activateMap();
    setAddress();
    renderPins();
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
    mainPinLocation: mainPinLocation
  };

}());
