import { isEscKey } from "./utils.js";

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCancelElement = bigPictureElement.querySelector('.big-picture__cancel');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const commentItemElement = bigPictureElement.querySelector('.social__comment');
const commentsCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoadElement = bigPictureElement.querySelector('.comments-loader');

const LOAD_COMMENT_COUNT = 5; 
let renderedComments = LOAD_COMMENT_COUNT;

/**
 * @function createComment - Функция по отображению информации сколько комментариев из скольки возможных отображено на странице 
 */
const createComment = (comments) => {
    if (renderedComments >= comments.length) {
        renderedComments = comments.length;
        commentsLoadElement.classList.add('hidden');
    } else {
        commentsLoadElement.classList.remove('hidden');
    }
    commentsCountElement.innerHTML = `${renderedComments} из <span class="comments-count">${comments.length}</span> комментариев`;
    const commentItemElement = commentsListElement.querySelectorAll('.social__comment');
    for (let i = 0; i < renderedComments; i++) {
        commentItemElement[i].classList.remove('hidden');
    }
  };

/**
  * @function renderComments - функция выполняющая отрисовку пользовательских комментариев к фото.
  */ 
const renderComments = (comments) => {
        commentsListElement.innerHTML = "";
        const commentsListFragment = document.createDocumentFragment();
        comments.forEach(({avatar, message, name}) => {
          const comment = commentItemElement.cloneNode(true);
          const commentPicture = comment.querySelector('.social__picture');
          commentPicture.src = avatar;
          commentPicture.alt = name;
          comment.querySelector('.social__text').innerText = message;
          comment.classList.add('hidden');
          commentsListElement.append(comment);
        });
        commentsListElement.append(commentsListFragment);
        createComment(comments);
    };


/**
 * @function openBigPhoto функция которая при клике на миниатюру отрисовываем полноразмерное фото с комментариями.
 */
const openBigPhoto = ({url, likes, comments, description}) => {
    bigPictureElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', onDocumentKeydown);
    bigPictureCancelElement.addEventListener('click', onCloseButtonClick);
    bigPictureElement.querySelector('.big-picture__img img').src = url;
    bigPictureElement.querySelector('.likes-count').textContent = likes;
    bigPictureElement.querySelector('.comments-count').textContent = comments.length;
    renderComments(comments);
    bigPictureElement.querySelector('.social__caption').textContent = description;
    commentsLoadElement.addEventListener('click', onLoadButtonClick);    
};

/**
*@function onDocumentKeydown - функция обработчик нажатия клавищи Esc.
 */
function onDocumentKeydown(evt) {
    if (isEscKey(evt)) {
      evt.preventDefault();
      closeBigPhoto();
    }
  }
  
  /**
   * @function onCloseButtonClick - обработчик нажатия на крестик(закрытие) модального окна с большим фото.
   */
  function onCloseButtonClick() {
    closeBigPhoto();
  }
  
  /**
   * @function onLoadButtonClick - функция обработчик нажатия на загрузку дополнительных комментариев.
   */
  function onLoadButtonClick() {
    const comments = commentsListElement.children;
    renderedComments += LOAD_COMMENT_COUNT;
    createComment(comments);
  }
  
  /**
   * @function closeBigPhoto - функция реализующая закрытие модального окна с отображаемой большй фоторгафией.
   */
  function closeBigPhoto() {
    bigPictureElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onDocumentKeydown);
    bigPictureCancelElement.removeEventListener('click', onCloseButtonClick);
    commentsLoadElement.removeEventListener('click', onLoadButtonClick);
    renderedComments = LOAD_COMMENT_COUNT;
  }

export {openBigPhoto};



