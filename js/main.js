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

//

var uploadFormOpen = document.querySelector('#upload-file');
var uploadForm = document.querySelector('.img-upload__overlay');
var uploadFormClose = document.querySelector('#upload-cancel');
var uploadFormControlSmaller = uploadForm.querySelector('.scale__control--smaller');
var uploadFormControlBigger = uploadForm.querySelector('.scale__control--bigger');
var uploadFormControlValue = document.querySelector('.scale__control--value');
var uploadPreviewImg = document.querySelector('div.img-upload__preview img');
var uploadEffectLevel = document.querySelector('.img-upload__effect-level');
var effects = document.querySelectorAll('.effects__radio');
var KeyCode = {
  ESC: 27,
  ENTER: 13,
};
var scaleChange = 0.25;
var SCALE_MIN = 0.25;
var SCALE_MAX = 1;
var scale = [];

var effectHandle = document.querySelector('.effect-level__pin');
var depthHandle = document.querySelector('.effect-level__depth');
var uploadEffectLevelValue = document.querySelector('.effect-level__value');
var uploadPreview = document.querySelector('.img-upload__preview');
var LEVEL_MAX = 453;
var levelEffect;
var PERCENT_MAX = 100;


var formCloseEscHandler = function (evt) {
  if (evt.keyCode === KeyCode.ESC) {
    closeForm();
  }
};

var addCloseEsc = function () {
  document.addEventListener('keydown', formCloseEscHandler);
};

var removeCloseEsc = function () {
  document.removeEventListener('keydown', formCloseEscHandler);
};

var openForm = function () {
  uploadForm.classList.remove('hidden');
  addCloseEsc();
  getHiddenEffectLevel();
  updateUploadForm();
  scale = [1];
  uploadPreviewImg.style = 'transform: scale(' + scale + ')';
  uploadFormControlValue.setAttribute('value', 100 + '%');
  uploadPreview.style.filter = '';
};

var updateUploadForm = function () {
  uploadEffectLevelValue.setAttribute('value', LEVEL_MAX);
  effectHandle.style.left = LEVEL_MAX + 'px';
  depthHandle.style.width = LEVEL_MAX + 'px';
  uploadPreviewImg.className = '';
};

var closeForm = function () {
  uploadForm.classList.add('hidden');
  removeCloseEsc();
  uploadPreviewImg.className = '';
};

uploadFormOpen.addEventListener('change', function () {
  openForm();
});

uploadFormClose.addEventListener('click', function () {
  closeForm();
});

uploadFormClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KeyCode.ENTER) {
    closeForm();
  }
});

var scaleControlSmaller = function () {
  if (scale[0] === SCALE_MIN) {
    return;
  }
  scale = [scale[scale.length - 1] - scaleChange];
  uploadFormControlValue.setAttribute('value', scale * 100 + '%');
  uploadPreviewImg.style = 'transform: scale(' + scale + ')';
};

var scaleControlBigger = function () {
  if (scale[0] === SCALE_MAX) {
    return;
  }
  scale = [scale[scale.length - 1] + scaleChange];
  uploadFormControlValue.setAttribute('value', scale * 100 + '%');
  uploadPreviewImg.style = 'transform: scale(' + scale + ')';
};

uploadFormControlSmaller.addEventListener('click', scaleControlSmaller);
uploadFormControlSmaller.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KeyCode.ENTER) {
    scaleControlSmaller();
  }
});

uploadFormControlBigger.addEventListener('click', scaleControlBigger);
uploadFormControlBigger.addEventListener('keydown', function (evt) {
  if (evt.keyCode === KeyCode.ENTER) {
    scaleControlBigger();
  }
});

var getVisibleEffectLevel = function () {
  uploadEffectLevel.classList.remove('hidden');
};

var getHiddenEffectLevel = function () {
  uploadEffectLevel.classList.add('hidden');
};

var valueEffect;
var clickedElement = null;

var clickHandler = function (evt) {
  clickedElement = evt.currentTarget;

  if (clickedElement) {
    updateUploadForm();
    valueEffect = clickedElement.value;
    uploadPreviewImg.classList.add('effects__preview--' + valueEffect);
    if (valueEffect === 'none') {
      getHiddenEffectLevel();
      uploadPreview.style.filter = '';
    } else {
      getVisibleEffectLevel();
      uploadPreview.style.filter = effectCssStyle[valueEffect][0] + effectCssStyle[valueEffect][2] + effectCssStyle[valueEffect][3];
    }
  }

};

for (var i = 0; i < effects.length; ++i) {
  effects[i].addEventListener('click', clickHandler, true);
}

effectHandle.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startCoords = {
    x: evt.clientX,
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
    };

    startCoords = {
      x: moveEvt.clientX,
    };

    levelEffect = effectHandle.offsetLeft - shift.x;


    if (levelEffect < 0) {
      levelEffect = 0;
    } if (levelEffect > LEVEL_MAX) {
      levelEffect = LEVEL_MAX;
    }

    effectHandle.style.left = levelEffect + 'px';
    depthHandle.style.width = levelEffect + 'px';

    uploadEffectLevelValue.setAttribute('value', levelEffect);
    getFilter();
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

var effectCssStyle = {
  chrome: ['grayscale(', 0, 1, ')'],
  sepia: ['sepia(', 0, 1, ')'],
  marvin: ['invert(', 100, 0, '%)'],
  phobos: ['blur(', 0, 3, 'px)'],
  heat: ['brightness(', 1, 3, ')'],
};

var getFilter = function () {
  var nowPixel = levelEffect * PERCENT_MAX / LEVEL_MAX;
  var nowEffect = (effectCssStyle[valueEffect][2] - effectCssStyle[valueEffect][1]) / PERCENT_MAX * nowPixel + effectCssStyle[valueEffect][1];
  if (valueEffect === 'none') {
    uploadPreview.style.filter = '';
  }
  uploadPreview.style.filter = effectCssStyle[valueEffect][0] + nowEffect + effectCssStyle[valueEffect][3];
};

// console.log ();
