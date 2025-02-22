// Функция создания карточки
export function createCard(card) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  // Устанавливаю значения вложенных элементов
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;

  // Добавляю обработчики кликов
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  cardElement.querySelector('.card__like-button').addEventListener('click', toggleLike);
  cardElement.querySelector('.card__image').addEventListener('click', handleImageClick.bind(null, card));

  return cardElement;
}

// Функция поставить/убрать лайк
export function toggleLike(event) {
  const likeButton = event.target;
  likeButton.classList.toggle('card__like-button_is-active');
}

// Функция удаления карточки
export function deleteCard(event) {
  const card = event.target.closest('.card');
  card.remove();
}

// Функция открытия модального окна с картинкой
export function handleImageClick(card) {
  const popup = document.querySelector('.popup_type_image');
  const popupImage = popup.querySelector('.popup__image');
  const popupCaption = popup.querySelector('.popup__caption');

  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupCaption.textContent = card.name;

  popup.style.visibility = 'hidden';
  popup.style.opacity = '0';

  if (!popup.classList.contains('popup_is-opened')) {
    popup.classList.add('popup_is-opened');
    setTimeout(() => {
      popup.classList.add('popup_is-animated');
      popup.style.visibility = '';
      popup.style.opacity = '';
    }, 0);
  }
}

