/** Подключаемые модули */
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { initialCards } from './constants.js';

/** Переменные */
const container = document.querySelector('.content');
const cardsContainer = container.querySelector('.cards');
const popupList = document.querySelectorAll('.popup');

const profileName = container.querySelector('.profile__title');
const profileJob = container.querySelector('.profile__subtitle');

const popupFormProfile = document.querySelector('.popup__content-profile');
const popupUserName = popupFormProfile.querySelector('.popup__input_user_name');
const popupUserJob = popupFormProfile.querySelector('.popup__input_user_job');

const popupProfile = document.querySelector('.popup-profile');
const buttonOpenProfile = container.querySelector('.button_type_edit');

const buttonsPopupClose = document.querySelectorAll('.button_type_close');

const popupFormCard = document.querySelector('.popup__content-card');
const popupLinkCard = document.querySelector('.popup__input_image_link');
const popupNameCard = document.querySelector('.popup__input_image_name');

const popupCreateCard = document.querySelector('.popup-card');
const buttonAddCard = container.querySelector('.button_type_add');

const popupImageBox = document.querySelector('.popup-image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

/**  Конфигурация свойств для валидации форм */
const validationConfig = {
	formSelector: '.popup__content',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__submit',
	inactiveButtonClass: 'popup__submit_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible'
};

/** Валидация форм */
const popupProfileValidation = new FormValidator(validationConfig, popupFormProfile);
popupProfileValidation.enableValidation();

const popupCreateCardValidation = new FormValidator(validationConfig, popupFormCard);
popupCreateCardValidation.enableValidation();

/** Открытие и закрытие модального окна */
const handleOpenPopup = (popup) => {
	popup.classList.add('popup_opened');
	document.addEventListener('keydown', handleClosePopupByEsc);
};

const handleClosePopup = (popup) => {
	popup.classList.remove('popup_opened');
	document.removeEventListener('keydown', handleClosePopupByEsc);
}

/** Функция закрытия модального окна клавишей "Escape" */
const handleClosePopupByEsc = (evt) => {
	if (evt.key === 'Escape') {
		const popupOpened = document.querySelector('.popup_opened');
		handleClosePopup(popupOpened);
	}
};

/** Функция закрытия модального окна "Overlay" */
const handleClosePopupByOverlay = (evt) => {
	if (evt.target === evt.currentTarget) {
		handleClosePopup(evt.target);
	}
};

/** Открытие модального окна с сохранением данных */
const handleFormProfileSubmit = (evt) => {
	evt.preventDefault();
	profileName.textContent = popupUserName.value;
	profileJob.textContent = popupUserJob.value;
	handleClosePopup(popupProfile);
};

/** Открытие модального окна с валидайцией данных и изменением статуса кнопки */
const handleOpenProfile = () => {
	handleOpenPopup(popupProfile)
	popupUserName.value = profileName.textContent;
	popupUserJob.value = profileJob.textContent;
	popupProfileValidation.enableButton();
	popupProfileValidation.resetError();
};

const handleOpenAddCard = () => {
	handleOpenPopup(popupCreateCard);
	popupCreateCardValidation.disableButton();
}

const handleOpenImage = (name, link) => {
	popupImage.src = link;
	popupImage.alt = name;
	popupCaption.textContent = name;

	handleOpenPopup(popupImageBox);
}
/** Функция добавление карточки */
const renderCard = (item, container) => {
	container.prepend(createCard(item));
}

/** Функция создание карточки */
const createCard = (item) => {
	const card = new Card(item, '.card-template', handleOpenImage);
	return card.generateCard();
}

/** Добавить карточку с переданными данными */
const handleFormCardSubmit = (evt) => {
	evt.preventDefault();
	renderCard(({
		link: popupLinkCard.value,
		name: popupNameCard.value,
	}), cardsContainer);

	handleClosePopup(popupCreateCard);

	evt.target.reset();
}

/** Перебор массива и навешивание слушателя для закрытие карточек */
buttonsPopupClose.forEach((button) => {
	const popup = button.closest('.popup');
	button.addEventListener('click', () => {
		handleClosePopup(popup);
	});
});

popupList.forEach((popup) => {
	popup.addEventListener('mousedown', handleClosePopupByOverlay);
});

/** Перебор массива и добавление карточек */
initialCards.forEach((item) => {
	renderCard(item, cardsContainer);
});

/** Обработчики событий */
buttonAddCard.addEventListener('click', handleOpenAddCard);
buttonOpenProfile.addEventListener('click', handleOpenProfile);
popupFormProfile.addEventListener('submit', handleFormProfileSubmit);
popupFormCard.addEventListener('submit', handleFormCardSubmit);