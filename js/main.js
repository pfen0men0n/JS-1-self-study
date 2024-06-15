import { createPhotoObjects } from '../js/utils.js';

console.log(createPhotoObjects());

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
