const IMAGE_COUNT = 25;
const AVATAR_COUNT = 6;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const COMMENT_COUNT = 10;

const COMMENT_SENTENCES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'Фотография солнечного летнего дня. Низкое солнце плывёт среди облаков.',
  'На фотографии новенький спорткар',
  'Такая обувь может вызвать только удивление',
  'Концерт любимого исполнителя ',
  'Не самое удачное сафари',
  'Отдых на пляже',
  'Дневной поход в ресторан',
];

const NAMES = [
  'Сергей', 'Ольга', 'Валерия', 'Дмитрий', 'Игорь', 'Василий',
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return function () {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const generateCommentId = createIdGenerator();

const createMassage = () => Array.from(
  {length: getRandomInteger (1, 2)},
  () => getRandomArrayElement(COMMENT_SENTENCES)
).join(' ');

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
  message: createMassage(),
  name: getRandomArrayElement(NAMES),
});

const createPictures = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: getRandomArrayElement(DESCRIPTIONS),
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: Array.from(
    {length: getRandomInteger(0, COMMENT_COUNT)},
    createComment,
  ),
});

const getPictures = () =>
  Array.from(
    {length: IMAGE_COUNT},
    (_, pictureIndex) => createPictures(pictureIndex + 1),
  );


getPictures();
