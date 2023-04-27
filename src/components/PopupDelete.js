import Popup from './Popup';

export default class PopupDelete extends Popup {
	constructor({ popupSelector, submitForm }) {
		super(popupSelector);
		this._submitForm = submitForm;
		this._form = this._popup.querySelector('.popup__content');
		this._submitButton = this._popup.querySelector('.popup__submit');
	}

	setEventListeners() {
		super.setEventListeners();
		this._form.addEventListener('submit', (evt) => {
			evt.preventDefault();
			const initialText = this._submitButton.textContent;
			this._submitButton.textContent = 'Удаление...';
			this._submitForm(this._cardId, this._card)
				.then(() => this.close())
				.finally(() => {
					this._submitButton.textContent = initialText;
				})
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