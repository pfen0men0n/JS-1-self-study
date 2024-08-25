const MAX_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;
const STEP_SCALE_VALUE = 25;
const DEFAULT_SCALE_VALUE = 100;

const smallerButtonElement = document.querySelector('.scale__control--smaller');
const biggerButtonElement = document.querySelector('.scale__control--bigger');
const scaleControlInputElement = document.querySelector('.scale__control--value');
const imgUploadPreviewElement = document.querySelector('.img-upload__preview img');

/**
 * @function imagePreviewScale функция отрисовывающая изменения в масштабе превью загружаемой картинки.
 * С помощью свойства transform у стиля, позволяет изменять масштаб изображения. 
 * Далее присваиваем значение в input отвечающий за визуальнцю отрисовку текущего значения масштаба.
 * @param {*} value принимаемый параметр 
 */
const imagePreviewScale = (value = DEFAULT_SCALE_VALUE) => {
    imgUploadPreviewElement.style.transform = `scale(${value / 100})`;
    scaleControlInputElement.value = `${value}%`;
};

/**
 * @function onSmallerButtonClick функция обработчик изменения масштаба картинки при клике на кнопку её уменьшения
 * @constant currentValue присваиваем константе с помощью функции parseInt целое число с десятиричной системой исчесления из поля инпута текущего значения масштаба.
 * @let Далее переменной newValue присваиваем значение получаемое в результате вычисления из currentValue на шаг изменения масштаба (STEP_SCALE_VALUE).
 * @if При условии, если значение переменной newValue стало меньше, чем минимально допустимое значение масштаба MIN_SCALE_VALUE, переменная newValue принимает значение 
 * минимального допустимого значения масштаба MIN_SCALE_VALUE.
 * @function imagePreviewScale вызывается эта функция которая принимает
 * @param {*} newValue
 * И таким образом происходит перезапись и отрисовка значения инпута текущего масштаба и изменение размера картинки
 */
const onSmallerButtonClick = () => {
    const currentValue = parseInt(scaleControlInputElement.value, 10);
    let newValue = currentValue - STEP_SCALE_VALUE
    if (newValue < MIN_SCALE_VALUE) {
        newValue = MIN_SCALE_VALUE;
    }
    imagePreviewScale(newValue);
};

/**
 * @function onBiggerButtonClick функция обработчик изменения масштаба картинки при клике на кнопку её увеличения
 * @constant currentValue присваиваем константе с помощью функции parseInt целое число с десятиричной системой исчесления из поля инпута текущего значения масштаба.
 * @let Далее переменной newValue присваиваем значение получаемое в результате сложения значения из переменной currentValue на шаг увеличения масштаба (STEP_SCALE_VALUE).
 * @if При условии, если значение переменной newValue стало больше, чем максимально допустимое значение масштаба MAX_SCALE_VALUE, переменная newValue принимает значение 
 * максимально допустимого значения масштаба MAX_SCALE_VALUE.
 * @function imagePreviewScale вызывается эта функция которая принимает
 * @param {*} newValue
 * И таким образом происходит перезапись и отрисовка значения инпута текущего масштаба и изменение размера картинки
 */
const onBiggerButtonClick = () => {
    const currentValue = parseInt(scaleControlInputElement.value, 10);
    let newValue = currentValue + STEP_SCALE_VALUE;
    if (newValue > MAX_SCALE_VALUE) {
        newValue = MAX_SCALE_VALUE;
    }
    imagePreviewScale(newValue);
};

/**
 * @function resetPicturescale коллбэк функция сброса параметров картинки к параметрам по умолчанию
 */
const resetPicturescale = () => {
    imagePreviewScale();
};


smallerButtonElement.addEventListener('click', onSmallerButtonClick);
biggerButtonElement.addEventListener('click', onBiggerButtonClick);

export { resetPicturescale };

