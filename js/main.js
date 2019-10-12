'use strict';

var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;
var MAIN_PIN_HEIGHT = 65;
var MAIN_PIN_WIDTH = 65;
var ACTIVE_MAIN_PIN_HEIGHT = 75;
var ACTIVE_MAIN_PIN_WIDTH = 65;

var generateNoticesArray = function () {
  var noticesArray = [];

  var MAP_WIDTH = document.querySelector('.map').offsetWidth;

  var types = ['palace', 'flat', 'house', 'bungalo'];
  var checkTimes = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var randomNumber = function (min, max) {
    return (min + Math.floor(Math.random() * (max - min)));
  };

  var randomArrayElement = function (array) {
    return array[randomNumber(0, array.length)];
  };

  var randomArrayLength = function (array) {
    var newArray = array.slice(0, randomNumber(0, array.length) + 1);
    return newArray;
  };

  var generateNotice = function (n) {
    var notice = {};
    notice.author = {};
    notice.offer = {};
    notice.location = {};
    notice.author.avatar = 'img/avatars/user0' + (n + 1) + '.png';
    notice.location.x = randomNumber(0, MAP_WIDTH);
    notice.location.y = randomNumber(130, 630);
    notice.offer.title = 'Заголовок ' + (n + 1) + '-го предложения';
    notice.offer.address = notice.location.x.toString() + ', ' + notice.location.y.toString();
    notice.offer.price = randomNumber(0, 10000);
    notice.offer.type = randomArrayElement(types);
    notice.offer.rooms = randomNumber(0, 10);
    notice.offer.guests = randomNumber(0, 10);
    notice.offer.checkin = randomArrayElement(checkTimes);
    notice.offer.checkout = randomArrayElement(checkTimes);
    notice.offer.features = randomArrayLength(features);
    notice.offer.description = 'Описание ' + (n + 1) + '-го предложения';
    notice.offer.photos = randomArrayLength(photos);
    return notice;
  };

  for (var i = 0; i < 8; i++) {
    noticesArray[i] = generateNotice(i);
  }
  return noticesArray;
};

var mocks = generateNoticesArray();
var map = document.querySelector('.map');

var createPins = function () {
  var pinTemplate = document.querySelector('#pin').content;
  var newPinTemplate = pinTemplate.querySelector('.map__pin');
  var newPins = [];
  for (var i = 0; i < mocks.length; i++) {
    newPins[i] = newPinTemplate.cloneNode(true);
    newPins[i].firstChild.alt = mocks[i].offer.title;
    newPins[i].firstChild.src = mocks[i].author.avatar;
    newPins[i].style.left = (mocks[i].location.x - PIN_WIDTH / 2) + 'px';
    newPins[i].style.top = (mocks[i].location.y - PIN_HEIGHT / 2) + 'px';
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
  if (evt.keyCode === 13) {
    activeState();
  }
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
