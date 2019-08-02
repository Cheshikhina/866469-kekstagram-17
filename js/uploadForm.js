'use strict';

window.uploadForm = (function () {
  var SCALE_MIN = 0.25;
  var SCALE_MAX = 1;
  var LEVEL_MAX = 453;
  var TAG_MAX = 5;
  var TAG_LENGT_MAX = 20;
  var COMMENT_LENGT_MAX = 140;
  var ERROR_TAG = 'border: 2px solid red; background-color: #ffc1ab;';
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
  var effectHandle = document.querySelector('.effect-level__pin');
  var effectLine = document.querySelector('.effect-level__line');
  var depthHandle = document.querySelector('.effect-level__depth');
  var uploadEffectLevelValue = document.querySelector('.effect-level__value');
  var uploadPreview = document.querySelector('.img-upload__preview');
  var uploadCommit = document.querySelector('.text__description');
  var textHashtag = uploadForm.querySelector('.text__hashtags');
  var textDescription = document.querySelector('.text__description');
  var scale;
  var scaleChange = 0.25;
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
    if (evt.keyCode === window.util.KeyCode.ESC) {
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
    textHashtag.addEventListener('input', inputHashtagHandler);
    textDescription.addEventListener('input', inputDescriptionHandler);
    uploadMainForm.addEventListener('submit', pressUploadButton);
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
    textHashtag.style = '';
    textDescription.style = '';
    uploadMainForm.reset();
    textHashtag.removeEventListener('input', inputHashtagHandler);
    textDescription.removeEventListener('input', inputDescriptionHandler);
    uploadMainForm.removeEventListener('submit', pressUploadButton);
  };

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

  var getFilter = function (curEffect, levelEffect) {
    var nowEffect = function () {
      return (curEffect.maxvalue - curEffect.minvalue) * levelEffect / LEVEL_MAX + curEffect.minvalue;
    };
    if (valueEffect === 'none') {
      uploadPreviewImg.style.filter = '';
    }
    uploadPreviewImg.style.filter = curEffect.effect + '(' + nowEffect() + curEffect.points + ')';
  };

  uploadFormOpen.addEventListener('change', function () {
    openForm();
  });

  uploadFormClose.addEventListener('click', function () {
    closeForm();
  });

  uploadFormClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.KeyCode.ENTER) {
      closeForm();
    }
  });

  uploadFormControlSmaller.addEventListener('click', scaleControlSmaller);
  uploadFormControlSmaller.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.KeyCode.ENTER) {
      scaleControlSmaller();
    }
  });

  uploadFormControlBigger.addEventListener('click', scaleControlBigger);
  uploadFormControlBigger.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.KeyCode.ENTER) {
      scaleControlBigger();
    }
  });

  effectsParent.addEventListener('click', clickHandler);

  effectHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startLineCoords = effectLine.getBoundingClientRect();

    var mouseMoveHandler = function (moveEvt, levelEffect) {
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

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });

  uploadCommit.addEventListener('focus', function () {
    removeCloseEsc();
  });

  uploadCommit.addEventListener('blur', function () {
    addCloseEsc();
  });

  var inputHashtagHandler = function () {
    var allTags = [];
    allTags = textHashtag.value.trim().toLowerCase().split(' ' || ', ');

    textHashtag.style = '';

    var checkFirstSimbol = function (arr) {
      return arr.some(function (item) {
        return item[0] !== '#';
      });
    };

    var checkOneHashtag = function (arr) {
      return arr.some(function (item) {
        return item === '#' && item.length === 1;
      });
    };

    var checkSpaceBetweenHashtag = function (arr) {
      return arr.every(function (item) {
        return item.indexOf('#') !== item.lastIndexOf('#');
      });
    };

    var sameHashtag = allTags.every(function (elem, i, array) {
      return array.lastIndexOf(elem) === i;
    });

    var checkLengthHashtag = function (arr, max) {
      return arr.some(function (item) {
        return item.length > max;
      });
    };

    if (textHashtag.value.trim() === '') {
      textHashtag.setCustomValidity('');
      textHashtag.style = '';
    } else {
      if (checkFirstSimbol(allTags)) {
        textHashtag.setCustomValidity('Xэш-тег должен начинаться с символа # (решётка)');
        textHashtag.style = ERROR_TAG;
      } else if (checkOneHashtag(allTags)) {
        textHashtag.setCustomValidity('Xеш-тег не может состоять только из одного символа # (решётка)');
        textHashtag.style = ERROR_TAG;
      } else if (!sameHashtag) {
        textHashtag.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
        textHashtag.style = ERROR_TAG;
      } else if (allTags.length > TAG_MAX) {
        textHashtag.setCustomValidity('Нельзя указать больше ' + TAG_MAX + ' хэш-тегов');
        textHashtag.style = ERROR_TAG;
      } else if (checkLengthHashtag(allTags, TAG_LENGT_MAX)) {
        textHashtag.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая символ # (решётка)');
        textHashtag.style = ERROR_TAG;
      } else if (checkSpaceBetweenHashtag(allTags)) {
        textHashtag.setCustomValidity('Xэш-теги должны разделяться пробелами');
        textHashtag.style = ERROR_TAG;
      } else {
        textHashtag.setCustomValidity('');
        textHashtag.style = '';
      }
    }
  };

  var inputDescriptionHandler = function () {
    var allSimbol = textDescription.value.split('');
    textDescription.style = '';

    if (allSimbol.length > COMMENT_LENGT_MAX) {
      textDescription.setCustomValidity('Длина комментария не может составлять больше 140 символов');
      textDescription.style = ERROR_TAG;
    }
  };

  textHashtag.addEventListener('focus', function () {
    removeCloseEsc();
  });

  textHashtag.addEventListener('blur', function () {
    addCloseEsc();
  });

  textDescription.addEventListener('focus', function () {
    removeCloseEsc();
  });

  textDescription.addEventListener('blur', function () {
    addCloseEsc();
  });

  var formSuccessHandler = function () {
    closeForm();
    var similarSucessMessage = document.querySelector('#success')
      .content
      .querySelector('.success');
    var sucessMessage = similarSucessMessage.cloneNode(true);
    document.querySelector('main').appendChild(sucessMessage);

    var success = document.querySelector('.success');

    var successButton = document.querySelector('.success__button');

    var closeSuccessMessage = function () {
      document.querySelector('main').removeChild(success);
      successButton.removeEventListener('click', closeSuccessMessage);
      document.removeEventListener('click', addCloseSuccessMessageClickAll);
    };

    var addCloseEscSuccessMessage = function () {
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.util.KeyCode.ESC) {
          closeSuccessMessage();
        }
      });
    };

    var addCloseSuccessMessageClickAll = function (evt) {
      var clickElement = evt.target;
      if (clickElement.className === 'success') {
        closeSuccessMessage();
      }
    };

    addCloseEscSuccessMessage();
    document.addEventListener('click', addCloseSuccessMessageClickAll);
    successButton.addEventListener('click', closeSuccessMessage);
  };

  var closeErrorMessage = function () {
    var error = document.querySelector('.error');
    document.querySelector('main').removeChild(error);
    document.removeEventListener('click', addCloseErrorMessageClickAll);
  };

  var addCloseErrorMessageClickAll = function (evt) {
    var clickElement = evt.target;
    if (clickElement.className === 'error') {
      closeErrorMessage();
    }
  };

  var formErrorHandler = function () {
    uploadForm.classList.add('hidden');
    var similarErrorMessage = document.querySelector('#error')
      .content
      .querySelector('.error');

    var errorMessage = similarErrorMessage.cloneNode(true);
    errorMessage.querySelector('.error__buttons button:first-child').addEventListener('click', function () {
      uploadForm.classList.remove('hidden');
      closeErrorMessage();
    });

    errorMessage.querySelector('.error__buttons button:last-child').addEventListener('click', function () {
      closeForm();
      closeErrorMessage();
    });

    document.querySelector('main').appendChild(errorMessage);

    var addCloseEscErrorMessage = function () {
      document.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.util.KeyCode.ESC) {
          closeErrorMessage();
        }
      });
    };

    addCloseEscErrorMessage();
    document.addEventListener('click', addCloseErrorMessageClickAll);
  };


  var pressUploadButton = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(uploadMainForm), formSuccessHandler, formErrorHandler);
  };

})();
