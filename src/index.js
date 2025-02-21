import {initialCards} from './scripts/cards.js';
import './pages/index.css';
import avatarImage from './images/avatar.jpg';
document.querySelector('.profile__image').style.backgroundImage = `url(${avatarImage})`;


// СОЗДАЮ И УДАЛЯЮ КАРТОЧКИ
const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function createCard(card, deleteCard, isLiked = false) {
  // Клонирую шаблон
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  // Устанавливаю значения вложенных элементов
  cardElement.querySelector('.card__title').textContent = card.name;
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.name;

  // Добавляю обработчик клика к иконке удаления
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);

  // Добавляю обработчик клика по картинке
  cardElement.querySelector('.card__image').addEventListener('click', () => {
    openImagePopup(card);
  });

   // Обрабатываем лайк
   const likeButton = cardElement.querySelector('.card__like-button');
   if (isLiked) {
     likeButton.classList.add('card__like-button_is-active'); // Добавляем класс, если лайкнута
   }
 
   // Обработчик клика по лайку
   likeButton.addEventListener('click', () => {
     likeButton.classList.toggle('card__like-button_is-active'); 
   });

  return cardElement;
}

// Функция удаления карточки
function deleteCard(event) {
  const card = event.target.closest('.card');
  card.remove();
}

// Вывожу все карточки из массива на страницу
initialCards.forEach(card => {
  const isLiked = false; 
  const cardElement = createCard(card, deleteCard, isLiked);
  placesList.append(cardElement);
});



// Получаем форму добавления карточки
const newCardForm = document.forms['new-place'];

// Функция добавления новой карточки
function addNewCard(card) {
  const cardElement = createCard(card, deleteCard, false);
  placesList.prepend(cardElement);
}

// Обработчик отправки формы
newCardForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Предотвращаем стандартное поведение формы

  // Получаем значения из формы
  const name = newCardForm.elements['place-name'].value;
  const link = newCardForm.elements['link'].value;

  // Создаем объект новой карточки
  const newCard = { name, link };

  // Добавляем новую карточку в начало списка
  addNewCard(newCard);

  // Закрываем попап и сбрасываем форму
  closePopup(newCardForm.closest('.popup'));
  newCardForm.reset();
});

// Функция закрытия попапа
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  popup.classList.remove('popup_is-animated');

  // Добавляем задержку перед анимацией закрытия
  setTimeout(() => {
    popup.style.visibility = 'hidden';
    popup.style.opacity = '0';
  }, 300); // Задержка 300 мс, соответствует времени анимации открытия
}

//ЗАКОНЧИЛ СОЗДАВАТЬ И УДАЛЯТЬ КАРТОЧКИ


// ФУНКЦИОНАЛ ОТКРЫТИЯ ПОПАПОВ
// Кнопка отрытия редактирования профиля
const profileEditButton = document.querySelector('.profile__edit-button');

//Функция открывающая edit
function openEditPopup() {
  const popup = document.querySelector('.popup_type_edit');
  nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
  popup.style.visibility = 'hidden';
  popup.style.opacity = '0';
  
  if (!popup.classList.contains('popup_is-opened')) {
    popup.classList.add('popup_is-opened');
    // Добавляем задержку перед анимацией
    setTimeout(() => {
      popup.classList.add('popup_is-animated');
      popup.style.visibility = '';
      popup.style.opacity = '';
    }, 0);
  }
}

profileEditButton.addEventListener('click', openEditPopup);

// Кнопка отрытия добавления карточки
const cardAddButton = document.querySelector('.profile__add-button');

function addCardPopup() {
  const popup = document.querySelector('.popup_type_new-card');
  popup.style.visibility = 'hidden';
  popup.style.opacity = '0';
  
  if (!popup.classList.contains('popup_is-opened')) {
    popup.classList.add('popup_is-opened');
    // Добавляем задержку перед анимацией
    setTimeout(() => {
      popup.classList.add('popup_is-animated');
      popup.style.visibility = '';
      popup.style.opacity = '';
    }, 0);
  }
}

cardAddButton.addEventListener('click', addCardPopup);
  
// Функция открытия попапа с картинкой
function openImagePopup(card) {
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
// ЗАКОНЧИЛИ ФУНКЦИОНАЛ ОТКРЫТИЯ ПОПАПОВ


// ФУНКЦИОНАЛ ЗАКРЫТИЯ ПОПАПОВ
const popups = document.querySelectorAll('.popup');

// Добавляем обработчик клика по кнопке с крестиком
document.addEventListener('click', closePopupByButtonClick);

// Добавляем обработчик нажатия клавиши Esc
document.addEventListener('keydown', closeByEsc);

function closeByEsc(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.popup').forEach((popup) => {
      popup.classList.remove('popup_is-opened');
    });
  }
};

function closeByOverlayClick(e) {
  if (e.target.classList.contains('popup')) {
    const popup = e.target;
    popup.classList.remove('popup_is-opened');
  }
};

function closePopupByButtonClick(e) {
  if (e.target.classList.contains('popup__close')) {
    const popup = e.target.closest('.popup');
    if (popup.classList.contains('popup_is-opened')) {
      popup.classList.remove('popup_is-opened');
    }
  }
};

popups.forEach((popup) => {
  popup.addEventListener('click', closeByOverlayClick);
  popup.querySelector('.popup__close').addEventListener('click', closePopupByButtonClick);
});

// ЗАКОНЧИЛИ ФУНКЦИОНАЛ ЗАКРЫТИЯ ПОПАПОВ



// Находим форму в DOM
const formElement = document.querySelector('.popup__form[name="edit-profile"]');
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Обработчик «отправки» формы, обновление профиля
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    document.querySelector('.popup_type_edit').classList.remove('popup_is-opened');
}

// Прикрепляем обработчик к форме для обработки события «submit»
formElement.addEventListener('submit', handleFormSubmit);





 












  
  






