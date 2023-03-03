const validationConfig = {
	formSelector: '.popup__content',
	inputSelector: '.popup__input',
	submitButtonSelector: '.button__popup',
	inactiveButtonClass: 'button__popup_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible'
};

const showInputError = (form, config) => {
	const inputElement = form.querySelector(config.inputSelector);
	const errorElement = form.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.add(config.inputErrorClass);
	errorElement.classList.add(config.errorClass);
	errorElement.textContent = inputElement.validationMessage;
}

const hideInputError = (form, config) => {
	const inputElement = form.querySelector(config.inputSelector);
	const errorElement = form.querySelector(`.${inputElement.id}-error`);
	inputElement.classList.remove(config.inputErrorClass);
	errorElement.classList.remove(config.errorClass);
	errorElement.textContent = '';
}

const checkInputValidity = (form, config) => {
	const inputElement = form.querySelector(config.inputSelector);
	if (!inputElement.validity.valid) {
		showInputError(form, config);
	} else {
		hideInputError(form, config);
	}
}

const setEventListeners = (form, config) => {
	const inputList = Array.from(form.querySelectorAll(config.inputSelector));
	inputList.forEach((inputElement) => {
		inputElement.addEventListener('input', () => {
			checkInputValidity(form, config);
		});
	});
}

const enableValidation = (config) => {
	const formList = Array.from(document.querySelectorAll(config.formSelector));
	formList.forEach((form) => {
		setEventListeners(form, config);
	});
}

enableValidation(validationConfig);
