export function addCardPopup() {
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

// Закрытие по клавише Escape
export function closeByEsc(e) {
  if (e.key === 'Escape') {
    document.querySelectorAll('.popup').forEach((popup) => {
      popup.classList.remove('popup_is-opened');
    });
  }
};

// Закрытие по клику на оверлей
export function closeByOverlayClick(e) {
  if (e.target.classList.contains('popup')) {
    const popup = e.target;
    popup.classList.remove('popup_is-opened');
  }
};

// Закрытие по клику на кнопку
export function closePopupByButtonClick(e) {
  if (e.target.classList.contains('popup__close')) {
    const popup = e.target.closest('.popup');
    if (popup.classList.contains('popup_is-opened')) {
      popup.classList.remove('popup_is-opened');
    }
  }
};










