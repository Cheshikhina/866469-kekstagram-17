'use strict';

window.render = (function () {
  var similarPictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var similarListElement = document.querySelector('.pictures');

  var newPhoto = function (photo) {
    var photoElement = similarPictureTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    photoElement.addEventListener('click', function () {
      window.preview.getBigPhoto(photo);
    });

    return photoElement;
  };

  var newPhotos = function (pictures) {
    var fragment = document.createDocumentFragment();

    pictures.forEach(function (picture) {
      fragment.appendChild(newPhoto(picture));
    });

    similarListElement.appendChild(fragment);

  };

  return {
    newPhotos: newPhotos,
  };

})();
