'use strict';

(function () {

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
    return (number === 1) ? ' гостя ' : ' гостей ';
  };

  var createCard = function (card) {
    var cardTemplate = document.querySelector('#card').content;
    var newCardTemplate = cardTemplate.querySelector('.map__card');
    var newCard = [];

    newCard = newCardTemplate.cloneNode(true);

    newCard.querySelector('.popup__title').textContent = card.offer.title;
    newCard.querySelector('.popup__text--address').textContent = card.offer.address;
    newCard.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    newCard.querySelector('.popup__type').textContent = types[card.offer.type];
    newCard.querySelector('.popup__text--capacity').textContent = card.offer.rooms + rooms(card.offer.rooms) +
      ' для ' + card.offer.guests + guests(card.offer.guests);
    newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;

    var featureItems = newCard.querySelector('.popup__features');
    featureItems.innerHTML = '';

    card.offer.features.forEach(function (elem) {
      var featureItem = document.createElement('li');
      featureItem.classList.add('popup__feature', 'popup__feature--' + elem);
      featureItems.appendChild(featureItem);
    });
    newCard.querySelector('.popup__description').textContent = card.offer.description;

    var photos = newCard.querySelector('.popup__photos');
    var photo = photos.querySelector('.popup__photo');
    photos.innerHTML = '';

    card.offer.photos.forEach(function (elem) {
      var photoCard = photo.cloneNode(true);
      photoCard.src = elem;
      photos.appendChild(photoCard);
    });

    newCard.querySelector('.popup__avatar').src = card.author.avatar;

    return newCard;
  };

  var closePopup = function () {

    document.querySelector('.popup__close')
      .addEventListener('keydown', function (evt) {
        window.util.isEnterEvent(evt, removeCard);
      });

    document.querySelector('.popup__close')
      .addEventListener('click', removeCard);

    document.querySelector('.map')
      .addEventListener('keydown', function (evt) {
        window.util.isEscEvent(evt, removeCard);
      });

  };

  var renderCards = function (card) {
    var map = document.querySelector('.map');
    var newCard = createCard(card);
    var mapCard = document.querySelector('.map__filters-container');
    var fragment = document.createDocumentFragment();

    fragment.appendChild(newCard);
    map.insertBefore(fragment, mapCard);
    closePopup();
  };

  var removeCard = function () {
    var mapCard = document.querySelector('article.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  };

  window.card = {
    renderCards: renderCards,
    removeCard: removeCard
  };

})();
