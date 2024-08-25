import { renderThumbnails } from './thumbnails.js';
import { addValidationAndListeners } from './forms/form.js';
import { getData } from './network/api.js';


getData((pictures) => {
    renderThumbnails(pictures);
});
addValidationAndListeners();