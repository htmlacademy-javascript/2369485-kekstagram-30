import {NAMES, COMMENT_SENTENCES} from './basic-data.js';
import {getRandomInteger, getRandomArrayElement} from './util.js';
import {IMAGE_COUNT, AVATAR_COUNT, MIN_LIKES, MAX_LIKES, COMMENT_COUNT,DESCRIPTIONS} from './data.js';

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => {
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

export {getPictures};
