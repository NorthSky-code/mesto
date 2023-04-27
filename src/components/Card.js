export default class Card {
	constructor(data, userId, templateSelector, openImage, openPopupDelete, handleAddLike, handleRemoveLike) {
		this._name = data.name;
		this._link = data.link;
		this._cardId = data._id;
		this._ownerId = data.owner._id;
		this._likes = data.likes;
		this._userId = userId;
		this._template = templateSelector;
		this._openImage = openImage;
		this._openPopupDelete = openPopupDelete;
		this._handleAddLike = handleAddLike;
		this._handleRemoveLike = handleRemoveLike;
	}

	_setEventListeners() {
		this._likeButton.addEventListener('click', () =>
			this._checkLikeActive()
		)
		this._deleteButton.addEventListener('click', () =>
			this._openPopupDelete(this._cardId, this)
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

	_checkMyLike() {
		if (this._likes.some((likes) => likes._id === this._userId)
		) {
			this._likeButton.classList.add('button__like_active');
		}
	}

	_checkLikeActive() {
		if (this._likeButton.classList.contains('button__like_active')) {
			this._handleRemoveLike(this._cardId, this);
		} else {
			this._handleAddLike(this._cardId, this);
		}
	}

	handleButtonLike() {
		this._likeButton.classList.toggle('button__like_active');
	}

	_checkDeleteIcon() {
		if (this._userId === this._ownerId) {
			this._deleteButton.classList.remove('button__delete_deactivation')
		} else {
			this._deleteButton.classList.add('button__delete_deactivation')
		}
	}

	handleDeleteCard() {
		this._element.remove();
		this._element = null;
	}

	_getTemplate() {
		const cardElement = document
			.querySelector(this._template)
			.content
			.querySelector('.card')
			.cloneNode(true);

		return cardElement;
	}

	generateCard() {
		this._element = this._getTemplate();

		this._cardImage = this._element.querySelector('.card__image');
		this._cardName = this._element.querySelector('.card__title');
		this._likeButton = this._element.querySelector('.button__like');
		this._deleteButton = this._element.querySelector('.button__delete');
		this.countLikes = this._element.querySelector('.card__like-count');
		this.countLikes.textContent = this._likes.length;
		this._setEventListeners();
		this._cardData();
		this._checkDeleteIcon();
		this._checkMyLike();

		return this._element;
	}
}