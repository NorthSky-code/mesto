// Переменные
const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.cards');
const templateCard = document.querySelector('.card-template').content.querySelector('.card');

const profileName = container.querySelector('.profile__title');
const profileJob = container.querySelector('.profile__subtitle');

const popupFormProfile = document.querySelector('.popup__content');
const popupUserName = popupFormProfile.querySelector('.popup__input_user_name');
const popupUserJob = popupFormProfile.querySelector('.popup__input_user_job');

const popupProfile = document.querySelector('.popup-profile');
const buttonOpenProfile = container.querySelector('.button_type_edit');

const buttonsPopupClose = document.querySelectorAll('.button_type_close');

const popupFormCard = document.querySelector('.popup__content-card');
const popupLinkCard = document.querySelector('.popup__input_image_link');
const popupNameCard = document.querySelector('.popup__input_image_name');

const popupCreateCard = document.querySelector('.popup-card');
const buttonCreateCard = container.querySelector('.button_type_add');

const popupImageBox = document.querySelector('.popup-image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

// Функция закрытия модального окна "Escape"
const popupCloseKey = (evt) => {
	if (evt.key === 'Escape') {
		const popups = document.querySelector('.popup_opened');
		handleClosePopup(popups);
	}
};

// Функция закрытия модального окна "Overlay"
const popupCloseClickOverlay = (evt) => {
	if (evt.target === evt.currentTarget) {
		const popups = document.querySelector('.popup_opened');
		handleClosePopup(popups);
	}
};

//Открытие и закрытие модального окна
const handleOpenPopup = (popup) => {
	popup.classList.add('popup_opened');
	document.addEventListener('keydown', popupCloseKey);
	popup.addEventListener('click', popupCloseClickOverlay);
};

const handleClosePopup = (popup) => {
	popup.classList.remove('popup_opened');
	document.removeEventListener('keydown', popupCloseKey);
	popup.removeEventListener('click', popupCloseClickOverlay);
};

// Сохранить изменение в модальном окне с автозакрытием после сохранения
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
};

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
	const card = cardElement;
	const buttonDelete = cardElement.querySelector('.button_type_delete');
	buttonDelete.addEventListener('click', () => {
		card.remove();
	});

	cardImage.addEventListener('click', () => {
		popupImage.src = cardData.link;
		popupImage.alt = cardData.name;
		popupCaption.textContent = cardData.name;

		handleOpenPopup(popupImageBox);
	});

	return cardElement;
};

// Создать карточку с переданными данными
const handleFormCardSubmit = (evt) => {
	evt.preventDefault();
	renderCard(
		(cardData = {
			link: popupLinkCard.value,
			name: popupNameCard.value,
		}),
		cardsContainer);
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

initialCards.forEach((cardData) => {
	renderCard(cardData, cardsContainer);
});

// Обработчик событий
buttonCreateCard.addEventListener('click', () => {
	handleOpenPopup(popupCreateCard);
});

buttonOpenProfile.addEventListener('click', handleOpenProfile);
popupFormProfile.addEventListener('submit', handleFormProfileSubmit);
popupFormCard.addEventListener('submit', handleFormCardSubmit);