import {clearPictures, createPictures} from './rendering.js';
import {createArrayOfNumbers, debounce, getArrayOfRandomNumbers} from './utils.js';

const MAX_PICTURES = 10;

const imgDefaultFilter = document.querySelector('#filter-default');
const imgRandomFilter = document.querySelector('#filter-random');
const imgDiscussedFilter = document.querySelector('#filter-discussed');

function setActiveButton(btn) {
  const buttons = document.querySelectorAll('.img-filters__button');
  buttons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  btn.classList.add('img-filters__button--active');
}

function setDefaultPictures(pictures) {
  imgDefaultFilter.addEventListener('click', debounce((evt) => {
    evt.preventDefault();
    setActiveButton(imgDefaultFilter);
    clearPictures();
    createPictures(pictures);
  }));
}

function setRandomPictures(pictures) {
  imgRandomFilter.addEventListener('click', debounce((evt) => {
    evt.preventDefault();
    setActiveButton(imgRandomFilter);
    clearPictures();
    const randomArray = getArrayOfRandomNumbers(createArrayOfNumbers(MAX_PICTURES));
    const sortedPictures = [];
    for (let i = 0; i < pictures.slice(1, MAX_PICTURES).length; i++) {
      sortedPictures[i] = pictures[randomArray[i]];
    }
    createPictures(sortedPictures);
  }));
}

function setDiscussedPictures(pictures) {
  imgDiscussedFilter.addEventListener('click', debounce((evt) => {
    evt.preventDefault();
    setActiveButton(imgDiscussedFilter);
    clearPictures();
    const sortedPictures = pictures.slice().sort((a, b) => b.comments.length - a.comments.length);
    createPictures(sortedPictures);
  }));
}

export {setDefaultPictures, setRandomPictures, setDiscussedPictures};
