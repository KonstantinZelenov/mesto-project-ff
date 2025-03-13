export const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-34',
  headers: {
    authorization: '0189e216-a99f-4693-b349-1e2f545314bb',
    'Content-Type': 'application/json'
  }
};

// Функция для обработки ответа от сервера
const handleResponse = (res) => {
  if (!res.ok) {
    throw new Error(`Ошибка: ${res.status}`);
  }
  return res.json();
};

// Загрузка данных пользователя
export const fetchUserData = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(handleResponse);
};

// Загрузка карточек
export const fetchCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(handleResponse);
};

// Функция для обновления аватара
export const updateAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink
    })
  })
  .then(handleResponse);
};

// Функция для проверки MIME-типа изображения
export const isImageUrl = (url) => {
  return fetch(url, { method: 'HEAD' })
    .then(res => {
      if (!res.ok) {
        throw new Error('Ошибка при проверке ссылки');
      }
      const contentType = res.headers.get('Content-Type');
      return contentType && contentType.startsWith('image');
    })
    .catch(() => false);
};

// Функция для добавления новой карточки
export const addCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({ name, link })
  }).then(handleResponse);
};

// Функция для обновления данных профиля на сервере
export const updateProfileData = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  }).then(handleResponse);
};

// Функция для удаления карточки
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  }).then(handleResponse);
};

// Функция для постановки/снятия лайка
export const toggleLike = (cardId, isLiked) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: isLiked ? 'DELETE' : 'PUT',
    headers: config.headers
  }).then(handleResponse);
};
