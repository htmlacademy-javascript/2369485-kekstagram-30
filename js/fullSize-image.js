const userPicture = document.querySelector('.big-picture');

function isEscapeKey(evt) {
  return evt.key === 'ESC' || evt.key === 'Escape';
}

function openBigPicture ({url, description, likes, comments}) {

  const body = document.querySelector('body');
  body.classList.add('modal-open');
  userPicture.classList.remove('hidden');

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      userPicture.classList.add('hidden');
    }
  });

  userPicture.querySelector('.big-picture__img img').src = url;
  userPicture.querySelector('.big-picture__img img').alt = description;
  userPicture.querySelector('.social__caption').textContent = description;
  userPicture.querySelector('.likes-count').textContent = likes;
  userPicture.querySelector('.comments-count').textContent = comments.length;
  const commentsContainerElement = userPicture.querySelector('.social__comments');

  const commentTemplate = userPicture.querySelector('.social__comment').cloneNode(true);


  commentsContainerElement.innerHTML = '';
  comments.forEach(({name, avatar, message}) => {
    const element = commentTemplate.cloneNode(true);
    element.querySelector('.social__picture').src = avatar;
    element.querySelector('.social__picture').alt = name;
    element.querySelector('.social__text').textContent = message;
    commentsContainerElement.appendChild(element);
  });
}

function setupHandlers(pictures) {
  document.querySelectorAll('.picture').forEach((element) => {
    element.addEventListener('click', (evt) => {
      const targetElement = evt.target.tagName === 'A' ? evt.target : evt.target.parentElement;
      const id = Number.parseInt(targetElement.dataset.id, 10);
      const picture = pictures.find((item) => item.id === id);
      openBigPicture(picture);
    });
  });
}

const openCloseBigPicture = () => {
  const userPictureClose = userPicture.querySelector('.big-picture__cancel');

  function closeBigPicture () {
    userPicture.classList.add('hidden');
    document.addEventListener('keydown', (evt) => {

      if (evt.key === 'Escape') {
        evt.preventDefault();
        userPicture.classList.add('hidden');
      }
    });
  }

  userPictureClose.addEventListener('click', () => {
    closeBigPicture();
  });

  document.addEventListener('keydown', (evt) => {

    if (evt.key === 'Escape') {
      closeBigPicture();
    }
  });

};

export {openCloseBigPicture};
export {setupHandlers};
