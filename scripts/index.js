const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function createCard(card, deleteCard) {
  // Клонирую шаблон
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  // Устанавливаю значения вложенных элементов
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__image').src = card.link;

  // Добавляю обработчик клика к иконке удаления
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);

  return cardElement;
}

// Функция удаления карточки
function deleteCard(event) {
  const card = event.target.closest('.card');
  card.remove();
}

// Вывожу все карточки из массива на страницу
initialCards.forEach(card => {
  const cardElement = createCard(card, deleteCard);
  placesList.append(cardElement);
});



