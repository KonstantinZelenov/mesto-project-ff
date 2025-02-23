import {initialCards} from './scripts/cards.js';
import {createCard, toggleLike, deleteCard} from './scripts/card.js';
import {openPopup, closePopup} from './scripts/modal.js';
import './pages/index.css';

// Находим форму изменения профиля в DOM
const profileForm = document.forms['edit-profile'];
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');


// Вывожу все карточки из массива на страницу
const placesList = document.querySelector('.places__list');

initialCards.forEach(card => {
  const cardElement = createCard(card, deleteCard, toggleLike, handleImageClick);
  placesList.append(cardElement);
});


// ДОБАВЛЯЕМ КАРТОЧКУ
const newCardForm = document.forms['new-place'];

// Функция добавления новой карточки
function addNewCard(card) {
  const cardElement = createCard(card, deleteCard, toggleLike, handleImageClick);
  placesList.prepend(cardElement);
}

// Обработчик отправки формы
newCardForm.addEventListener('submit', (event) => {
  event.preventDefault(); 

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

//ЗАКОНЧИЛ СОЗДАВАТЬ И УДАЛЯТЬ КАРТОЧКИ


// ФУНКЦИОНАЛ ОТКРЫТИЯ МОДАЛЬНЫХ ОКОН
// Кнопка отрытия модального окна редактирования профиля
const profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', openEditPopup);
//Функция открывающая модальное окно редактирования профиля
function openEditPopup() {
  const popup = document.querySelector('.popup_type_edit');
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  
  openPopup(popup); 
}

// Кнопка отрытия модального окна добавления карточки
const cardAddButton = document.querySelector('.profile__add-button');
cardAddButton.addEventListener('click', addCardPopup); 
//Функция открывающая модальное окно добавления карточки
function addCardPopup() {
  const popup = document.querySelector('.popup_type_new-card');
  
  openPopup(popup);
}

// Функция открытия модального окна с картинкой
function handleImageClick(card) {
  const popup = document.querySelector('.popup_type_image');
  const popupImage = popup.querySelector('.popup__image');
  const popupCaption = popup.querySelector('.popup__caption');

  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupCaption.textContent = card.name;

  openPopup(popup);
}
// ЗАКОНЧИЛИ ФУНКЦИОНАЛ ОТКРЫТИЯ МОДАЛЬНЫХ ОКОН


// ФУНКЦИОНАЛ ЗАКРЫТИЯ МОДАЛЬНЫХ ОКОН
const popups = document.querySelectorAll('.popup');

document.addEventListener('keydown', closePopupOnEsc);
document.addEventListener('click', closeByOverlayClick);

popups.forEach((popup) => {
  popup.querySelector('.popup__close').addEventListener('click', closePopupByButtonClick);
});

// Закрытие попапа при нажатии клавиши "Escape"
function closePopupOnEsc(e) {
  if (e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    
    closePopup(openedPopup);
  }
}

// Закрытие попапа при клике на оверлей
function closeByOverlayClick(e) {
  if (e.target.classList.contains('popup')) {
    const popup = e.target;
    
    closePopup(popup);
  }
};

// Закрытие попапа при клике на кнопку
function closePopupByButtonClick(event) {
  if (event.target.classList.contains('popup__close')) {
    const popup = event.target.closest('.popup');
    
    closePopup(popup);
  }
}
// ЗАКОНЧИЛИ ФУНКЦИОНАЛ ЗАКРЫТИЯ МОДАЛЬНЫХ ОКОН


// Обработчик «отправки» формы, обновление профиля
function profileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    const newProfile = document.querySelector('.popup_type_edit');
    closePopup(newProfile);
}

// Прикрепляем обработчик к форме для обработки события «submit»
profileForm.addEventListener('submit', profileFormSubmit);











 












  
  






