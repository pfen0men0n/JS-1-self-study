import { isEscKey } from '../utilites/utils.js';
import { resetPicturescale } from './scale-edit.js';
import { resetEffects } from './effects-edit.js';
import { showErrorMessagePopup, showSuccessMessagePopup } from '../network/alert-messages.js';
import { sendData } from '../network/api.js';

const MAX_HASHTAG_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;
const VALID_HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i;

const imgFormElement = document.querySelector('.img-upload__form');
const imgUploadFileElement = imgFormElement.querySelector('#upload-file');
const imgUploadOverlayElement = imgFormElement.querySelector('.img-upload__overlay');
const canceleButtonElement = imgUploadOverlayElement.querySelector('.img-upload__cancel');
const hashTagTextFieldElement = imgUploadOverlayElement.querySelector('.text__hashtags');
const commentTextFieldElement = imgUploadOverlayElement.querySelector('.text__description');
const submitButton = imgFormElement.querySelector('.img-upload__submit');

const pristine = new Pristine(imgFormElement, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'img-upload__field-wrapper--error',
}, true);

/**
 * @function isValidCommentLength функция проверки длины комментария
 * @param {*} value в качестве параметра принимает значение длины строки комментария
 * @returns если условие выполняется возвращает true
 */
function isValidCommentLength(value) {
    if (value.length <= MAX_COMMENT_LENGTH) {
        return true;
    }
    
};

/**
 * @function isValidHashTag функция проверки валидности хештега 
 * @param {*} tag в качестве параметра принимает вводимое в поле хештега значение 
 * @returns возвращает булево знаечение true если хештег валиден и false если хештег не валиден
 */
function isValidHashTag(tag) {
    return VALID_HASHTAG.test(tag);
};

/**
 * @function normalizeHashtags функция нормализации хештегов
 * @param {*} tags в качестве параметра принимает введенные в поле хештеги
 * @returns возвращает хештеги с удалением пробелов перед и после них, приводит их к нижнему регистру, а так же разделяет их пробелами
 */
function normalizeHashtags(tags) {
    return tags.trim().toLowerCase().split(' ');
};

/**
 * @function isNormalizedHashtags функция проверки нормализации хештегов
 * @param {*} value в качестве параметра принимает количество введенных в поле хештегов
 * @if проверка условия если количество хештегов равно 0
 * @returns булуво значение true
 * @if дополнительная ветка условия, если количество хештегов больше 0
 * @returns @method every() метод проверяет каждый элемент массива, но то, удовлетворяет ли он всем требованиям передавамым в функции isValidHashTag
 */
function isNormalizedHashtags(value) {
    if (value.length === 0) {
    return true;
    }
    return normalizeHashtags(value).every((tag) => isValidHashTag(tag));
};

/**
 * @function validateHashtagsAmount функция проверки максимального количества введенных в поле хештегов
 * @param {*} value в качестве параметра принимает количество введенных в поле хештегов 
 * @returns возвращает булево значение true если количество хештегов равно максимально допустимому количеству и false если их больше
 */
function validateHashtagsAmount(value) {
    return normalizeHashtags(value).length <= MAX_HASHTAG_COUNT;
};

/**
 * @function isHashtagsReapits функция проверки на повторяющиеся хештеги
 * @param {*} value в качестве параметра принимает введенные хештеги
 * @constant tagArray объявляется переменная, массив хештегов в которую записываются значения всех "нормализованных" хештегов
 * @returns тут мы сравниваем длину массива с размером новой коллекции созданной при помощи метода Set().size, если они равны значит все значения уникальны и проверка пройдет
 */
function isHashtagsReapits(value) {
    const tagArray = normalizeHashtags(value);
    return tagArray.length === new Set(tagArray).size;
};

/**
 * @function addPristineValidation функция валидации формы с полями хештегов и комментария
 */
function addPristineValidation () {
    imgFormElement.addEventListener('submit', setUserFormSubmit);
    pristine.addValidator(hashTagTextFieldElement, isNormalizedHashtags, `неправильный хештег, либо его длина более 20 символов`);
    pristine.addValidator(hashTagTextFieldElement, isHashtagsReapits, `хештеги не должны повтаряться`);
    pristine.addValidator(hashTagTextFieldElement, validateHashtagsAmount, `количество хештегов не должно превышать более ${MAX_HASHTAG_COUNT} штук`);
    pristine.addValidator(commentTextFieldElement, isValidCommentLength, `длина сообщения не должна превышать более ${MAX_COMMENT_LENGTH} символов`);
};

/**
 * @function onDocumentEscKeydown функция обработчик нажатия клавиши Esc
 * @param {*} evt в качестве параметра принимает событие
 * @if содерждит условия
 * - если нажата клавиша Esc, отменяет действие по умолчанию
 * - если при этом какое либо из полей, поле для ввода хештегов, или же поле для ввода комментария в фокусе, то модалка не закроется.
 */
function onDocumentEscKeydown(evt) {
    if (isEscKey(evt)) {
    if (!(hashTagTextFieldElement === document.activeElement || commentTextFieldElement === document.activeElement)) {
        if (document.querySelector('.error') === null) {
            evt.preventDefault();
            closeModalWindow();
          }
        }
      }
    };

/**
 * @function openModalWindow функция обработчик открытия модального окна
 */
function openModalWindow() {
    imgUploadOverlayElement.classList.remove('hidden');
    document.body.classList.add('modal-open');
    canceleButtonElement.addEventListener('click', onCanceleButtonClick);
    document.addEventListener('keydown', onDocumentEscKeydown);
};

/**
 * @function closeModalWindow функция обработчик закрытия модального окна
 */
function closeModalWindow() {
    resetPicturescale();
    resetEffects();
    pristine.reset();
    imgFormElement.reset();
    imgUploadOverlayElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
    canceleButtonElement.removeEventListener('click', onCanceleButtonClick);
    document.removeEventListener('keydown', onDocumentEscKeydown);

};

/**
 * @function onUploadFieldElementChange функция открытия модального окна
 */
const onUploadFieldElementChange = () => {
    openModalWindow();
};

/**
 * @function onCanceleButtonClick функция обработчик нажатия на крестик для закрытия модального окна
 */
const onCanceleButtonClick = () => {
    closeModalWindow();
};

imgUploadFileElement.addEventListener('change', onUploadFieldElementChange);
canceleButtonElement.addEventListener('click', onCanceleButtonClick);

/**
* @function addValidationAndListeners функция добавления валидаторов и обработчиков событий
*/
function addValidationAndListeners () {
    imgUploadFileElement.addEventListener('submit', openModalWindow);
    addPristineValidation();
};

/**
* @function blockSubmitButton функция блокировки кнопки отправки данных из формы на сервер
*/
const blockSubmitButton = () => {
    submitButton.disabled = true;
    submitButton.textContent = 'Публикую...';
};
  
/**
* @function unBlockSubmitButton функция разблокировки кнопки отправки данных из формы на сервер
*/
const unBlockSubmitButton = () => {
    submitButton.disabled = false;
    submitButton.textContent = 'Опубликовать';
};
  
/**
* @function setUserFormSubmit функция сеттер, которая устанавливает определенный набор действий, в зависимости от того успешна ли отправка данных из формы на сервер или нет. 
* @param {*} evt принимаемый параметр - событие
*/
function setUserFormSubmit (evt) {
  
    const isValid = pristine.validate();
        evt.preventDefault();
            if (isValid) {
                blockSubmitButton();
                    sendData(
                        () => {
                            showSuccessMessagePopup();
                            unBlockSubmitButton();
                            closeModalWindow();
    },
        () => {
            showErrorMessagePopup();
            unBlockSubmitButton();
        },
            new FormData(evt.target)
      );
    }
};
  

export { addValidationAndListeners };

