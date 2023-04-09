export default class Popup {
	constructor(popupSelector) {
		this._popup = document.querySelector(popupSelector);
		this._closeButton = this._popup.querySelector('.button_type_close');
		this._handleEscClose = this._handleEscClose.bind(this);
	}
	/** Метод открытия и закрытия модального окна */
	open() {
		this._popup.classList.add('popup_opened');
		document.addEventListener('keydown', this._handleEscClose);
	}

	close() {
		this._popup.classList.remove('popup_opened');
		document.removeEventListener('keydown', this._handleEscClose);
	}

	/** Метод закрытия модального окна клавишей "Escape" */
	_handleEscClose(evt) {
		if (evt.key === 'Escape') {
			this.close();
		}
	}

	/** Метод закрытия модального окна "Overlay" */
	_handleMouseClose(evt) {
		if (evt.target === evt.currentTarget) {
			this.close();
		}
	}

	/** Методы навешивания слушателей */
	setEventListeners() {
		this._closeButton.addEventListener('click', () => this.close());
		this._popup.addEventListener('mousedown', (evt) => this._handleMouseClose(evt));
	}
}