'use strict';

window.preview = (function () {
  var MAX_INT_AVATAR = 6;
  var bigPhoto = document.querySelector('.big-picture');
  var commentCount = bigPhoto.querySelector('.social__comment-count');
  var commentLoader = bigPhoto.querySelector('.comments-loader');
  var bigPhotoClose = document.querySelector('#picture-cancel');
  var similarSocialComment = document.querySelector('.social__comment');
  var similarListElement = document.querySelector('.social__comments');


  var getBigPhoto = function (photo) {
    var allComments = photo.comments;

    bigPhoto.classList.remove('hidden');
    commentCount.classList.add('visually-hidden');
    commentLoader.classList.add('visually-hidden');

    bigPhoto.querySelector('.big-picture__img img').src = photo.url;
    bigPhoto.querySelector('.likes-count').textContent = photo.likes;
    bigPhoto.querySelector('.comments-count').textContent = photo.comments.length;
    bigPhoto.querySelector('.social__picture').src = 'img/avatar-' + window.util.getRandomInt(1, MAX_INT_AVATAR) + '.svg';
    bigPhoto.querySelector('.social__caption').textContent = photo.description;

    var getComment = function (comment) {
      var newComment = similarSocialComment.cloneNode(true);

      newComment.querySelector('.social__text').textContent = comment.message;
      newComment.querySelector('.social__picture').src = comment.avatar;

      return newComment;
    };

    var getComments = function (comments) {
      var fragment = document.createDocumentFragment();

      comments.forEach(function (comment) {
        fragment.appendChild(getComment(comment));
      });

      similarListElement.appendChild(fragment);
    };

    window.util.removeElementsByClass('social__comment');
    getComments(allComments);

    var photoCloseEscHandler = function (evt) {
      if (evt.keyCode === window.util.KeyCode.ESC) {
        closePhoto();
      }
    };

    var removeCloseEsc = function () {
      document.removeEventListener('keydown', photoCloseEscHandler);
    };

    var closePhoto = function () {
      bigPhoto.classList.add('hidden');
      removeCloseEsc();
    };

    bigPhotoClose.addEventListener('click', function () {
      closePhoto();
    });

    document.addEventListener('keydown', photoCloseEscHandler);
  };


  return {
    getBigPhoto: getBigPhoto,
  };

})();
