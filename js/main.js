const AMOUNT_OF_OBJECTS = 25;
const AMOUNT_OF_COMMENTS = getRandomIntegerNumber(1, 3);
const ARRAY_OF_ID = getArrayOfRandomNumbers(createArrayOfNumbers(1, 25));
const ARRAY_OF_URL = getArrayOfRandomNumbers(createArrayOfNumbers(1, 25));
const ARRAY_OF_COMMENT_ID = getArrayOfRandomNumbers(createArrayOfNumbers(1, 10000));

const DESCRIPTION = [
  'Смотрим футбол вместе с друзьями',
  'Красивое небо после дождя',
  'Поле, усеянное цветами',
  '50 оттенков серого Петербурга',
  'Веселимся...',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Максим',
  'Андрей',
  'Алексей',
  'Саша',
  'Ксения',
  'Павел',
]

function getRandomIntegerNumber (min, max) {
  if (min > max || min === max) {
    throw new Error();
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomIntegerNumber(1, 25);

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

function createArrayOfNumbers(start, end) {
  const array = [];

  for (let i = start; i <= end; i++) {
    array.push(i);
  }

  return array;
}

console.log(createArrayOfNumbers(1, 25));

function getArrayOfRandomNumbers(array) {
  const result = [];
  let i = array.length;
  let j = 0;

  while (i--) {
    j = Math.floor(Math.random() * (i + 1));
    result.push(array[j]);
    array.splice(j, 1);
  }
  return result;
}

console.log(getArrayOfRandomNumbers(createArrayOfNumbers(1, 25)));

const createCommentData = function (index) {
  return {
    id: ARRAY_OF_COMMENT_ID[index],
    avatar: 'img/avatar-' + getRandomIntegerNumber(1, 6) + '.svg',
    message: MESSAGES[getRandomIntegerNumber(0, MESSAGES.length - 1)],
    name: NAMES[getRandomIntegerNumber(0, NAMES.length - 1)],
  };
};

const comments = [];

for (let i = 0; i < AMOUNT_OF_COMMENTS; i++) {
  comments[i] = createCommentData(i);
}

console.log(comments);

const createObject = function(index) {
  return {
    id: ARRAY_OF_ID[index],
    url: 'photos/' + ARRAY_OF_URL[index] + '.jpg',
    description: DESCRIPTION[getRandomIntegerNumber(0, DESCRIPTION.length - 1)],
    likes: getRandomIntegerNumber(15, 200),
    comments: comments,
  };
};

const objects = [];

for (let i = 0; i < AMOUNT_OF_OBJECTS; i++) {
  objects[i] = createObject(i);
}

console.log(objects);
