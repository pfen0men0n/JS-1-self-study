import { TOTAL_PHOTO_OBJECT_AMOUNT, PhotoLikesAmount, PhotoCommentsAmount, COMMENT_AUTHOR_NAMES_ARRAY, PHOTO_DESCRIPTIONS_ARRAY, PHOTO_COMMENTS_ARRAY} from '../js/mocks.js';

/**
 * Функция конвертации времени формата HH:MM с типом "строка" в минуты с типом "число". 
 * Функция принимает следующие параметры:
 * @param {} time Принимает данные о времени с типом string и видом HH:MM
 * @let [a, b] = time.split(':') используем метод деструктурирующего присваивания.
 * Т.е. это то, как если бы мы из переменной time методом split отделили часы от минут и записали бы их по очереди в массив,
 * только сделали на оборот. Объявили миссив с часами и минутами деструктурировав в него методом split из меременной значения
 * чаов и минут.
 * @returns Далее возвращаем из функции часы умноженные на 60(количество минут в 1 часе) с унарным плючом, который приводит 
 * полученное значение из строки в число и складываем его со значением минут таким же образом приведенным к числу. 
 */
const convertHoursToMinutes = (time) => {
    let [hours, minutes] = time.split(':');
    return (+hours * 60) + (+minutes);
}

/**
 * Функция, которая принимает время начала и конца рабочего дня, а также время старта и продолжительность встречи в минутах и возвращает true, 
 * если встреча не выходит за рамки рабочего дня, и false, если выходит.
 * Функция принимает следующие параметры:
 * @param {*} startTime 
 * @param {*} endTime 
 * @param {*} meetingTimeStarts 
 * @param {*} meetingTime 
 * @returns 
 */
const withinTeWorkingDay = (startTime, endTime, meetingTimeStarts, meetingTime) => {
    const startMinutes = convertHoursToMinutes(startTime);
    const endMinutes = convertHoursToMinutes(endTime);
    const meetingStarMinutes = convertHoursToMinutes(meetingTimeStarts);
    const meetingEndTime = meetingStarMinutes + meetingTime;
    return meetingEndTime <= endMinutes && meetingEndTime >= startMinutes;

}
    console.log(withinTeWorkingDay('8:00', '17:30', '08:00', 900));


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
createPhotoObjects();

export {createPhotoObjects};
