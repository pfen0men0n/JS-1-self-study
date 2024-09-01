const ALER_SHOW_TIME = 5000;
const ALERT_TEXT = 'Не удалось загрузить данные с сервера';
const ERROR_TEXT = 'Не удалось загрузить. Попробуйте еще раз';

/**
 * @function isEscKey функция проверки нажатия на кнопку Esc.
 * @param {*} evt принимаемый параметр.
 * @returns булево значение true или false.
 */
const isEscKey = (evt) => evt.key === 'Escape';

/**
 * @function showAlert функция отрисовки предупреждения
 * @param {*} message принимаемый параметр (текст сообщения об ошибке)
 */
const showAlert = (message) => {
    const alertContainer = document.createElement('div');
    alertContainer.style.zIndex = '100';
    alertContainer.style.position = 'absolute';
    alertContainer.style.left = '0';
    alertContainer.style.top = '0';
    alertContainer.style.right = '0';
    alertContainer.style.padding = '10px 3px';
    alertContainer.style.fontSize = '25px';
    alertContainer.style.textAlign = 'center';
    alertContainer.style.backgroundColor = 'red';
  
    alertContainer.textContent = message;
  
    document.body.append(alertContainer);
  
    setTimeout(() => {
      alertContainer.remove();
    }, ALER_SHOW_TIME);
  };

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;
  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
  clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
  timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}



export { isEscKey, showAlert, ALERT_TEXT, ERROR_TEXT, debounce };


