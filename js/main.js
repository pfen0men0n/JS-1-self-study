const TOTAL_PHOTO_OBJECT_AMOUNT = 25;

const PHOTO_LIKES_AMOUNT = {
    min: 15,
    max:200,
};

const PHOTO_COMMENTS_AMOUNT = {
    min: 0,
    max: 30,
};

const getRandomPositiveInteger = (min, max) => {
    const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
    const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
    const result = Math.random() * (upper - lower + 1) + lower;
    return Math.floor(result);
};

const getRandomArrayElement = (elements,) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const COMMENT_AUTHOR_NAMES_ARRAY = ['Mary', 'John', 'Jack', 'Zack', 'Den', 'Dean', 'Martha', 'Homer', 'Bart', 'Liza', 'Preston', 'Stan', 'Mack', 'Michael', 'Mick', 
'Steve', 'Harry', 'Ron', 'Hermoine', 'Drako', 'Bred', 'Tom', 'Jerry', 'Tim', 'Slime'];

const PHOTO_DESCRIPTIONS_ARRAY = [
    'Моя тачка!',
    'Это я на пляже',
    'Хочу на морюшко!!!',
    'А тут прям инфаркт-леопарда! Ну вы поняли',
    'Забыл камеру протереть',
    'Чилим!',
    'Самолёёёётиииииикк!',
    'Зацените тапки-унты!',
    'Которолл, вкусняшка!',
    'По уши!',
    'щас поем!',
    'Да это же McLaren P1!!!! Пушка-гонка!',
];

const PHOTO_COMMENTS_ARRAY = [
    'Всё отлично!',    
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
    'Авада кедавра!',
    'Скыдыщщщщ!',
    'Фоткадли на домофон что ли?',
    'УУуу горизонт то завален',
];

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
    likes: getRandomPositiveInteger(PHOTO_LIKES_AMOUNT.min, PHOTO_LIKES_AMOUNT.max),
    comments: createComments(getRandomPositiveInteger(PHOTO_COMMENTS_AMOUNT.min, PHOTO_COMMENTS_AMOUNT.max)),
});

const createPhotoObjects = () => Array.from({length: TOTAL_PHOTO_OBJECT_AMOUNT}, (_x, index) => createMockPhotoObject(index));
createPhotoObjects();


console.log(createPhotoObjects());
