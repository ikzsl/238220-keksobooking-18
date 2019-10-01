'use strict';

var PIN_HEIGHT = 70;
var PIN_WIDTH = 50;

var generateNoticesArray = function () {
  var noticesArray = [];
  var notice = {};
  notice.author = {};
  notice.offer = {};
  notice.location = {};

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
    return array[Math.floor(Math.random() * array.length)];
  };

  var randomArrayLength = function (array) {
    var newArray = [];
    for (var i = 0; i <= Math.floor(array.length * Math.random()); i++) {
      newArray[i] = array[i];
    }
    return newArray;
  };

  for (var i = 0; i < 8; i++) {

    notice.author.avatar = 'img/avatars/user0' + (i + 1) + '.png';
    notice.location.x = randomNumber(0, MAP_WIDTH);
    notice.location.y = randomNumber(130, 630);
    notice.offer.title = 'Заголовок ' + (i + 1) + '-го предложения';
    notice.offer.address = notice.location.x.toString() + ', ' + notice.location.y.toString();
    notice.offer.price = randomNumber(0, 10000);
    notice.offer.type = randomArrayElement(types);
    notice.offer.rooms = randomNumber(0, 10);
    notice.offer.guests = randomNumber(0, 10);
    notice.offer.checkin = randomArrayElement(checkTimes);
    notice.offer.checkout = randomArrayElement(checkTimes);
    notice.offer.features = randomArrayLength(features);
    notice.offer.description = 'Описание ' + (i + 1) + '-го предложения';
    notice.offer.photos = randomArrayLength(photos);

    noticesArray[i] = notice;
    notice = {};
    notice.author = {};
    notice.offer = {};
    notice.location = {};
  }
  // console.log(noticesArray);
  return noticesArray;
};

var mocks = generateNoticesArray();
var map = document.querySelector('.map');
map.classList.remove('map--faded');

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

  for (var i = 0; i < newPins.length; i++) {
    mapPins.appendChild(newPins[i]);
  }
};

renderPins();

