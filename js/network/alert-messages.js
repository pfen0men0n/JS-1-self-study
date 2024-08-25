import { isEscKey } from '../utilites/utils.js';

const successMessageElement = document.querySelector('#success').content.querySelector('.success');
const errorMessageElement = document.querySelector('#error').content.querySelector('.error');
const successButtonElement = successMessageElement.querySelector('.success__button');
const errorButtonElement = errorMessageElement.querySelector('.error__button');


let typeMessage;

/**
 * @function onErrorSussessPopupEscKeydown функция-обработчик нажатия кнопки Esc при показе попапа об успешной/неуспешной отправке данных на сервер
 * @param {*} evt 
 */
const onErrorSussessPopupEscKeydown = (evt) => {
  if(isEscKey(evt)) {
    evt.preventDefault();
    closeErrorSuccessPopup();
  }
};

/**
 * @function onErrorSuccessPopupClose функция обработчик закрытия попапа об успешной/неуспешной отправке данных на сервер
 * @param {*} evt 
 */
const onErrorSuccessPopupClose = (evt) => {
  if (evt.target === typeMessage) {
    closeErrorSuccessPopup();
  }
};

/**
 * @function closeErrorSuccessPopup функция закрытия попапа об успешной/неуспешной отправке данных на сервер
 */
function closeErrorSuccessPopup() {
  typeMessage.remove();
  document.removeEventListener('keydown', onErrorSussessPopupEscKeydown);
  document.removeEventListener('click',onErrorSuccessPopupClose);
}

/** 
 * @function showSuccessMessagePopup функция отрисовки попапа об успешной отправке данных на сервер
 */
const showSuccessMessagePopup = () => {
  typeMessage = successMessageElement;
  document.body.append(successMessageElement);
  successButtonElement.addEventListener('click', closeErrorSuccessPopup);
  document.addEventListener('keydown', onErrorSussessPopupEscKeydown);
  document.addEventListener('click', onErrorSuccessPopupClose);
};

/**
 * @function showErrorMessagePopup функция отрисовки попапа о неудачной отправке данных на сервер
 */
const showErrorMessagePopup = () => {
  typeMessage = errorMessageElement;
  document.body.append(errorMessageElement);
  errorButtonElement.addEventListener('click', closeErrorSuccessPopup);
  document.addEventListener('keydown', onErrorSussessPopupEscKeydown);
  document.addEventListener('click', onErrorSuccessPopupClose);
};

export { showSuccessMessagePopup, showErrorMessagePopup };