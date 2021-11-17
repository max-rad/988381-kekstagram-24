import {isEscapeKey} from './utils.js';

const MAX_SHOW_COMMENTS = 5;

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const socialComments = document.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment');
const socialCommentsCount = document.querySelector('.social__comment-count');
const socialCommentsLoader = document.querySelector('.social__comments-loader');

function onPopupEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
  }
}

function openModal() {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);
}

function closeModal() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupEscKeydown);
}

function createCommentFragment(comment) {
  const commentFragment = socialComment.cloneNode(true);
  commentFragment.querySelector('.social__picture').src = comment.avatar;
  commentFragment.querySelector('.social__picture').alt = comment.name;
  commentFragment.querySelector('.social__text').textContent = comment.message;
  return commentFragment;
}

function addComments(comments) {
  const commentContainerFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    commentContainerFragment.append(createCommentFragment(comment));
  });

  socialComments.innerHTML = '';
  socialComments.append(commentContainerFragment);
}

function showComments(comments) {
  let loadedComments = 0;
  if (comments.length <= MAX_SHOW_COMMENTS) {
    addComments(comments);
  } else {
    addComments(comments.slice(0, MAX_SHOW_COMMENTS));
    loadedComments += MAX_SHOW_COMMENTS;
  }

  socialCommentsLoader.addEventListener('click', () => {
    loadedComments += MAX_SHOW_COMMENTS;
    if (loadedComments >= comments.length) {
      addComments(comments);
      socialCommentsLoader.classList.add('hidden');
      socialCommentsCount.textContent = `${comments.length} из ${comments.length} комментариев`;
    } else {
      addComments(comments.slice(0, loadedComments));
      socialCommentsCount.textContent = `${loadedComments} из ${comments.length} комментариев`;
    }
  });
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
    return socialCommentsLoader.classList.add('hidden');
  }
  return socialCommentsLoader.classList.remove('hidden');
}

bigPictureCancel.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeModal();
});

export {showBigPicture, showComments};
