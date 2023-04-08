/** Подключаем файл стилей */
import './index.css';

/** Подключаем модули */
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
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
	buttonAddCard
} from '../utils/constants.js';

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
	const popup = new Popup('.popup-card');
	popupCreateCardValidation.disableButton();
	popup.open();
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
