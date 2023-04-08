export default class FormValidator {
	constructor(config, formElement) {
		this._config = config;
		this._formElement = formElement;
	};

	_showInputError(inputElement) {
		const errorElement = document.querySelector(`.${inputElement.id}-error`);
		inputElement.classList.add(this._config.inputErrorClass);
		errorElement.classList.add(this._config.errorClass);
		errorElement.textContent = inputElement.validationMessage;
	};

	_hideInputError(inputElement) {
		const errorElement = document.querySelector(`.${inputElement.id}-error`);
		inputElement.classList.remove(this._config.inputErrorClass);
		errorElement.classList.remove(this._config.errorClass);
		errorElement.textContent = '';
	};

	_checkInputValidity(inputElement) {
		if (!inputElement.validity.valid) {
			this._showInputError(inputElement);
		} else {
			this._hideInputError(inputElement);
		}
	};

	enableButton() {
		this._buttonElement.removeAttribute('disabled');
		this._buttonElement.classList.remove(this._config.inactiveButtonClass);
	};

	disableButton() {
		this._buttonElement.setAttribute('disabled', true);
		this._buttonElement.classList.add(this._config.inactiveButtonClass);
	}

	resetError() {
		this._inputList.forEach((inputElement) => {
			this._hideInputError(inputElement);
		});
		this._toggleButtonState();
	}

	_hasInvalidInput() {
		return this._inputList.some((inputElement) => {
			return !inputElement.validity.valid;
		});
	};

	_toggleButtonState() {
		if (this._hasInvalidInput()) {
			this.disableButton();
		} else {
			this.enableButton();
		}
	};

	_setEventListeners() {
		this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
		this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
		this._inputList.forEach((inputElement) => {
			inputElement.addEventListener('input', () => {
				this._checkInputValidity(inputElement);
				this._toggleButtonState();
			});
		});
		this._toggleButtonState();
	}

	enableValidation() {
		this._setEventListeners();
	};
}