// /**
//  * Функция конвертации времени формата HH:MM с типом "строка" в минуты с типом "число". 
//  * @param {} time принимаемый параметр с типом string и видом HH:MM
//  * @let [a, b] = time.split(':') используем метод деструктурирующего присваивания.
//  * Т.е. это то, как если бы мы из переменной time методом split отделили часы от минут и записали бы их по очереди в массив,
//  * только сделали на оборот. Объявили миссив с часами и минутами деструктурировав в него методом split из меременной значения
//  * часов и минут.
//  * @returns Далее возвращаем из функции часы умноженные на 60(количество минут в 1 часе) с унарным плючом, который приводит 
//  * полученное значение из строки в число и складываем его со значением минут таким же образом приведенным к числу. 
//  */
// const convertHoursToMinutes = (time) => {
//     let [hours, minutes] = time.split(':');
//     return (+hours * 60) + (+minutes);
// };

// /**
//  * Функция расчета, выходит ли встреча за рамки рабочего дня?
//  * @param {*} startTime принимаемый параметр начала рабочего дня.
//  * @param {*} endTime принимаемый параметр конца рабочего дня.
//  * @param {*} meetingTimeStarts принимаемый параметр начала встречи.
//  * @param {*} meetingTime принимаемый параметр продолжительности встречи.
//  * @returns булево значение true или false.
//  */
// const withinTeWorkingDay = (startTime, endTime, meetingTimeStarts, meetingTime) => {
//     const startMinutes = convertHoursToMinutes(startTime);
//     const endMinutes = convertHoursToMinutes(endTime);
//     const meetingStarMinutes = convertHoursToMinutes(meetingTimeStarts);
//     const meetingEndTime = meetingStarMinutes + meetingTime;
//     return meetingEndTime <= endMinutes && meetingEndTime >= startMinutes;

// };
//     console.log(withinTeWorkingDay('8:00', '17:30', '08:00', 900));

//     const checkStringLength = function (string, maxLength) {
//         if (string.length <= maxLength) {
//             return true;
//         }
//             return false;
//     }
//     console.log(checkStringLength('Привет как дела собака ты сутулая?', 50));
    
//     const isPalindrome = function (string) {
//     string = string.toLowerCase().replace(/[^a-z]+/g,"");
//     return string === string.split("").reverse().join("");
    
//     };
//     console.log(isPalindrome('топот'));
    

//     const getRandomPositiveInteger = (min, max) => {
//         const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
//         const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
//         const result = Math.random() * (upper - lower + 1) + lower;
//         return Math.floor(result);
//     };
    
//     const getRandomArrayElement = (elements,) => elements[getRandomPositiveInteger(0, elements.length - 1)];
    
    
//     const createComments = (number) => {
//         const commentArray = [];
//         for (let i = 0; i <= number; i++) {
//             commentArray.push({
//                 id: i,
//                 avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
//                 message: getRandomArrayElement(PHOTO_COMMENTS_ARRAY),
//                 name: getRandomArrayElement(COMMENT_AUTHOR_NAMES_ARRAY),
//             });
//     }
//     return commentArray;
//     }; 
    
//     // const createMockPhotoObject = (index) => ({
//     //     id: index,
//     //     url: `photos/${index + 1}.jpg`, 
//     //     description: getRandomArrayElement(PHOTO_DESCRIPTIONS_ARRAY),
//     //     likes: getRandomPositiveInteger(PhotoLikesAmount.MIN, PhotoLikesAmount.MAX),
//     //     comments: createComments(getRandomPositiveInteger(PhotoCommentsAmount.MIN, PhotoCommentsAmount.MAX)),
//     // });
    
//     // // const createPhotoObjects = () => Array.from({length: TOTAL_PHOTO_OBJECT_AMOUNT}, (x, index) => createMockPhotoObject(index));
//     // // createPhotoObjects();
    