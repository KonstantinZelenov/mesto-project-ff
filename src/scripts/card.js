// Функция создания карточки
export function createCard(card, deleteCard, toggleLike, handleImageClick) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  const cardImage = cardElement.querySelector('.card__image');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
   

  // Устанавливаю значения вложенных элементов
  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

  // Добавляю обработчики кликов
  cardDeleteButton.addEventListener('click', deleteCard);
  cardLikeButton.addEventListener('click', toggleLike);
  cardImage.addEventListener('click', handleImageClick.bind(null, card));

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



