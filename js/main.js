function getRandomIntegerNumber (min, max) {
  if (min > max || min === max) {
    throw new Error();
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomIntegerNumber(1, 10);

function getRandomFloatNumber (min, max) {
  if (min > max || min === max) {
    throw new Error();
  }

  return Math.random() * (max - min + 1) + min;
}

getRandomFloatNumber(1, 10);

function checkMaxStringLength(string, maxLength) {
  return string.length <= maxLength;
}

checkMaxStringLength('String', 10);
