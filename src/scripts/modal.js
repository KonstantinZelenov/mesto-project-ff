// Функция для открытия попапа
export function openPopup(popup, closePopupOnEsc) {
  popup.classList.add('popup_is-opened');
  popup.classList.add('popup_is-animated');
  document.addEventListener('keydown', closePopupOnEsc);
}

// Функция для закрытия попапа
export function closePopup(popup, closePopupOnEsc) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupOnEsc);
}
















