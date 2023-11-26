const DATA_FROM_SERVER = 'https://30.javascript.pages.academy/kekstagram';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorMessage = {
  GET_MESSAGE: 'Ошибка загрузки данных. Попробуйте обновить страницу',
  SEND_MESSAGE: 'Ошибка загрузки формы. Попробуйте ещё раз',
};

const loadData = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${DATA_FROM_SERVER}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

const getData = () => loadData(Route.GET_DATA, ErrorMessage.GET_MESSAGE);

const sendData = (body) => loadData(Route.SEND_DATA, ErrorMessage.SEND_MESSAGE, Method.POST, body);

export {getData, sendData};
