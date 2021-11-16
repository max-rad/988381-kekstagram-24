const ALERT_SHOW_TIME = 5000;

const body = document.querySelector('body');
const errorMessageTemplate = document.querySelector('#error').content;
const errorMessage = errorMessageTemplate.querySelector('.error');
const successMessageTemplate = document.querySelector('#success').content;
const successMessage = successMessageTemplate.querySelector('.success');

let messageAlert;

function getRandomIntegerNumber (min, max) {
  if (min > max || min === max) {
    throw new Error();
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloatNumber (min, max) {
  if (min > max || min === max) {
    throw new Error();
  }

  return Math.random() * (max - min + 1) + min;
}

getRandomFloatNumber(1, 10);

function createArrayOfNumbers(length) {
  return Array.from({length: length}, (v, i) => i + 1);
}

function getArrayOfRandomNumbers(array) {
  const result = [];
  let arrayLength = array.length;
  let index = 0;

  while (arrayLength--) {
    index = Math.floor(Math.random() * (arrayLength + 1));
    result.push(array[index]);
    array.splice(index, 1);
  }
  return result;
}

function checkMaxStringLength(string, maxLength) {
  return string.length <= maxLength;
}

checkMaxStringLength('String', 10);

function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const onEscErrorKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    messageAlert.remove();
  }
};

const onEscSuccessKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    messageAlert.remove();
  }
};

function errorAlert() {
  messageAlert = errorMessage.cloneNode(true);
  body.appendChild(messageAlert);

  messageAlert.querySelector('.error__button').addEventListener('click', () => {
    messageAlert.remove();

    document.removeEventListener('keydown', onEscErrorKeydown);
  });

  document.addEventListener('keydown', onEscErrorKeydown);

  document.addEventListener('click', (evt) => {
    if (evt.target.contains(messageAlert)) {
      messageAlert.remove();
    }
  });
}

function successAlert() {
  messageAlert = successMessage.cloneNode(true);
  body.appendChild(messageAlert);

  messageAlert.querySelector('.success__button').addEventListener('click', () => {
    messageAlert.remove();

    document.removeEventListener('keydown', onEscSuccessKeydown);
  });

  document.addEventListener('keydown', onEscSuccessKeydown);

  document.addEventListener('click', (evt) => {
    if (evt.target.contains(messageAlert)) {
      messageAlert.remove();
    }
  });
}

function dataAlert() {
  messageAlert = errorMessage.cloneNode(true);
  messageAlert.querySelector('h2').textContent = 'Ошибка загрузки данных с сервера';
  messageAlert.querySelector('button').textContent = 'Обновите страницу';
  body.appendChild(messageAlert);

  messageAlert.querySelector('.error__button').addEventListener('click', () => {
    messageAlert.remove();

    document.removeEventListener('keydown', onEscErrorKeydown);
  });

  document.addEventListener('keydown', onEscErrorKeydown);

  document.addEventListener('click', (evt) => {
    if (evt.target.contains(messageAlert)) {
      messageAlert.remove();
    }
  });
}

const debounce = (cb, timeout) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { cb.apply(this, args); }, timeout);
  };
};

export {getRandomIntegerNumber, createArrayOfNumbers, getArrayOfRandomNumbers, isEscapeKey, errorAlert, successAlert, dataAlert ,showAlert, debounce};
