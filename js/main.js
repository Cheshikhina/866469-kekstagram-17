'use strict';

var PHOTO_ADRESS_MIN = 1;
var PHOTO_ADRESS_MAX = 25;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var AVATAR_MAX = 7;

var сommentMessage = [
  ' - Всё отлично!',
  ' - В целом всё неплохо. Но не всё.',
  ' - Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  ' - Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  ' - Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  ' - Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

var сommentName = [
  'Мухаммед',
  'Иван',
  'Мария',
  'Анна',
  'Александр',
  'Александра',
  'Екатерина',
  'София',
  'Михаил',
  'Анастасия',
  'Алексей',
  'Роман',
  'Виктория',
  'Артем'
];

var similarListElement = document.querySelector('.pictures');
var similarPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getData = function () {
  var pictures = [];
  for (var i = PHOTO_ADRESS_MIN; i <= PHOTO_ADRESS_MAX; i++) {
    var picture = {
      url: 'photos/' + i + '.jpg',
      likes: getRandomInt(LIKES_MIN, LIKES_MAX),
      comments: [],
    };
    for (var j = 0; j < getRandomInt(1, 3); j++) {
      picture.comments.push({
        avatar: 'img/avatar-' + getRandomInt(0, AVATAR_MAX) + '.svg',
        message: сommentMessage[getRandomInt(0, сommentMessage.length)],
        name: сommentName[getRandomInt(0, сommentName.length)],
      });
    }
    pictures.push(picture);
  }
  return pictures;
};

var renderPhoto = function (photo) {
  var photoElement = similarPictureTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

  return photoElement;
};

var renderPhotos = function () {
  var fragment = document.createDocumentFragment();
  var photosData = getData();

  for (var i = 0; i < photosData.length; i++) {
    fragment.appendChild(renderPhoto(photosData[i]));
  }

  similarListElement.appendChild(fragment);
};

renderPhotos();
