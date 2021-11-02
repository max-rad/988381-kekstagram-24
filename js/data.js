import * as util from './utils.js';

const AMOUNT_OF_PICTURES = 25;
const COMMENTS = {
  min: 1,
  max: 3,
};
const LIKES = {
  min: 15,
  max: 200,
};
const AVATARS = {
  min: 1,
  max: 6,
};

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
];

function createCommentData(amount) {
  const comments = [];
  const commentIds = util.getArrayOfRandomNumbers(util.createArrayOfNumbers(10000));
  for (let i = 0; i < amount; i++) {
    comments[i] = {
      id: commentIds[i],
      avatar: `img/avatar-${  util.getRandomIntegerNumber(AVATARS.min, AVATARS.max)  }.svg`,
      message: MESSAGES[util.getRandomIntegerNumber(0, MESSAGES.length - 1)],
      name: NAMES[util.getRandomIntegerNumber(0, NAMES.length - 1)],
    };
  }
  return comments;
}

function createPictureData() {
  const pictures = [];
  const pictureIds = util.getArrayOfRandomNumbers(util.createArrayOfNumbers(25));
  const urls = util.getArrayOfRandomNumbers(util.createArrayOfNumbers(25));

  for (let i = 0; i < AMOUNT_OF_PICTURES; i++) {
    pictures[i] = {
      id: pictureIds[i],
      url: `photos/${  urls[i]  }.jpg`,
      description: DESCRIPTION[util.getRandomIntegerNumber(0, DESCRIPTION.length - 1)],
      likes: util.getRandomIntegerNumber(LIKES.min, LIKES.max),
      comments: createCommentData(util.getRandomIntegerNumber(COMMENTS.min, COMMENTS.max)),
    };
  }
  return pictures;
}

export {createPictureData};
