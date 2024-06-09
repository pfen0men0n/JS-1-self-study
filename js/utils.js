import { TOTAL_PHOTO_OBJECT_AMOUNT, PhotoLikesAmount, PhotoCommentsAmount, COMMENT_AUTHOR_NAMES_ARRAY, PHOTO_DESCRIPTIONS_ARRAY, PHOTO_COMMENTS_ARRAY} from '../js/mocks.js';

const checkStringLength = function (string, maxLength) {
    if (string.length <= maxLength) {
        return true;
    }
        return false;
}
console.log(checkStringLength('Привет как дела собака ты сутулая?', 50));

const isPalindrome = function (string) {
string = string.toLowerCase().replace(/[^a-z]+/g,"");
return string === string.split("").reverse().join("");

}
console.log(isPalindrome('топот'));

const getRandomPositiveInteger = (min, max) => {
    const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
    const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
    const result = Math.random() * (upper - lower + 1) + lower;
    return Math.floor(result);
};

const getRandomArrayElement = (elements,) => elements[getRandomPositiveInteger(0, elements.length - 1)];


const createComments = (number) => {
    const commentArray = [];
    for (let i = 0; i <= number; i++) {
        commentArray.push({
            id: i,
            avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
            message: getRandomArrayElement(PHOTO_COMMENTS_ARRAY),
            name: getRandomArrayElement(COMMENT_AUTHOR_NAMES_ARRAY),
        });
}
return commentArray;
}; 

const createMockPhotoObject = (index) => ({
    id: index,
    url: `photos/${index + 1}.jpg`, 
    description: getRandomArrayElement(PHOTO_DESCRIPTIONS_ARRAY),
    likes: getRandomPositiveInteger(PhotoLikesAmount.MIN, PhotoLikesAmount.MAX),
    comments: createComments(getRandomPositiveInteger(PhotoCommentsAmount.MIN, PhotoCommentsAmount.MAX)),
});

const createPhotoObjects = () => Array.from({length: TOTAL_PHOTO_OBJECT_AMOUNT}, (_x, index) => createMockPhotoObject(index));

export {createPhotoObjects};