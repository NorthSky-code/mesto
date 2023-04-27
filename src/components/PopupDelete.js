import Popup from './Popup';

export default class PopupDelete extends Popup {
	constructor({ popupSelector, submitForm }) {
		super(popupSelector);
		this._submitForm = submitForm;
		this._form = this._popup.querySelector('.popup__content');
		this._submitButton = this._popup.querySelector('.popup__submit');
	}

	renderLoading(isLoading) {
		if (isLoading) {
			this._submitButton.textContent = 'Удаление...';
		} else {
			this._submitButton.textContent = 'Да';
		}
	}

	setEventListeners() {
		super.setEventListeners();
		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault();
			this._submitForm(this._cardId, this._card);
			this.close();
		});
	}

	open(cardId, card) {
		super.open();
		this._cardId = cardId;
		this._card = card;
	}

	close() {
		super.close();
	}
}