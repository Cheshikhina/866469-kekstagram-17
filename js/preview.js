'use strict';

window.preview = (function () {
  var INT_AVATAR_MAX = 6;
  var CURRENT_LIMIT = 5;
  var bigPhoto = document.querySelector('.big-picture');
  var commentCount = bigPhoto.querySelector('.social__comment-count');
  var commentLoader = document.querySelector('.comments-loader');
  var bigPhotoClose = document.querySelector('#picture-cancel');
  var similarSocialComment = document.querySelector('.social__comment');
  var similarListElement = document.querySelector('.social__comments');

  var getComment = function (comment) {
    var newComment = similarSocialComment.cloneNode(true);

    newComment.querySelector('.social__text').textContent = comment.message;
    newComment.querySelector('.social__picture').alt = comment.name;
    newComment.querySelector('.social__picture').src = comment.avatar;

    return newComment;
  };

  var getComments = function (comments) {
    var fragment = document.createDocumentFragment();

    var сurrentIndex = Math.min(comments.length, CURRENT_LIMIT);

    for (var i = 0; i < сurrentIndex; i++) {
      fragment.appendChild(getComment(comments[i]));
    }

    similarListElement.appendChild(fragment);
  };

  var getBigPhoto = function (photo) {
    window.util.removeElementsByClass('social__comment');
    var allComments = photo.comments;
    document.querySelector('body').classList.toggle('modal-open');

    bigPhoto.classList.remove('hidden');

    commentCount.classList.remove('visually-hidden');
    commentLoader.classList.remove('hidden');

    if (allComments.length < CURRENT_LIMIT) {
      commentLoader.classList.add('hidden');
    }

    bigPhoto.querySelector('.big-picture__img img').src = photo.url;
    bigPhoto.querySelector('.likes-count').textContent = photo.likes;
    bigPhoto.querySelector('.comments-count').textContent = photo.comments.length;
    bigPhoto.querySelector('.social__picture').src = 'img/avatar-' + window.util.getRandomInt(1, INT_AVATAR_MAX) + '.svg';
    bigPhoto.querySelector('.social__caption').textContent = photo.description;


    getComments(allComments);
    bigPhoto.querySelector('.social__comment-count').firstChild.textContent = Array.from(document.querySelectorAll('.social__comment')).length + ' из ';


    var commentLoaderHandler = function () {
      allComments = allComments.slice(CURRENT_LIMIT);

      if (allComments.length < CURRENT_LIMIT || allComments.length % CURRENT_LIMIT === 0) {
        commentLoader.classList.add('hidden');
      }

      getComments(allComments);
      bigPhoto.querySelector('.social__comment-count').firstChild.textContent = Array.from(document.querySelectorAll('.social__comment')).length + ' из ';
    };

    commentLoader.addEventListener('click', commentLoaderHandler);

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
      document.querySelector('body').classList.toggle('modal-open');
      commentLoader.removeEventListener('click', commentLoaderHandler);
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
