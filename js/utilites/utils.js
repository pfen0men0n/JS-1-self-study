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

export { isEscKey, showAlert, ALERT_TEXT, ERROR_TEXT };


