export default class Popup {
	constructor(popupSelector) {
		this._popupSelector = document.querySelector(popupSelector);
		this._closeButton = this._popupSelector.querySelector('.button_type_close');
	}
	/** Метод открытия и закрытия модального окна */
	open() {
		this._popupSelector.classList.add('popup_opened');
		document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
	}

	close() {
		this._popupSelector.classList.remove('popup_opened');
		document.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
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
		this._popupSelector.addEventListener('mousedown', (evt) => this._handleMouseClose(evt));
	}
}