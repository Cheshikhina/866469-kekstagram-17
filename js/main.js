'use strict';

var PHOTO_ADRESS_MIN = 1;
var PHOTO_ADRESS_MAX = 25;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var AVATAR_MIN = 1;
var AVATAR_MAX = 6;

var getArray = function (minimumValue, maximumValue, arr1, arr2, text1, text2) {
  for (var i = minimumValue; i <= maximumValue; i++) {
    arr1 = text1 + i + text2;
    arr2.push(arr1);
  }
  return arr2;
};

var photoAdress = [];
var photosUrl = [];
var сommentAvatar = [];
var сommentsAvatar = [];

getArray(PHOTO_ADRESS_MIN, PHOTO_ADRESS_MAX, photoAdress, photosUrl, 'photos/', '.jpg');
getArray(AVATAR_MIN, AVATAR_MAX, сommentAvatar, сommentsAvatar, 'img/avatar-', '.svg');

var photosLikes = [];
for (var j = LIKES_MIN; j <= LIKES_MAX; j++) {
  var photoLikes = LIKES_MIN++;
  photosLikes.push(photoLikes);
}

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

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var сomment = [];
var getСomment = function () {
  for (var i = 0; i < AVATAR_MAX; i++) {
    сomment.push({
      avatar: сommentsAvatar[getRandomInt(0, сommentsAvatar.length)],
      message: сommentMessage[getRandomInt(0, сommentMessage.length)],
      name: сommentName[getRandomInt(0, сommentName.length)],
    });
  }

  return сomment;
};

var getData = function () {
  var info = [];
  var getСomment2 = function () {
    for (var i = 0; i < AVATAR_MAX; i++) {
      getСomment();
      info.push({
        1: сomment[getRandomInt(0, сomment.length)],
        2: сomment[getRandomInt(0, сomment.length)],
      });
    }
    return info;
  };

  var photoData = [];
  for (var i = 0; i < photosUrl.length; i++) {
    getСomment2();
    photoData.push({
      url: photosUrl[i],
      likes: photosLikes[getRandomInt(0, photosLikes.length)],
      comments: info[getRandomInt(0, info.length)],
    });
  }

  return photoData;
};

var similarListElement = document.querySelector('.pictures');
var similarPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var renderPhoto = function (photo) {
  var photoElement = similarPictureTemplate.cloneNode(true);

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__likes').textContent = photo.likes;
  photoElement.querySelector('.picture__comments').textContent = [photo.comments].length;

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
