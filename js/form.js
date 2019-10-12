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
})();
