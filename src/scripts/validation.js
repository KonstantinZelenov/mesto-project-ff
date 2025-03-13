// Функция для показа ошибки
function showInputError(formElement, inputElement, errorMessage, config) {
  inputElement.classList.add(config.inputErrorClass);
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (errorElement) {
    errorElement.textContent = errorMessage;
    errorElement.style.opacity = '1';
  }
}

// Функция для скрытия ошибки
function hideInputError(formElement, inputElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (errorElement) {
    errorElement.textContent = '';
    errorElement.style.opacity = '0';
  }
}

// Функция для проверки валидности поля
function isValid(formElement, inputElement, config) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
}

// Функция для деактивации кнопки отправки
const disableSubmitButton = (buttonElement, config) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(config.inactiveButtonClass);
};

// Функция для очистки ошибок валидации и управления состоянием кнопки
export function clearValidation(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  // Очищаем ошибки для каждого поля ввода
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
  });

  // Управляем состоянием кнопки
  toggleButtonState(inputList, buttonElement, config);
}

// Функция для проверки, есть ли невалидные поля
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// Функция для изменения состояния кнопки
export function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, config);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
}

// Вешаем слушатели на каждый элемент ввода
function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  // Проверяем состояние кнопки при открытии формы
  toggleButtonState(inputList, buttonElement, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, config); // Валидируем поле
      toggleButtonState(inputList, buttonElement, config); // Обновляем состояние кнопки
    });

    inputElement.addEventListener('focus', () => isValid(formElement, inputElement, config));
    inputElement.addEventListener('blur', () => isValid(formElement, inputElement, config));
  });
}

// Включаем валидацию для всех форм
export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    setEventListeners(formElement, config);
  });
}

