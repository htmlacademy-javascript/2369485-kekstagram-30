import {getPictures} from './data-generation.js';
import {renderPhotos} from'./drawing-thumbnails.js';
import {hiddenBigPicture} from'./fullSize-image.js';
import {setupHandlers} from'./fullSize-image.js';

getPictures();
const randomPhotoObjects = getPictures();
renderPhotos(randomPhotoObjects);
hiddenBigPicture(renderPhotos);
setupHandlers(randomPhotoObjects);
