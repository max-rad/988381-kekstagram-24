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

export {getRandomIntegerNumber, createArrayOfNumbers, getArrayOfRandomNumbers, isEscapeKey};
