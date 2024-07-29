import {createPhotoObjects} from './utils.js';
import {renderThumbnails} from './thumbnails.js';
import {addValidationAndListeners} from './form.js';

renderThumbnails(createPhotoObjects);
addValidationAndListeners();

