'use strict';

(function () {
  var butonsForm = document.querySelector('.img-filters__form');
  var butons = document.querySelectorAll('.img-filters__button');

  var ourPictures = [];
  var successHandler = function (pictures) {
    ourPictures = pictures;
    window.render.newPhotos(pictures);

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

  var clickHandler = window.util.debounce(function (evt) {
    var copyOurPictures = ourPictures.slice();
    var clickedElement = evt.target;
    evt.stopPropagation();

    butons.forEach(function (it) {
      it.className = 'img-filters__button';
    });

    clickedElement.classList.add('img-filters__button--active');

    if (clickedElement.id === 'filter-discussed') {
      copyOurPictures = copyOurPictures.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
    }
    if (clickedElement.id === 'filter-new') {
      window.util.shuffle(copyOurPictures);
      copyOurPictures = copyOurPictures.slice(0, 10);
    }

    var allPhotos = document.querySelectorAll('.pictures .picture');
    allPhotos.forEach(function (item) {
      item.remove();
    });
    window.render.newPhotos(copyOurPictures);
  });

})();
