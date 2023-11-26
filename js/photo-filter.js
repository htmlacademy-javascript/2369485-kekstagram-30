import {dataPhotos} from './load.js';
import {renderPicturesWithDebounce} from './pictures.js';


const filterDefaultButten = document.querySelector('#filter-default');
const filterRandomButten = document.querySelector('#filter-random');
const filterDiscussedButten = document.querySelector('#filter-discussed');
const imageFilter = document.querySelector('.img-filters');
const imageFilterButton = imageFilter.querySelector('.img-filters__form');

function getRandomPhotos(arr) {
  for (let i = 0 ; (i < 10) && (i < arr.length) ; i++) {
    const r = Math.floor(Math.random() * (arr.length - i)) + i;
    const photo = arr[r];
    arr[r] = arr[i];
    arr[i] = photo;
  }
  return arr.slice(0, 10);
}

function getDiscussedPhotosFirst (arr) {
  return arr.sort((a, b) => b.comments.length - a.comments.length);
}

function getFilterData (id) {
  const idToFilter = {
    'filter-default': dataPhotos,
    'filter-random': getRandomPhotos([...dataPhotos]),
    'filter-discussed': getDiscussedPhotosFirst ([...dataPhotos])
  };
  return idToFilter[id];
}

function setActiveFilterButton (evt) {
  imageFilterButton.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
}

function onFilterClick(evt) {
  const pictures = getFilterData (evt.target.id);
  setActiveFilterButton(evt);
  renderPicturesWithDebounce(pictures);
}

function initializeFilters() {
  imageFilter.classList.remove('img-filters--inactive');

  filterDefaultButten.addEventListener('click', onFilterClick);
  filterRandomButten.addEventListener('click', onFilterClick);
  filterDiscussedButten.addEventListener('click', onFilterClick);
}

initializeFilters();
