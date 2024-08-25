const EFFECTS_LIST = [
    {name: 'none', min: 1, max: 100, step: 1, start: 100,},
    {name: 'chrome', style: 'grayscale', min: 0, max: 1, step: 0.1, unit: '',},
    {name: 'sepia', style: 'sepia', min: 0, max: 1, step: 0.1, unit: '',},
    {name: 'marvin', style: 'invert', min: 0, max: 100, step: 1, unit: '%',},
    {name: 'phobos', style: 'blur', min: 0, max: 3, step: 0.1, unit: 'px',},
    {name: 'heat', style: 'brightness', min: 1, max: 3, step: 0.1, unit: '',}
];

const DEFAULT_EFFECT = EFFECTS_LIST[0];

const imgFormElement = document.querySelector('.img-upload__form');
const imgUploadPreviewElement = document.querySelector('.img-upload__preview img');
const sliderContainerElement = document.querySelector('.effect-level');
const effectLevelValueElement = document.querySelector('.effect-level__value');
const sliderElement = sliderContainerElement.querySelector('.effect-level__slider');

let chosenEffect = DEFAULT_EFFECT;

/**
 * @function isDefaulEffect функция проверки что переменная chosenEffect равна значению присвоенному в константе DEFAULT_EFFECT.
 * @returns булево значение true, если проверка проходит и false если проверка не проходит.
 */
const isDefaulEffect = () => chosenEffect === DEFAULT_EFFECT;

/**
 * @function updateSlider функция для обновления настроек параметров слайдера, а так же, в некоторых случаях, его уничтожения.
 */
const updateSlider = () => {
    sliderContainerElement.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
        range: {
            min: chosenEffect.min,
            max: chosenEffect.max,
        },
        start: chosenEffect.max,
        step: chosenEffect.step,
    });

    if(isDefaulEffect()) {
        sliderContainerElement.classList.add('hidden');
    }

};

/**
 * @function onFormChange функция обработчик выбора эффекта для изображения.
 */
const onFormChange = (evt) => {
    if(!evt.target.classList.contains('effects__radio')) {
        return;
    }
    chosenEffect = EFFECTS_LIST.find((effect) => effect.name === evt.target.value);
    updateSlider();
};

/**
 * @function onSliderUpdate функция обработчик изменений при активации слайдера.
 */
const onSliderUpdate = () => {
    imgUploadPreviewElement.style.filter = 'none';
    imgUploadPreviewElement.className = '';
    effectLevelValueElement.value = '';
    if(isDefaulEffect()){
    return;
    }
    const sliderValue = sliderElement.noUiSlider.get();
    imgUploadPreviewElement.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
    imgUploadPreviewElement.classList.add(`effects__preview--${chosenEffect.name}`);
    effectLevelValueElement.value = sliderValue;
};

/**
 * @function resetEffects функция сброса ээфектов и обновления настроек параметров слайдера, а так же, в некоторых случаях, его уничтожения.
 */
const resetEffects = () => {
    chosenEffect = DEFAULT_EFFECT;
    updateSlider();
};

/**
 * создание слайдера
 */
noUiSlider.create(sliderElement, {
    range: {
        min: DEFAULT_EFFECT.min,
        max: DEFAULT_EFFECT.max,
    },
    start: DEFAULT_EFFECT.max,
    step: DEFAULT_EFFECT.step,
    connect: 'lower',
});

updateSlider();

imgFormElement.addEventListener('change', onFormChange);
sliderElement.noUiSlider.on('update', onSliderUpdate);

export { resetEffects };
