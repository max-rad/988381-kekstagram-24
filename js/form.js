import {isEscapeKey} from './utils.js';

const body = document.querySelector('body');
const imageUpload = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadPreview = document.querySelector('.img-upload__preview img');
const uploadCancel = document.querySelector('.img-upload__cancel');
const scaleControlValue = document.querySelector('.scale__control--value');
const scaleControlSmaller =  document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const effectsList = document.querySelector('.effects__list');
const effectsRadio = effectsList.querySelectorAll('.effects__radio');
const effectLevel = document.querySelector('.effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const textHashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const HASHTAG_PATTERN = /[^A-Za-zА-Яа-яЁё0-9]{1,19}/;
const HASHTAG_MAX_LENGTH = 20;
const HASHTAG_MAX_AMOUNT = 5;
const COMMENT_MAX_LENGTH = 140;

let scaleValue = 100;
const effectValues = {
  'none': () => {
    uploadPreview.style.filter = 'none';
  },
  'chrome': (effectValue) => {
    uploadPreview.style.filter = `grayscale(${effectValue})`;
  },
  'sepia': (effectValue) => {
    uploadPreview.style.filter = `sepia(${effectValue})`;
  },
  'marvin': (effectValue) => {
    uploadPreview.style.filter = `invert(${effectValue}%)`;
  },
  'phobos': (effectValue) => {
    uploadPreview.style.filter = `blur(${effectValue}px)`;
  },
  'heat': (effectValue) => {
    uploadPreview.style.filter = `brightness(${effectValue})`;
  },
};
const SCALE_BORDERS = {
  min: 25,
  max: 100,
};
const SCALE_STEP = 25;

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeFilter();
  }
};

function openFilter() {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  uploadPreview.classList.add('effects__preview--none');
  effectLevel.classList.add('hidden');
  document.addEventListener('keydown', onPopupEscKeydown);
}
function closeFilter() {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
}

function showFilter() {
  imageUpload.addEventListener('change', (evt) => {
    evt.preventDefault();
    openFilter();
    uploadPreview.src = URL.createObjectURL(imageUpload.files[0]);
    scaleControlValue.value = `${scaleValue}%`;
    uploadPreview.style.transform = `scale(${scaleValue/100})`;
  });
}

uploadCancel.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeFilter();
});

const minScale = () => {
  scaleControlSmaller.addEventListener('click', () => {
    if (scaleValue !== SCALE_BORDERS.min) {
      scaleControlValue.value = `${scaleValue - SCALE_STEP}%`;
      scaleValue -= SCALE_STEP;
      uploadPreview.style.transform = `scale(${scaleValue/100})`;
    }
  });
};

const maxScale = () => {
  scaleControlBigger.addEventListener('click', () => {
    if (scaleValue !== SCALE_BORDERS.max) {
      scaleControlValue.value = `${scaleValue + SCALE_STEP}%`;
      scaleValue += SCALE_STEP;
      uploadPreview.style.transform = `scale(${scaleValue/100})`;
    }
  });
};

noUiSlider.create(effectLevelSlider, {
  start: 1,
  step: 0.1,
  range: {
    min: 0,
    max: 1,
  },
});

const applyEffect = () => {
  effectsRadio.forEach((effect) => {
    effect.addEventListener('click', () => {
      effectLevel.classList.remove('hidden');
      uploadPreview.removeAttribute('class');
      uploadPreview.classList.add(`effects__preview--${effect.value}`);

      effectLevelSlider.noUiSlider.on('update', (values, handle) => {
        effectLevelValue.value = values[handle];
        effectValues[effect.value](effectLevelValue.value);
      });
      switch (effect.value) {
        case 'chrome':
          effectLevelSlider.noUiSlider.updateOptions({
            start: 1,
            step: 0.1,
            range: {
              min: 0,
              max: 1,
            },
          });
          break;
        case 'sepia':
          effectLevelSlider.noUiSlider.updateOptions({
            start: 1,
            step: 0.1,
            range: {
              min: 0,
              max: 1,
            },
          });
          break;
        case 'marvin':
          effectLevelSlider.noUiSlider.updateOptions({
            start: 100,
            step: 1,
            range: {
              min: 0,
              max: 100,
            },
          });
          break;
        case 'phobos':
          effectLevelSlider.noUiSlider.updateOptions({
            start: 3,
            step: 0.1,
            range: {
              min: 0,
              max: 3,
            },
          });
          break;
        case 'heat':
          effectLevelSlider.noUiSlider.updateOptions({
            start: 3,
            step: 0.1,
            range: {
              min: 1,
              max: 3,
            },
          });
          break;
        case 'none':
          effectLevel.classList.add('hidden');
          break;
      }
    });
  });
};

textHashtags.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

textDescription.addEventListener('keydown', (evt) => {
  evt.stopPropagation();
});

textHashtags.addEventListener('input', () => {
  const invalidMessage = [];
  textHashtags.setCustomValidity('');
  const hashtagText = textHashtags.value.toLowerCase().trim();
  const hashtags = hashtagText.split(/\s+/);
  if (hashtags.length === 0) {
    return;
  }

  if (hashtags.some((hashtag) => hashtag[0] !== '#')) {
    invalidMessage.push('Хэштег должен начинаться с символа #');
  }

  if (hashtags.some((hashtag) => HASHTAG_PATTERN.test(hashtag.slice(1))) === true) {
    invalidMessage.push('Хэштег не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.');
  }

  if (hashtags.some((hashtag) => hashtag === '#')) {
    invalidMessage.push('Хэштег не может состоять только из одной решетки');
  }

  if (hashtags.some((hashtag) => hashtag.length > HASHTAG_MAX_LENGTH)) {
    invalidMessage.push('Максимальная длина одного хэш-тега 20 символов, включая решётку');
  }

  if (hashtags.some((hashtag) => hashtag.indexOf('#', 1) >= 1)) {
    invalidMessage.push('Хэш-теги разделяются пробелами');
  }

  if (hashtags.some((hashtag, i, array) => array.indexOf(hashtag, i + 1) >= i + 1)) {
    invalidMessage.push('Один и тот же хэш-тег не может быть использован дважды');
  }

  if (hashtags.length > HASHTAG_MAX_AMOUNT) {
    invalidMessage.push('Нельзя указать больше пяти хэш-тегов');
  }

  if (invalidMessage.length > 0) {
    textHashtags.setCustomValidity(invalidMessage.join('.\n'));
  }
  textHashtags.reportValidity();
});

textDescription.addEventListener('input', () => {
  const commentLength = textDescription.value.length;

  if (commentLength > COMMENT_MAX_LENGTH) {
    textDescription.setCustomValidity('Длина комментария не может составлять больше 140 символов');
  }
  textDescription.reportValidity();
});

export {showFilter, minScale, maxScale, applyEffect};

