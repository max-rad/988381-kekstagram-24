import {isEscapeKey} from './utils.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const socialComments = document.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment');
const socialCommentsCount = document.querySelector('.social__comment-count');
const socialCommentsLoader = document.querySelector('.social__comments-loader');

const MAX_SHOW_COMMENTS = 5;

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
};

function openModal() {
  bigPicture.classList.remove('hidden');
  /*socialCommentsCount.classList.add('hidden');
  socialCommentsLoader.classList.add('hidden');*/
  body.classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);
}

function closeModal() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupEscKeydown);
}

function showComments(comments) {
  const commentContainerFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    const commentFragment = socialComment.cloneNode(true);
    commentFragment.querySelector('.social__picture').src = comment.avatar;
    commentFragment.querySelector('.social__picture').alt = comment.name;
    commentFragment.querySelector('.social__text').textContent = comment.message;

    commentContainerFragment.append(commentFragment);
  });
  socialComments.innerHTML = '';
  socialComments.append(commentContainerFragment);
}

function showBigPicture(picture) {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__caption').textContent = picture.description;

  openModal();
  socialCommentsCount.textContent = `${MAX_SHOW_COMMENTS} из ${picture.comments.length} комментариев`;
  if (picture.comments.length < MAX_SHOW_COMMENTS) {
    socialCommentsCount.textContent = `${picture.comments.length} из ${picture.comments.length} комментариев`;
  }
  if (picture.comments.length <= MAX_SHOW_COMMENTS) {
    socialCommentsLoader.classList.add('hidden');
  }
}

socialCommentsLoader.addEventListener('click', (evt) => {
  evt.preventDefault();

});

bigPictureCancel.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeModal();
});

export {showBigPicture, showComments};
