const validationConfig = {
	formSelector: '.popup__content',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__submit',
	inactiveButtonClass: 'popup__submit_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible'
};

const showInputError = (config, inputElement) => {
	const errorElement = document.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.add(config.inputErrorClass);
	errorElement.classList.add(config.errorClass);
	errorElement.textContent = inputElement.validationMessage;
};

const hideInputError = (config, inputElement) => {
	const errorElement = document.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.remove(config.inputErrorClass);
	errorElement.classList.remove(config.errorClass);
	errorElement.textContent = '';
};

const checkInputValidity = (config, inputElement) => {
	if (!inputElement.validity.valid) {
		showInputError(config, inputElement);
	} else {
		hideInputError(config, inputElement);
	}
};

const hasInvalidInput = (inputList) => {
	return inputList.some((inputElement) => {
		return !inputElement.validity.valid;
	});
};

const setEventListeners = (form, config) => {
	const inputList = Array.from(form.querySelectorAll(config.inputSelector));
	const buttonElement = form.querySelector(config.submitButtonSelector);
	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', () => {
			checkInputValidity(config, inputElement);
			toggleButtonState(inputList, buttonElement, config);
		});
	});
	toggleButtonState(inputList, buttonElement, config);
};

const toggleButtonState = (inputList, buttonElement, config) => {
	if (hasInvalidInput(inputList)) {
		buttonElement.classList.add(config.inactiveButtonClass);
	} else {
		buttonElement.classList.remove(config.inactiveButtonClass);
	}
};

const enableValidation = (config) => {
	const formList = Array.from(document.querySelectorAll(config.formSelector));
	formList.forEach((form) => {
		setEventListeners(form, config);
	});
};

enableValidation(validationConfig);