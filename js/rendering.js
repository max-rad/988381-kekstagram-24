import {createPictureData} from './data.js';
import {showBigPicture, showComments} from './big-picture.js';

const pictureContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createPictures = () => {
  const pictures = createPictureData();
  const pictureContainerFragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      showBigPicture(picture);
      showComments(picture.comments);
    });

    pictureContainerFragment.appendChild(pictureElement);
  });

  pictureContainer.appendChild(pictureContainerFragment);
};

export {createPictures};


