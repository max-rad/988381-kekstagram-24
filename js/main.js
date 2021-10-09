function getRandomNumber (min, max) {
  if (min > max || min === max) {
    return;
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomNumber(1, 10);

function checkMaxStringLength(string, maxLength) {
  return string.length <= maxLength;
}

checkMaxStringLength('String', 10);
