'use strict';

(function () {
  var similarListElement = document.querySelector('.pictures');
  var similarPictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var renderPhoto = function (photo) {
    var photoElement = similarPictureTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    return photoElement;
  };

  var renderPhotos = function () {
    var fragment = document.createDocumentFragment();
    var photosData = window.picture.getData();

    for (var i = 0; i < photosData.length; i++) {
      fragment.appendChild(renderPhoto(photosData[i]));
    }

    similarListElement.appendChild(fragment);
  };

  renderPhotos();

})();
