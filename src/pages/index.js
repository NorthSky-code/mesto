fetch('https://nomoreparties.co/v1/cohort-64', {
	headers: {
		authorization: 'ed50e778-664c-4bb0-b542-3c1eeacf1196',
		'Content-type': 'application/json'
	}
})

import './index.css';

/** Подключаем модули */
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

/** Подключаем переменные */
import {
	initialCards,
	popupFormProfile,
	popupUserName,
	popupUserJob,
	buttonOpenProfile,
	popupFormCard,
	buttonAddCard,
	validationConfig
} from '../utils/constants.js';

/** Валидация форм */
const popupProfileValidation = new FormValidator(validationConfig, popupFormProfile);
popupProfileValidation.enableValidation();

const popupCreateCardValidation = new FormValidator(validationConfig, popupFormCard);
popupCreateCardValidation.enableValidation();

/** Открытие модального окна с валидайцией данных и изменением статуса кнопки */
const handleOpenProfile = () => {
	popupFormProfileSubmit.open();
	const user = editUserProfile.getUserInfo();
	popupUserName.value = user.name;
	popupUserJob.value = user.job;
	popupProfileValidation.enableButton();
	popupProfileValidation.resetError();
}

const handleOpenAddCard = () => {
	popupFormCardSubmit.open();
	popupCreateCardValidation.disableButton();
}

/** Открыть картинку по клику */
const popupOpenImage = new PopupWithImage('.popup-image');
popupOpenImage.setEventListeners();

const handleCardClick = (name, link) => {
	popupOpenImage.open(name, link);
}

/** Создать карточку */
const createCard = (item) => {
	const card = new Card(item, '.card-template', handleCardClick);
	return card.generateCard();
}

/** Редактировать профиль */
const editUserProfile = new UserInfo({
	nameSelector: '.profile__title',
	jobSelector: '.profile__subtitle'
})

const popupFormProfileSubmit = new PopupWithForm({
	popupSelector: '.popup-profile',
	submitForm: (item) => {
		editUserProfile.setUserInfo(item);
	}
})
popupFormProfileSubmit.setEventListeners();

/** Добавить список карточек */
const cardList = new Section({
	items: initialCards,
	renderer: (item) => {
		const card = createCard(item);
		cardList.addItem(card);
	}
}, '.cards');
cardList.renderItems();

/** Добавить новую карточку в список */
const popupFormCardSubmit = new PopupWithForm({
	popupSelector: '.popup-card',
	submitForm: (item) => {
		const card = createCard(item);
		cardList.addItem(card);
	}
})
popupFormCardSubmit.setEventListeners();

/** Обработчики событий */
buttonAddCard.addEventListener('click', handleOpenAddCard);
buttonOpenProfile.addEventListener('click', handleOpenProfile);
