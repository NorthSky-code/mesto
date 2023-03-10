// Переменные
const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.cards');
const templateCard = document.querySelector('.card-template').content.querySelector('.card');
const popupList = document.querySelectorAll('.popup');

const profileName = container.querySelector('.profile__title');
const profileJob = container.querySelector('.profile__subtitle');

const popupFormProfile = document.querySelector('.popup__content');
const popupUserName = popupFormProfile.querySelector('.popup__input_user_name');
const popupUserJob = popupFormProfile.querySelector('.popup__input_user_job');

const popupProfile = document.querySelector('.popup-profile');
const buttonOpenProfile = container.querySelector('.button_type_edit');
const buttonSaveProfile = document.querySelector('.button_type_save');

const buttonsPopupClose = document.querySelectorAll('.button_type_close');

const popupFormCard = document.querySelector('.popup__content-card');
const popupLinkCard = document.querySelector('.popup__input_image_link');
const popupNameCard = document.querySelector('.popup__input_image_name');

const popupCreateCard = document.querySelector('.popup-card');
const buttonAddCard = container.querySelector('.button_type_add');
const buttonCreateCard = document.querySelector('.button_type_create');

const popupImageBox = document.querySelector('.popup-image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

// Функция закрытия модального окна "Escape"
const handleClosePopupByEsc = (evt) => {
	if (evt.key === 'Escape') {
		const popupOpened = document.querySelector('.popup_opened');
		handleClosePopup(popupOpened);
	}
};

// Функция закрытия модального окна "Overlay"
const handleClosePopupByOverlay = (evt) => {
	if (evt.target === evt.currentTarget) {
		handleClosePopup(evt.target);
	}
};

//Открытие и закрытие модального окна
const handleOpenPopup = (popup) => {
	popup.classList.add('popup_opened');
	document.addEventListener('keydown', handleClosePopupByEsc);
};

const handleClosePopup = (popup) => {
	popup.classList.remove('popup_opened');
	document.removeEventListener('keydown', handleClosePopupByEsc);
}

// Сохранить изменение в модальном окне
const handleFormProfileSubmit = (evt) => {
	evt.preventDefault();
	profileName.textContent = popupUserName.value;
	profileJob.textContent = popupUserJob.value;
	handleClosePopup(popupProfile);
};

const handleOpenProfile = () => {
	handleOpenPopup(popupProfile)
	popupUserName.value = profileName.textContent;
	popupUserJob.value = profileJob.textContent;
	enableButton(buttonSaveProfile, validationConfig);
};

const handleOpenAddCard = () => {
	handleOpenPopup(popupCreateCard);
	disableButton(buttonCreateCard, validationConfig);
}

// Функция добавление карточки
const renderCard = (cardData, сontainer) => {
	сontainer.prepend(createCard(cardData));
};

// Функция создание карточки
const createCard = (cardData) => {
	const cardElement = templateCard.cloneNode(true);
	const cardImage = cardElement.querySelector('.card__image');
	const cardName = cardElement.querySelector('.card__title');

	cardImage.src = cardData.link;
	cardImage.alt = cardData.name;
	cardName.textContent = cardData.name;

	const buttonLike = cardElement.querySelector('.button__like');
	buttonLike.addEventListener('click', () => {
		buttonLike.classList.toggle('button__like_active');
	});
	const buttonDelete = cardElement.querySelector('.button_type_delete');
	buttonDelete.addEventListener('click', () => {
		cardElement.remove();
	});

	cardImage.addEventListener('click', () => {
		popupImage.src = cardData.link;
		popupImage.alt = cardData.name;
		popupCaption.textContent = cardData.name;

		handleOpenPopup(popupImageBox);
	});

	return cardElement;
};

// Добавить карточку с переданными данными
const handleFormCardSubmit = (evt) => {
	evt.preventDefault();
	renderCard(({
		link: popupLinkCard.value,
		name: popupNameCard.value,
	}), cardsContainer);

	handleClosePopup(popupCreateCard);

	evt.target.reset();
}

// Перебор массива
buttonsPopupClose.forEach((button) => {
	const popup = button.closest('.popup');
	button.addEventListener('click', () => {
		handleClosePopup(popup);
	});
});

popupList.forEach((popup) => {
	popup.addEventListener('click', handleClosePopupByOverlay);
});

initialCards.forEach((cardData) => {
	renderCard(cardData, cardsContainer);
});

// Обработчик событий
buttonAddCard.addEventListener('click', handleOpenAddCard);
buttonOpenProfile.addEventListener('click', handleOpenProfile);
popupFormProfile.addEventListener('submit', handleFormProfileSubmit);
popupFormCard.addEventListener('submit', handleFormCardSubmit);