import {createCard} from './scripts/card.js';
import {openPopup, closePopup} from './scripts/modal.js';
import {enableValidation, clearValidation, toggleButtonState} from './scripts/validation.js';
import './pages/index.css';
import { 
  updateAvatar, 
  fetchUserData, 
  fetchCards, 
  addCard, 
  updateProfileData, 
  toggleLike, 
  deleteCard
} from './scripts/api.js'; 

const profileForm = document.forms['edit-profile'];
const nameInput = profileForm.querySelector('.popup__input_type_name');
const jobInput = profileForm.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popups = document.querySelectorAll('.popup');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupCaption = popupTypeImage.querySelector('.popup__caption');
const newCardForm = document.forms['new-place'];
const placesList = document.querySelector('.places__list');
const profileImage = document.querySelector('.profile__image');
const profileImageContainer = document.querySelector('.profile__image-container');
const popupChangeAvatar = document.querySelector('.popup_type_change-avatar');
const avatarForm = document.forms['new-avatar'];

// ЗАПУСКАЮ ВАЛИДАЦИЮ
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button-disabled',
  inputErrorClass: 'popup__input_type_error'
};

// Включаю валидацию для всех форм
enableValidation(validationSettings);

// МЕНЯЮ АВАТАР
// Обработчик клика на контейнер с аватаром
profileImageContainer.addEventListener('click', () => {
  clearValidation(avatarForm, validationSettings);
  openPopup(popupChangeAvatar);
});

// Обработчик отправки формы изменения аватара
function changeAvatarFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = avatarForm.querySelector(validationSettings.submitButtonSelector);
  const resetButton = changeButtonText(submitButton, 'Сохранение...');
  const avatarLink = avatarForm.elements['avatar_link'].value;

  // Вызываю функцию updateAvatar из api.js
  updateAvatar(avatarLink)
    .then(res => {
      if (!res.ok) {
        throw new Error(`Ошибка: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
      closePopup(popupChangeAvatar);
      avatarForm.reset();
    })
    .catch(error => {
      console.error('Ошибка при обновлении аватара:', error);
    })
    .finally(() => {
      resetButton(); 
    });
}

avatarForm.addEventListener('submit', changeAvatarFormSubmit);
// ЗАКОНЧИЛ МЕНЯТЬ АВАТАР

// ДОБАВЛЯЮ И УДАЛЯЮ КАРТОЧКИ
// Функция добавления новой карточки
function addNewCard(card, userId) {
  // Добавляем свойство owner с _id текущего пользователя
  const fullCard = {
    ...card,
    owner: { _id: userId },
    likes: [] 
  };

  const newCardElement = createCard(fullCard, handleDeleteCard, handleToggleLike, handleImageClick, userId);
  placesList.prepend(newCardElement);
}

// Обработчик отправки формы добавления карточки
function addProfileCardFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = newCardForm.querySelector('.popup__button');
  const resetButton = changeButtonText(submitButton, 'Сохранение...'); 

  const name = newCardForm.elements['place-name'].value;
  const link = newCardForm.elements['link'].value;

  // Вызываем функцию addCard из api.js
  addCard(name, link)
    .then(card => {
      addNewCard(card, userId);
      closePopup(newCardForm.closest('.popup'));
      newCardForm.reset();
    })
    .catch(error => {
      console.error('Ошибка при добавлении карточки:', error);
    })
    .finally(() => {
      resetButton(); 
    });
}

newCardForm.addEventListener('submit', addProfileCardFormSubmit);

// Отображение карточек
function renderCards(cards, userId) {
  const placesList = document.querySelector('.places__list');
  
  while (placesList.firstChild) {
    placesList.removeChild(placesList.firstChild);
  }

  cards.forEach(card => {
    const cardElement = createCard(card, handleDeleteCard, handleToggleLike, handleImageClick, userId);
    placesList.append(cardElement);
  });
}

//ЗАКОНЧИЛ СОЗДАВАТЬ И УДАЛЯТЬ КАРТОЧКИ

// ФУНКЦИОНАЛ ОТКРЫТИЯ МОДАЛЬНЫХ ОКОН
// Кнопка отрытия модального окна редактирования профиля
const profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', openEditPopup);

//Функция открывающая модальное окно редактирования профиля
function openEditPopup() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  clearValidation(profileForm, validationSettings);

  // Обновляю состояние кнопки после подстановки данных
  const inputList = Array.from(profileForm.querySelectorAll('.popup__input'));
  const buttonElement = profileForm.querySelector('.popup__button');
  toggleButtonState(inputList, buttonElement, {
    inactiveButtonClass: 'popup__button-disabled'
  });
  
  openPopup(popupEdit); 
}

// Кнопка отрытия модального окна добавления карточки
const cardAddButton = document.querySelector('.profile__add-button');
cardAddButton.addEventListener('click', addCardPopup); 

//Функция открывающая модальное окно добавления карточки
function addCardPopup() {
  // Очищаем ошибки валидации и деактивируем кнопку
  clearValidation(popupNewCard, validationSettings);

  openPopup(popupNewCard);
}

// Функция открытия модального окна с картинкой
function handleImageClick(card) {
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupCaption.textContent = card.name;

  openPopup(popupTypeImage);
}
// ЗАКОНЧИЛИ ФУНКЦИОНАЛ ОТКРЫТИЯ МОДАЛЬНЫХ ОКОН

// ФУНКЦИОНАЛ ЗАКРЫТИЯ МОДАЛЬНЫХ ОКОН
popups.forEach((popup) => {
  popup.querySelector('.popup__close').addEventListener('click', handleClosePopupByClickOnButton);
});

// Закрытие попапа при клике на кнопку
function handleClosePopupByClickOnButton(event) {
  if (event.target.classList.contains('popup__close')) {
    const popup = event.target.closest('.popup');
    
    closePopup(popup);
  }
}
// ЗАКОНЧИЛИ ФУНКЦИОНАЛ ЗАКРЫТИЯ МОДАЛЬНЫХ ОКОН

// РАБОТА С ПРОФИЛЕМ ПОЛЬЗОВАТЕЛЯ
let userId;

// Обновление профиля пользователя
function updateUserProfile(userData) {
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileImage.style.backgroundImage = `url(${userData.avatar})`;
}

// Обработчик отправки формы редактирования профиля
function editProfileFormSubmit(evt) {
  evt.preventDefault();

  const submitButton = profileForm.querySelector('.popup__button');
  const resetButton = changeButtonText(submitButton, 'Сохранение...'); // Меняем текст кнопки

  const name = nameInput.value;
  const about = jobInput.value;

  // Вызываем функцию updateProfileData из api.js
  updateProfileData(name, about)
    .then(data => {
      if (data) {
        profileTitle.textContent = data.name;
        profileDescription.textContent = data.about;
        closePopup(popupEdit);
      }
    })
    .catch(error => {
      console.error('Ошибка при обновлении профиля:', error);
    })
    .finally(() => {
      resetButton(); // Возвращаем исходный текст кнопки
    });
}

// Назначаем обработчик формы
profileForm.addEventListener('submit', editProfileFormSubmit);

// ЗАКОНЧИЛ РАБОТУ С ПРОФИЛЕМ ПОЛЬЗОВАТЕЛЯ

// Загрузка данных и отображение
Promise.all([fetchUserData(), fetchCards()])
  .then(([userData, cardsData]) => {
    userId = userData._id; 
    updateUserProfile(userData);
    renderCards(cardsData, userId);
  })
  .catch(error => {
    console.error('Ошибка при загрузке данных:', error);
  });

// Меняем текст кнопки
function changeButtonText(button, newText, callback) {
  const initialText = button.textContent; // Сохраняем исходный текст кнопки
  button.textContent = newText; // Меняем текст кнопки

  // Возвращаем функцию, которая восстановит исходный текст
  return () => {
    button.textContent = initialText;
    if (callback) callback(); // Выполняем переданный колбэк
  };
}

// Обработчик удаления карточки
function handleDeleteCard(cardId, cardElement) {
  deleteCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch(error => {
      console.error('Ошибка при удалении карточки:', error);
    });
}

// Обработчик лайка
function handleToggleLike(cardId, likeButton, likesNumberElement) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  toggleLike(cardId, isLiked)
    .then(updatedCard => {
      likesNumberElement.textContent = updatedCard.likes.length;
      likeButton.classList.toggle('card__like-button_is-active');
    })
    .catch(error => {
      console.error('Ошибка при обновлении лайка:', error);
    });
}


