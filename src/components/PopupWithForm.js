import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
	constructor({ popupSelector, submitForm }) {
		super(popupSelector);
		this._submitForm = submitForm;
		this._form = this._popup.querySelector('.popup__content');
		this._inputList = this._form.querySelectorAll('.popup__input');
		this._submitButton = this._popup.querySelector('.popup__submit');
	}

	_getInputValues() {
		this._formValues = {};
		this._inputList.forEach((input) => {
			this._formValues[input.name] = input.value;
		});
		return this._formValues;
	}

	setInputValues(data) {
		this._inputList.forEach((input) => {
			input.value = data[input.name];
		});
	}

	setEventListeners() {
		super.setEventListeners();
		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault();
			const initialText = this._submitButton.textContent;
			this._submitButton.textContent = 'Сохранение...';
			this._submitForm(this._getInputValues())
				.then(() => this.close())
				.finally(() => {
					this._submitButton.textContent = initialText;
				})
		});
	}

	close() {
		super.close();
		this._form.reset();
	}
}