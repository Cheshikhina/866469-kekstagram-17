'use strict';

window.util = (function () {

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

  return {
    shuffle: shuffle,
    debounce: debounce,
  };

})();
