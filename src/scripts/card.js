export function createCard(card, openDeleteConfirmationPopup, handleToggleLike, handleImageClick, userId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardLikesNumber = cardElement.querySelector('.card__likes-number');

  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardLikesNumber.textContent = card.likes.length;

  // Проверяем, принадлежит ли карточка текущему пользователю
  if (card.owner._id !== userId) {
    cardDeleteButton.style.display = 'none'; // Скрываем кнопку удаления
  } else {
    // Добавляем обработчик только если кнопка видима
    cardDeleteButton.addEventListener('click', () => openDeleteConfirmationPopup(card._id, cardElement));
  }

  // Проверяем, лайкнул ли текущий пользователь карточку
  if (card.likes.some(like => like._id === userId)) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  // Обработчики событий
  cardLikeButton.addEventListener('click', () => handleToggleLike(card._id, cardLikeButton, cardLikesNumber));
  cardImage.addEventListener('click', () => handleImageClick(card));

  return cardElement;
}





