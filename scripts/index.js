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
const buttonProfile = container.querySelector('.button_type_edit');

const buttonsPopupClose = document.querySelectorAll('.button_type_close');

const popupFormCard = document.querySelector('.popup__content-card');
const popupLinkCard = document.querySelector('.popup__input_image_link');
const popupNameCard = document.querySelector('.popup__input_image_name');

const popupCreateCard = document.querySelector('.popup-card');
const buttonCreateCard = container.querySelector('.button_type_add');

const popupImageBox = document.querySelector('.popup-image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

// Функция открытие и закрытие модального окна
const popupCloseKey = (evt) => {
	if (evt.key === 'Escape') {
		const popups = document.querySelector('.popup_opened');
		handleClosePopup(popups);
	}
};

const popupCloseClickOverlay = (evt) => {
	if (evt.target === evt.currentTarget) {
		const popups = document.querySelector('.popup_opened');
		handleClosePopup(popups);
	}
};

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

//Открытие и закрытие модального окна
buttonProfile.addEventListener('click', () => {
	handleOpenPopup(popupProfile);
	popupUserName.value = profileName.textContent;
	popupUserJob.value = profileJob.textContent;
});

buttonCreateCard.addEventListener('click', () => {
	handleOpenPopup(popupCreateCard);
});

buttonsPopupClose.forEach((button) => {
	const popup = button.closest('.popup');
	button.addEventListener('click', () => {
		handleClosePopup(popup);
	});
});

// Сохранить изменение в модальном окне с автозакрытием после сохранения
const handleFormProfileSubmit = (evt) => {
	evt.preventDefault();
	profileName.textContent = popupUserName.value;
	profileJob.textContent = popupUserJob.value;
	handleClosePopup(popupProfile);
};

// Функция для создание карточки
const createCard = (link, name) => {
	const cardElement = templateCard.cloneNode(true);
	const cardImage = cardElement.querySelector('.card__image');
	const cardName = cardElement.querySelector('.card__title');

	cardImage.src = link;
	cardImage.alt = name;
	cardName.textContent = name;

	cardElement.querySelector('.button__like').addEventListener('click', function (evt) {
		evt.target.classList.toggle('button__like_active');
	});
	cardElement.querySelector('.button_type_delete').addEventListener('click', function (evt) {
		evt.target.closest('.card').remove();
	});

	cardImage.addEventListener('click', () => {
		popupImage.src = link;
		popupImage.alt = name;
		popupCaption.textContent = name;

		handleOpenPopup(popupImageBox);
	});

	return cardElement;
};

// Добавление карточек в DOM
const renderCard = (link, name) => {
	cardsContainer.append(createCard(link, name));
};

initialCards.forEach((element) => {
	renderCard(element.link, element.name);
});

// Создать карточку с переданными данными
const handleFormCardSubmit = (evt) => {
	evt.preventDefault();
	cardsContainer.prepend(createCard(popupLinkCard.value, popupNameCard.value));
	handleClosePopup(popupCreateCard);

	evt.target.reset();
}

// Отправка формы
popupFormProfile.addEventListener('submit', handleFormProfileSubmit);
popupFormCard.addEventListener('submit', handleFormCardSubmit);