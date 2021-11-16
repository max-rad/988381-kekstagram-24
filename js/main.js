import {createPictures} from './rendering.js';
import {applyEffect, maxScale, minScale, showFilter, closeFilter, setUserFormSubmit} from './form.js';
import {getData} from './api.js';
import {setDefaultPictures, setDiscussedPictures, setRandomPictures} from './filter.js';


getData((pictures) => {
  createPictures(pictures);
  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
  setDefaultPictures(pictures);
  setRandomPictures(pictures);
  setDiscussedPictures(pictures);
});

showFilter();
setUserFormSubmit(closeFilter);
minScale();
maxScale();
applyEffect();
