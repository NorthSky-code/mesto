import { handleOpenPopup } from './util.js'

/** Массив данных для карточек */
const initialCards = [
	{
		name: 'Архыз',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
	},
	{
		name: 'Челябинская область',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
	},
	{
		name: 'Иваново',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
	},
	{
		name: 'Камчатка',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
	},
	{
		name: 'Холмогорский район',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
	},
	{
		name: 'Байкал',
		link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
	}
];

class Card {
	constructor(data, templateSelector) {
		this._name = data.name;
		this._link = data.link;
		this._templateSelector = templateSelector;
	}

	_setEventListeners() {
		this._element.querySelector('.button__like').addEventListener('click', () => {
			this._handleButtonLike();
		});
		this._element.querySelector('.button_type_delete').addEventListener('click', () => {
			this._handleButtonDeleteCard();
		});
		this._element.querySelector('.card__image').addEventListener('click', () => {
			this._handleOpenImage();
		});
	}

	_handleButtonLike() {
		this._element.querySelector('.button__like').classList.toggle('button__like_active');
	}

	_handleButtonDeleteCard() {
		this._element.remove();
		this._element = null;
	}

	_handleOpenImage() {
		const popupImageBox = document.querySelector('.popup-image');
		const popupImage = document.querySelector('.popup__image');
		const popupCaption = document.querySelector('.popup__caption');

		popupImage.src = this._link;
		popupImage.alt = this._name;
		popupCaption.textContent = this._name;

		handleOpenPopup(popupImageBox);
	}

	_getTemplate() {
		const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);

		return cardElement;
	}

	generateCard() {
		this._element = this._getTemplate();
		this._setEventListeners();

		this._element.querySelector('.card__image').src = this._link;
		this._element.querySelector('.card__image').alt = this._name;
		this._element.querySelector('.card__title').textContent = this._name;

		return this._element;
	}
}

export { Card, initialCards };