import {getPictures} from './data-generation.js';
import {renderPhotos} from'./drawing-thumbnails.js';
import {openCloseBigPicture} from'./fullSize-image.js';
import {setupHandlers} from'./fullSize-image.js';

getPictures();
renderPhotos();
openCloseBigPicture();
setupHandlers();
