import {isEscapeKey} from './util.js';

const popupContainer = document.querySelector('main');
let booklet;

export const isErrorCls = () => document.querySelector('.error');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

function closePopup () {
  booklet.remove();
  document.removeEventListener('keydown', onDocumentKeydown);
}

const checkEventTargetClassList = (evt, cls) => {
  const classList = evt.target.classList;
  if (classList.contains(`${cls}__inner`) || classList.contains(`${cls}__title`)) {
    return;
  }
  closePopup();
};

const onCloseButtonClick = () => {
  closePopup();
};

export function showBooklet(cls) {
  booklet = document.querySelector(`#${cls}`).cloneNode(true).content.querySelector(`.${cls}`);
  popupContainer.insertAdjacentElement('afterbegin', booklet);
  booklet.classList.remove('hidden');
  const bookletCloseButton = booklet.querySelector(`.${cls}__button`);


  document.addEventListener('keydown', onDocumentKeydown);
  bookletCloseButton.addEventListener('click', onCloseButtonClick);
  booklet.addEventListener('click',(e) => checkEventTargetClassList (e, cls));
}
