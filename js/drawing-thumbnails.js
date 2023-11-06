const photosListElement = document.querySelector('.pictures');
const PhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderPhotos = (photos) => {
  const photosListFragment = document.createDocumentFragment();

  photos.forEach(({url, description, likes, comments}) => {
    const photoElement = PhotoTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__img').alt = description;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    photosListElement.appendChild(photoElement);
  });


  photosListElement.appendChild(photosListFragment);
};

export {renderPhotos};
