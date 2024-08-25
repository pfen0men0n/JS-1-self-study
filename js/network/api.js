import { showAlert, ALERT_TEXT, ERROR_TEXT } from '../utilites/utils.js';


const getData = (onSuccess) => {
  fetch('https://29.javascript.htmlacademy.pro/kekstagram/data')
    .then((response) => response.json())
    .then((photos) => {
      onSuccess(photos);
    })
    .catch(() => {
      showAlert(ALERT_TEXT);
    });
};


const sendData = (onSuccess, onFail, body) => {
  fetch('https://29.javascript.htmlacademy.pro/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail (ERROR_TEXT);
      }
    })
    .catch(() => {
      onFail (ERROR_TEXT);
    });
};


export { getData, sendData };