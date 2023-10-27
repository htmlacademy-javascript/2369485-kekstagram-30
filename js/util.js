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

export {getRandomInteger, getRandomArrayElement, generateCommentId, createMassage, createComment, createPictures, getPictures};
