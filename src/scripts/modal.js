// Функция для открытия попапа
export function openPopup(popup) {
  popup.classList.add('popup_is-animated');
  setTimeout(() => {
   popup.classList.add('popup_is-opened'); 
  }, 50);
  document.addEventListener('keydown', closePopupOnEsc);
  document.addEventListener('click', closeByOverlayClick);
}

// Функция для закрытия попапа
export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closePopupOnEsc);
  document.removeEventListener('click', closeByOverlayClick);
}

// Закрытие попапа при нажатии клавиши "Escape"
function closePopupOnEsc(e) {
  if (e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
    closePopup(openedPopup);
    }
  }
}

// Закрытие попапа при клике на оверлей
function closeByOverlayClick(e) {
  if (e.target.classList.contains('popup')) {
    const popup = e.target;
    
    closePopup(popup);
  }
};


















