import {initialCards} from './scripts/cards.js';
import {createCard, toggleLike, deleteCard, handleImageClick} from './scripts/card.js';
import {addCardPopup, closeByEsc, closeByOverlayClick, closePopupByButtonClick} from './scripts/modal.js';
import './pages/index.css';


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
  closeNewCardForm(newCardForm.closest('.popup'));
  newCardForm.reset();
});

// Функция закрытия попапа
function closeNewCardForm(popup) {
  popup.classList.remove('popup_is-opened');
  popup.classList.remove('popup_is-animated');

  // Добавляем задержку перед анимацией закрытия
  setTimeout(() => {
    popup.style.visibility = 'hidden';
    popup.style.opacity = '0';
  }, 300); // Задержка 300 мс, соответствует времени анимации открытия
}

//ЗАКОНЧИЛ СОЗДАВАТЬ И УДАЛЯТЬ КАРТОЧКИ


// ФУНКЦИОНАЛ ОТКРЫТИЯ МОДАЛЬНЫХ ОКОН
// Кнопка отрытия редактирования профиля
const profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', openEditPopup);
//Функция открывающая модальное окно edit




// Кнопка отрытия модального окна добавления карточки
const cardAddButton = document.querySelector('.profile__add-button');
cardAddButton.addEventListener('click', addCardPopup); 
// ЗАКОНЧИЛИ ФУНКЦИОНАЛ ОТКРЫТИЯ МОДАЛЬНЫХ ОКОН


// ФУНКЦИОНАЛ ЗАКРЫТИЯ МОДАЛЬНЫХ ОКОН
const popups = document.querySelectorAll('.popup');

document.addEventListener('click', closePopupByButtonClick);
document.addEventListener('keydown', closeByEsc);


popups.forEach((popup) => {
  popup.addEventListener('click', closeByOverlayClick);
  popup.querySelector('.popup__close').addEventListener('click', closePopupByButtonClick);
});

// ЗАКОНЧИЛИ ФУНКЦИОНАЛ ЗАКРЫТИЯ МОДАЛЬНЫХ ОКОН




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
// Находим форму изменения профиля в DOM
const formElement = document.forms['edit-profile'];
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







 












  
  






