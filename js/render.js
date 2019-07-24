'use strict';

window.render = (function () {
  var similarPictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');
  var similarListElement = document.querySelector('.pictures');

  var renderPhoto = function (photo) {
    var photoElement = similarPictureTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    return photoElement;
  };

  var renderPhotos = function (pictures) {
    var allPhotos = document.querySelectorAll('.pictures .picture');
    allPhotos.forEach(function (item) {
      item.remove();
    });
    var fragment = document.createDocumentFragment();
    pictures.forEach(function (picture) {
      fragment.appendChild(window.render.renderPhoto(picture));
    });
    similarListElement.appendChild(fragment);
  };

  return {
    renderPhoto: renderPhoto,
    renderPhotos: renderPhotos,
  };

})();
