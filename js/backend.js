'use strict';

(function () {
  var TIMEOUT = 10000; // 10s
  var statusCodeOK = 200;

  var URL = 'https://js.dump.academy/keksobooking/data';
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.timeout = TIMEOUT;

  window.backend = {
    load: function (onLoad, onError) {
      xhr.addEventListener('load', function () {
        if (xhr.status === statusCodeOK) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + XMLHttpRequest.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполнится за ' + xhr.timeout + 'мс');
      });

      xhr.open('GET', URL);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      xhr.addEventListener('load', function () {
        if (xhr.status === statusCodeOK) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + XMLHttpRequest.statusText);
        }
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполнится за ' + xhr.timeout + 'мс');
      });
      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();
