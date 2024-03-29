'use strict';

(function () {

  var types = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом',
    'palace': 'Дворец'
  };

  var getWordOfRoomsCount = function (number) {
    if (number === 1) {
      return ' комната ';
    } else if (number > 4) {
      return ' комнат ';
    } else {
      return ' комнаты ';
    }
  };

  var getWordOfGuestsCount = function (number) {
    return (number === 1) ? ' гостя ' : ' гостей ';
  };

  var createCard = function (card) {
    var cardTemplate = document.querySelector('#card').content;
    var newCardTemplate = cardTemplate.querySelector('.map__card');
    var newCard = '';

    newCard = newCardTemplate.cloneNode(true);

    var popupTitle = newCard.querySelector('.popup__title');
    if (card.offer.title) {
      popupTitle.textContent = card.offer.title;
    } else {
      popupTitle.remove();
    }

    var popupAddress = newCard.querySelector('.popup__text--address');
    if (card.offer.address) {
      popupAddress.textContent = card.offer.address;
    } else {
      popupAddress.remove();
    }


    var popupPrice = newCard.querySelector('.popup__text--price');
    if (card.offer.price) {
      popupPrice.textContent = card.offer.price + '₽/ночь';

    } else {
      popupPrice.remove();
    }

    var popupType = newCard.querySelector('.popup__type');
    if (card.offer.type) {
      popupType.textContent = types[card.offer.type];
    } else {
      popupType.remove();
    }


    var popupCapacity = newCard.querySelector('.popup__text--capacity');
    if (card.offer.rooms) {
      popupCapacity.textContent = (card.offer.rooms)
        ? card.offer.rooms + getWordOfRoomsCount(card.offer.rooms) + ' для ' + card.offer.guests + getWordOfGuestsCount(card.offer.guests) : '';
    } else {
      popupCapacity.remove();
    }

    var popupTime = newCard.querySelector('.popup__text--time');
    if (card.offer.checkin & card.offer.checkout) {
      popupTime.textContent = (card.offer.checkin !== '0:00')
        ? 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout : '';
    } else {
      popupTime.remove();
    }


    var featureItems = newCard.querySelector('.popup__features');
    if (card.offer.features.length) {
      featureItems.innerHTML = '';
      card.offer.features.forEach(function (elem) {
        var featureItem = document.createElement('li');
        featureItem.classList.add('popup__feature', 'popup__feature--' + elem);
        featureItems.appendChild(featureItem);
      });
    } else {
      featureItems.remove();
    }

    var popupDescription = newCard.querySelector('.popup__description');
    if (card.offer.description) {
      popupDescription.textContent = card.offer.description;
    } else {
      popupDescription.remove();
    }


    var photos = newCard.querySelector('.popup__photos');
    var photo = photos.querySelector('.popup__photo');
    photos.innerHTML = '';
    if (card.offer.photos.length) {
      card.offer.photos.forEach(function (elem) {
        var photoCard = photo.cloneNode(true);
        photoCard.src = elem;
        photos.appendChild(photoCard);
      });
    } else {
      photos.remove();
    }

    var popupAvatar = newCard.querySelector('.popup__avatar');
    if (card.author.avatar) {
      popupAvatar.src = card.author.avatar;
    } else {
      popupAvatar.remove();
    }


    return newCard;
  };

  var onMainPinEnterKeydown = function (evt) {
    window.util.isEnterEvent(evt, onMainPinClick);
  };

  var map = document.querySelector('.map');
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  var render = function (card) {
    window.pin.active.classList.add('map__pin--active');
    var newCard = createCard(card);
    map.insertBefore(newCard, mapFiltersContainer);
    var popupClose = document.querySelector('.popup__close');
    document.addEventListener('keydown', onMainPinEscKeydown);
    popupClose.addEventListener('keydown', onMainPinEnterKeydown);
    popupClose.addEventListener('click', onMainPinClick);
  };

  var onMainPinClick = function () {
    if (window.pin.active) {
      window.pin.active.classList.remove('map__pin--active');
    }

    var mapCard = document.querySelector('article.map__card');
    if (mapCard) {
      var popupClose = document.querySelector('.popup__close');
      document.removeEventListener('keydown', onMainPinEscKeydown);
      popupClose.removeEventListener('keydown', onMainPinEnterKeydown);
      popupClose.removeEventListener('click', onMainPinClick);
      mapCard.remove();
    }
  };

  var onMainPinEscKeydown = function (evt) {
    window.util.isEscEvent(evt, onMainPinClick);
  };

  window.card = {
    render: render,
    close: onMainPinClick
  };

})();
