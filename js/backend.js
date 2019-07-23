'use strict';

window.backend = (function () {
  var Url = {
    DATA: 'https://js.dump.academy/kekstagram/data',
  };

  var Code = {
    SUCESS: 200,
  };

  var TIMEOUT = 10000;

  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === Code.SUCESS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT;

    xhr.open('GET', Url.DATA);
    xhr.send();
  };

  return {
    load: load,
  };

})();
