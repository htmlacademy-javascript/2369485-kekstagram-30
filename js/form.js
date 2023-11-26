import {isEscapeKey} from './util.js';
import {sendData} from './api.js';
import {showBooklet, isErrorCls} from './booklet.js';
import {resetDefault} from './range-slider.js';

const TOP_PRIORITY = 1;
const SECONDARY_PRIORITY = 2;
const TERTIARY_PRIORITY = 3;

const MAX_HASHTAG_COUNT = 5;
const ALLOWED_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ErrorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хэштегов`,
  NOT_UNIQUE: 'Хэштеги должны быть уникальными',
  INVALID_PATTERN: 'Неправильный хэштег',
};

const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadInput = document.querySelector('.img-upload__input');
const uploadSubmit = document.querySelector('.img-upload__submit');
const body = document.querySelector('body');
const uploadCancel = document.querySelector('.img-upload__cancel');
const textHashtags = uploadOverlay.querySelector('.text__hashtags');
const textDescription = uploadOverlay.querySelector('.text__description');
const uploadForm = document.querySelector('.img-upload__form');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const modalCloseHandler = () => {
  uploadForm.reset();
  pristine.reset();
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  uploadInput.value = '';
  resetDefault();

  document.removeEventListener('keydown', onDocumentKeydown);
};

const onUploadInputChange = () => {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  uploadCancel.addEventListener('click', modalCloseHandler);
  document.addEventListener('keydown', onDocumentKeydown);
};

const blockUploadSubmit = () => {
  uploadSubmit.disabled = true;
};

const unblockUploadSubmit = () => {
  uploadSubmit.disabled = false;
};

const normalizeTags = (tagString) => tagString.trim().split(' ').filter((tag) => Boolean(tag.length));
const hasValidTags = (value) => normalizeTags(value).every((tag) => ALLOWED_SYMBOLS.test(tag));
const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;
const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const cancelCloseModal = () => document.activeElement === textHashtags || document.activeElement === textDescription;

export function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && !cancelCloseModal()) {
    evt.preventDefault();
    if (!isErrorCls()) {
      modalCloseHandler();
    }
  }
}

const uploadFormData = async () => {
  try {
    const formData = new FormData(uploadForm);
    blockUploadSubmit();
    await sendData(formData);
    unblockUploadSubmit();
    showBooklet('success');
    modalCloseHandler ();
  } catch {
    unblockUploadSubmit();
    showBooklet('error');
  }
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  if (!pristine.validate()) {
    return;
  }
  uploadFormData ();
};

pristine.addValidator(textHashtags, hasValidCount, ErrorText.INVALID_COUNT,TERTIARY_PRIORITY,true);
pristine.addValidator(textHashtags, hasUniqueTags, ErrorText.NOT_UNIQUE,TOP_PRIORITY,true);
pristine.addValidator(textHashtags, hasValidTags, ErrorText.INVALID_PATTERN,SECONDARY_PRIORITY,true);

uploadForm.addEventListener('submit', onUploadFormSubmit);

uploadInput.addEventListener('change', onUploadInputChange);
