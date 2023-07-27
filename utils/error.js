const OK = 200;
const CREATED = 201;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const INTERNAL_SERVER_ERROR = 500;

const MESSAGE_NOT_ACCESS = 'Нет прав доступа для удаления фильма';
const MESSAGE_INCORRECT_DATA = 'Переданы некорректные данные';
const MESSAGE_NOT_FOUND = ' Данные не найдены';
const MESSAGE_NOT_FOUND_USER = 'Запрашиваемый пользователь не найден';
const MESSAGE_CONFLICT_ERR = 'Пользователь уже существует!';
const MESSAGE_AUTH_ERROR = 'Необходима авторизация';
const MESSAGE_SERVER_ERROR = 'На сервере произошла ошибка';
const MESSAGE_URL_NOT_VALID = 'Неправильный формат URL';
const MESSAGE_VALIDATION_ERR = 'Введены неправильные почта или пароль!';
const MESSAGE_PAGE_NOT_FOUND = 'Страница не найдена';
const MESSAGE_CRASH_TEST = 'Хьюстон, у нас проблема!';

module.exports = {
  OK,
  CREATED,
  BAD_REQUEST,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
  MESSAGE_NOT_ACCESS,
  MESSAGE_INCORRECT_DATA,
  MESSAGE_NOT_FOUND,
  MESSAGE_NOT_FOUND_USER,
  MESSAGE_CONFLICT_ERR,
  MESSAGE_AUTH_ERROR,
  MESSAGE_SERVER_ERROR,
  MESSAGE_URL_NOT_VALID,
  MESSAGE_VALIDATION_ERR,
  MESSAGE_PAGE_NOT_FOUND,
  MESSAGE_CRASH_TEST,
};
