'use strict';

(function () {
  var similarListElement = document.querySelector('.pictures');
  var butonsForm = document.querySelector('.img-filters__form');
  var butons = Array.from(document.querySelectorAll('.img-filters__button'));
  var DEBOUNCE_INTERVAL = 500;
  var lastTimeout;

  var ourPictures = [];
  var successHandler = function (pictures) {
    var fragment = document.createDocumentFragment();

    pictures.forEach(function (picture) {
      fragment.appendChild(window.render.renderPhoto(picture));
    });
    ourPictures = pictures;

    similarListElement.appendChild(fragment);

    var imgFilter = document.querySelector('.img-filters');
    imgFilter.classList.remove('img-filters--inactive');

    butonsForm.addEventListener('click', clickHandler);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 330px auto; text-align: center; padding: 15px; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = '50px';
    node.style.right = '50px';
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);


  var clickHandler = function (evt) {
    var copyOurPictures = ourPictures.slice();
    var clickedElement = evt.target;
    evt.stopPropagation();

    butons.forEach(function (it) {
      it.className = 'img-filters__button';
    });

    var clickedElementFilter = clickedElement.id;
    clickedElement.classList.add('img-filters__button--active');

    if (clickedElementFilter === 'filter-discussed') {
      copyOurPictures = copyOurPictures.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
    }
    if (clickedElementFilter === 'filter-new') {
      var shuffle = function (arr) {
        for (var i = arr.length - 1; i > 0; i--) {
          var num = Math.floor(Math.random() * (i + 1));
          var d = arr[num];
          arr[num] = arr[i];
          arr[i] = d;
        }
        return arr;
      };
      shuffle(copyOurPictures);
      copyOurPictures = copyOurPictures.slice(0, 10);
    }

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      window.render.renderPhotos(copyOurPictures);
    }, DEBOUNCE_INTERVAL);

  };

})();
