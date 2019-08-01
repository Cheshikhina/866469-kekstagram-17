'use strict';

window.util = (function () {
  var KeyCode = {
    ESC: 27,
    ENTER: 13,
  };

  var shuffle = function (arr) {
    arr.forEach(function (el, index) {
      var num = Math.floor(Math.random() * (index + 1));
      var d = arr[num];
      arr[num] = arr[index];
      arr[index] = d;
    });
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
    var elements = document.querySelector(className).children;
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
