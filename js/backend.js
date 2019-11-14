'use strict';

(function () {
  var TIMEOUT = 10000; // 10s
  var SUCCESS_CODE = 200;
  var RESPONSE_TYPE = 'json';
  var BASE_URL = 'https://js.dump.academy/keksobooking';

  var loadData = function (xhr, onLoad, onError) {
    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + XMLHttpRequest.statusText);
      }
    });
  };

  var loadError = function (xhr, onError) {
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполнится за ' + xhr.timeout + 'мс');
    });
  };


  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = RESPONSE_TYPE;
      xhr.timeout = TIMEOUT;

      loadData(xhr, onLoad, onError);
      loadError(xhr, onError);

      xhr.open('GET', BASE_URL + '/data');
      xhr.send();
    },

    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = RESPONSE_TYPE;
      xhr.timeout = TIMEOUT;

      loadData(xhr, onLoad, onError);
      onLoadError(xhr, onError);

      xhr.open('POST', BASE_URL);
      xhr.send(data);
    }
  };
})();
