const body = document.querySelector('body');
const errorMessageTemplate = document.querySelector('#error').content;
const errorMessage = errorMessageTemplate.querySelector('.error');
const successMessageTemplate = document.querySelector('#success').content;
const successMessage = successMessageTemplate.querySelector('.success');

let messageAlert;

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

function isEscapeKey(evt) {
  return evt.key === 'Escape';
}

function onEscErrorKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    messageAlert.remove();
  }
}

function onEscSuccessKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    messageAlert.remove();
  }
}

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

function debounce(cb, timeout) {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { cb.apply(this, args); }, timeout);
  };
}

export {createArrayOfNumbers, getArrayOfRandomNumbers, isEscapeKey, errorAlert, successAlert, dataAlert, debounce};
