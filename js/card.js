'use strict';

(function () {

  var activeCard = 1; // текущее объявление
  var types = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var rooms = function (number) {
    if (number === 1) {
      return ' комната ';
    } else if (number > 4) {
      return ' комнат ';
    } else {
      return ' комнаты ';
    }
  };

  var guests = function (number) {
    if (number === 1) {
      return ' гостя ';
    } else {
      return ' гостей ';
    }
  };

  var createCard = function () {

    var cardTemplate = document.querySelector('#card').content;
    var newCardTemplate = cardTemplate.querySelector('.map__card');
    var newCard = [];
    var currentCard = window.filter.filteredNotices[activeCard];


    newCard = newCardTemplate.cloneNode(true);

    newCard.querySelector('.popup__title').textContent = currentCard.offer.title;
    newCard.querySelector('.popup__text--address').textContent = currentCard.offer.address;
    newCard.querySelector('.popup__text--price').textContent = currentCard.offer.price + '₽/ночь';
    newCard.querySelector('.popup__type').textContent = types[currentCard.offer.type];
    newCard.querySelector('.popup__text--capacity').textContent = currentCard.offer.rooms + rooms(currentCard.offer.rooms) +
      ' для ' + currentCard.offer.guests + guests(currentCard.offer.guests);
    newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + currentCard.offer.checkin + ', выезд до ' + currentCard.offer.checkout;

    var featureItems = newCard.querySelector('.popup__features');
    featureItems.innerHTML = '';

    currentCard.offer.features.forEach(function (elem) {
      var featureItem = document.createElement('li');
      featureItem.classList.add('popup__feature', 'popup__feature--' + elem);
      featureItems.appendChild(featureItem);
    });
    newCard.querySelector('.popup__description').textContent = currentCard.offer.description;

    var photos = newCard.querySelector('.popup__photos');
    var photo = photos.querySelector('.popup__photo');
    photos.innerHTML = '';

    currentCard.offer.photos.forEach(function (elem) {
      var photoCard = photo.cloneNode(true);
      photoCard.src = elem;
      photos.appendChild(photoCard);
    });

    newCard.querySelector('.popup__avatar').src = currentCard.author.avatar;

    return newCard;
  };

  var renderCards = function () {
    var map = document.querySelector('.map');
    var newCard = createCard();
    var mapCard = document.querySelector('.map__filters-container');
    var fragment = document.createDocumentFragment();
    fragment.appendChild(newCard);
    map.insertBefore(fragment, mapCard);
  };

  window.card = {
    renderCards: renderCards
  };

})();
