'use strict';

window.util = (function () {
  var KeyCode = {
    ESC: 27,
    ENTER: 13,
  };

  var shuffle = function (arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var num = Math.floor(Math.random() * (i + 1));
      var d = arr[num];
      arr[num] = arr[i];
      arr[i] = d;
    }
    return arr;
  };

  var debounce = function (cb, interval) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, interval);
    };
  };

  var getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var removeElementsByClass = function (className) {
    var elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  };

  return {
    shuffle: shuffle,
    debounce: debounce,
    getRandomInt: getRandomInt,
    KeyCode: KeyCode,
    removeElementsByClass: removeElementsByClass,
  };

})();
