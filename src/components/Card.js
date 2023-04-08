export default class Card {
	constructor(data, templateSelector, openImage) {
		this._name = data.name;
		this._link = data.link;
		this._templateSelector = templateSelector;
		this._openImage = openImage;
	}

	_setEventListeners() {
		this._like.addEventListener('click', () =>
			this._handleButtonLike()
		)
		this._delete.addEventListener('click', () =>
			this._handleButtonDeleteCard()
		)
		this._cardImage.addEventListener('click', () =>
			this._openImage(this._name, this._link)
		)
	}

	_cardData() {
		this._cardImage.src = this._link;
		this._cardImage.alt = this._name;
		this._cardName.textContent = this._name;
	}

	_handleButtonLike() {
		this._element.querySelector('.button__like').classList.toggle('button__like_active');
	}

	_handleButtonDeleteCard() {
		this._element.remove();
		this._element = null;
	}


	_getTemplate() {
		const cardElement = document
			.querySelector(this._templateSelector)
			.content
			.querySelector('.card')
			.cloneNode(true);

		return cardElement;
	}


	generateCard() {
		this._element = this._getTemplate();

		this._cardImage = this._element.querySelector('.card__image');
		this._cardName = this._element.querySelector('.card__title');
		this._like = this._element.querySelector('.button__like');
		this._delete = this._element.querySelector('.button_type_delete');

		this._setEventListeners();
		this._cardData();

		return this._element;
	}
}