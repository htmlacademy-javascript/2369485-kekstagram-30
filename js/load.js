import {getData} from './api.js';
import {renderPictures} from './pictures.js';
import {showAlertError} from './util.js';
import {initializeFilters} from './photo-filter.js';

let dataPhotos = null;

try {
  dataPhotos = await getData();
  renderPictures(dataPhotos);
  initializeFilters();
} catch{
  showAlertError('Данные не загружены. Попробуйте обновить страницу');
}

export {dataPhotos};
