'use strict';

var PHOTO_ADRESS_MIN = 1;
var PHOTO_ADRESS_MAX = 25;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var AVATAR_MAX = 7;
var SCALE_MIN = 0.25;
var SCALE_MAX = 1;
var LEVEL_MAX = 453;

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
var uploadMainForm = document.querySelector('.img-upload__form');
var uploadForm = document.querySelector('.img-upload__overlay');
var uploadFormClose = document.querySelector('#upload-cancel');
var uploadFormControlSmaller = uploadForm.querySelector('.scale__control--smaller');
var uploadFormControlBigger = uploadForm.querySelector('.scale__control--bigger');
var uploadFormControlValue = document.querySelector('.scale__control--value');
var uploadPreviewImg = document.querySelector('div.img-upload__preview img');
var uploadEffectLevel = document.querySelector('.img-upload__effect-level');
var effectsParent = document.querySelector('.effects');
var KeyCode = {
  ESC: 27,
  ENTER: 13,
};
var scaleChange = 0.25;
var scale;
var effectHandle = document.querySelector('.effect-level__pin');
var effectLine = document.querySelector('.effect-level__line');
var depthHandle = document.querySelector('.effect-level__depth');
var uploadEffectLevelValue = document.querySelector('.effect-level__value');
var uploadPreview = document.querySelector('.img-upload__preview');
var uploadCommit = document.querySelector('.text__description');
var valueEffect;
var clickedElement = null;
var effectCssStyle = {
  chrome: {
    effect: 'grayscale',
    maxvalue: 1,
    minvalue: 0,
    points: '',
  },
  sepia: {
    effect: 'sepia',
    maxvalue: 1,
    minvalue: 0,
    points: '',
  },
  marvin: {
    effect: 'invert',
    maxvalue: 100,
    minvalue: 0,
    points: '%',
  },
  phobos: {
    effect: 'blur',
    maxvalue: 3,
    minvalue: 0,
    points: 'px',
  },
  heat: {
    effect: 'brightness',
    maxvalue: 3,
    minvalue: 1,
    points: '',
  },
  none: null,
};

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
  scale = 1;
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
  uploadMainForm.reset();
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
  if (scale === SCALE_MIN) {
    return;
  }
  scale = scale - scaleChange;
  uploadFormControlValue.setAttribute('value', scale * 100 + '%');
  uploadPreviewImg.style.transform = 'scale(' + scale + ')';
};

var scaleControlBigger = function () {
  if (scale === SCALE_MAX) {
    return;
  }
  scale = scale + scaleChange;
  uploadFormControlValue.setAttribute('value', scale * 100 + '%');
  uploadPreviewImg.style.transform = 'scale(' + scale + ')';
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

var clickHandler = function (evt) {
  if (evt.target.tagName !== 'INPUT') {
    return;
  }
  evt.stopPropagation();
  clickedElement = evt.target;
  updateUploadForm();
  valueEffect = clickedElement.value;
  uploadPreviewImg.classList.add('effects__preview--' + valueEffect);
  if (valueEffect === 'none') {
    getHiddenEffectLevel();
    uploadPreviewImg.style.filter = '';
  } else {
    getVisibleEffectLevel();
    var curEffect = effectCssStyle[valueEffect];
    uploadPreviewImg.style.filter = curEffect.effect + '(' + curEffect.maxvalue + curEffect.points + ')';
  }
};

effectsParent.addEventListener('click', clickHandler);

effectHandle.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startLineCoords = effectLine.getBoundingClientRect();

  var onMouseMove = function (moveEvt, levelEffect) {
    moveEvt.preventDefault();

    levelEffect = moveEvt.clientX - startLineCoords.x;

    if (levelEffect < 0) {
      levelEffect = 0;
    } if (levelEffect > LEVEL_MAX) {
      levelEffect = LEVEL_MAX;
    }

    effectHandle.style.left = levelEffect + 'px';
    depthHandle.style.width = levelEffect + 'px';

    uploadEffectLevelValue.setAttribute('value', levelEffect);
    getFilter(effectCssStyle[valueEffect], levelEffect);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

var getFilter = function (curEffect, levelEffect) {
  var nowEffect = function () {
    return (curEffect.maxvalue - curEffect.minvalue) * levelEffect / LEVEL_MAX + curEffect.minvalue;
  };
  if (valueEffect === 'none') {
    uploadPreviewImg.style.filter = '';
  }
  uploadPreviewImg.style.filter = curEffect.effect + '(' + nowEffect() + curEffect.points + ')';
};

uploadCommit.addEventListener('focus', function () {
  removeCloseEsc();
});

uploadCommit.addEventListener('blur', function () {
  addCloseEsc();
});
