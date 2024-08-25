import { openBigPhoto } from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');
picturesContainer.classList.remove('visually-hidden');
const picturesTemlpate = document.querySelector('#picture').content.querySelector('.picture');



const renderThumbnails = (drawPhotos) => {
    const picturesContainerFragment = document.createDocumentFragment();
    drawPhotos.forEach(({url, description, likes, comments})=> {
    const userPhotoElement = picturesTemlpate.cloneNode(true);
    userPhotoElement.querySelector('.picture__img').src = url;
    userPhotoElement.querySelector('.picture__img').alt = description;
    userPhotoElement.querySelector('.picture__likes').textContent = likes;
    userPhotoElement.querySelector('.picture__comments').textContent = comments.length;
    picturesContainerFragment.append(userPhotoElement);
    userPhotoElement.addEventListener('click', () => {
        openBigPhoto({url, likes, comments, description})
    });
    

});

    picturesContainer.append(picturesContainerFragment);
};
export { renderThumbnails };