import {debounce} from './util.js';
const picturesContainer = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();
const cardTemplate = document.querySelector('#picture').content.querySelector('.picture');

const fillCardTemplate = ({id, url, description, comments, likes}) => {
  const element = cardTemplate.cloneNode(true);
  const elementPicture = element.querySelector('.picture__img');
  element.dataset.id = id;
  elementPicture.src = url;
  elementPicture.alt = description;
  element.querySelector('.picture__comments').textContent = comments.length;
  element.querySelector('.picture__likes').textContent = likes;
  return element;
};

const resetPhotos = () => {
  const pictures = picturesContainer.querySelectorAll('.picture');
  pictures.forEach((picture)=> {
    picture.remove();
  });
};

export const renderPictures = (data) => {
  resetPhotos();
  data.forEach((cardObj) => {
    fragment.appendChild(fillCardTemplate(cardObj));
  });
  picturesContainer.appendChild(fragment);
};

export const renderPicturesWithDebounce = debounce(renderPictures);
