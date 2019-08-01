'use strict';

window.backend = (function () {
  var TIMEOUT = 10000;
  var Url = {
    DATA: 'https://js.dump.academy/kekstagram/data',
    SEND: 'https://js.dump.academy/kekstagram',
  };

  var Code = {
    SUCESS: 200,
  };

  var request = function (onLoad, onError) {
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
    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = request(onLoad, onError);

    xhr.open('GET', Url.DATA);
    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhr = request(onLoad, onError);

    xhr.open('POST', Url.SEND);
    xhr.send(data);
  };

  return {
    load: load,
    save: save,
  };

})();
