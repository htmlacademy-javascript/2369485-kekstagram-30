import {isEscapeKey} from './util.js';

const errorBooklet = document.querySelector('#error').content.querySelector('.error');
const successBooklet = document.querySelector('#success').content.querySelector('.success');
const bodyElement = document.querySelector('body');

function renderBooklet() {
  const popupContainer = document.querySelector('main');

  errorBooklet.classList.add('hidden');
  successBooklet.classList.add('hidden');

  popupContainer.insertAdjacentElement('afterbegin', errorBooklet);
  popupContainer.insertAdjacentElement('afterbegin', successBooklet);
}

renderBooklet();

export function showBooklet(cls) {
  const booklet = bodyElement.querySelector(`.${cls}`);
  const closeButton = booklet.querySelector(`.${cls}__button`);
  booklet.classList.remove('hidden');
  const onDocumentKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closePopup();
    }
  };

  const oncloseButtonClick = () => {
    closePopup();
  };

  document.addEventListener('keydown', onDocumentKeydown);
  closeButton.addEventListener('click', oncloseButtonClick);

  function closePopup () {
    bodyElement.querySelector(`.${cls}`).classList.add('hidden');
    document.removeEventListener('keydown', onDocumentKeydown);
    closeButton.removeEventListener('click', oncloseButtonClick);
  }
}
