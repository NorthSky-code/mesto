import './index.css';

/** Подключаем модули */
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDelete from '../components/PopupDelete.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

/** Подключаем переменные */
import {
	popupFormProfile,
	popupUserName,
	popupUserJob,
	popupFormCard,
	popupFormEditAvatar,
	buttonOpenProfile,
	buttonAddCard,
	buttonEditAvatar,
	validationConfig
} from '../utils/constants.js';

const api = new Api({
	baseUrl: 'https://nomoreparties.co/v1/cohort-64',
	headers: {
		authorization: 'ed50e778-664c-4bb0-b542-3c1eeacf1196',
		'Content-Type': 'application/json'
	}
})

/** Отрисовать карточки и профиль из API */
let userId;

Promise.all([api.getInfoProfile(), api.getInitialCards()]).then(
	([data, cardData]) => {
		userId = data._id;
		editUserProfile.setUserInfo(data);
		editUserProfile.setUserAvatar(data);
		cardList.renderItems(cardData);
	})
	.catch(err => console.log(err));

/** Валидировать формы */
const popupProfileValidation = new FormValidator(validationConfig, popupFormProfile);
popupProfileValidation.enableValidation();

const popupCreateCardValidation = new FormValidator(validationConfig, popupFormCard);
popupCreateCardValidation.enableValidation();

const popupUserAvatarValidation = new FormValidator(validationConfig, popupFormEditAvatar);
popupUserAvatarValidation.enableValidation();

/** Открыть модальное окно */
const handleOpenProfile = () => {
	popupFormProfileSubmit.open();
	/*
	const user = editUserProfile.getUserInfo();
	popupUserName.value = user.name;
	popupUserJob.value = user.job;
	*/
	popupProfileValidation.enableButton();
	popupProfileValidation.resetError();
}

const handleOpenAddCard = () => {
	popupFormCardSubmit.open();
	popupCreateCardValidation.disableButton();
}

const handleOpenEditAvatar = () => {
	popupEditUserAvatar.open();
	popupUserAvatarValidation.disableButton();
}

const handleCardClick = (name, link) => {
	popupOpenImage.open(name, link);
}

const handleOpenDeleteCard = (cardId, card) => {
	popupDeleteCard.open(cardId, card);
}

/** Открыть картинку по клику */
const popupOpenImage = new PopupWithImage('.popup-image');
popupOpenImage.setEventListeners();

/** Создать карточку */
const createCard = (data) => {
	const card = new Card(data, userId, '.card-template', handleCardClick, handleOpenDeleteCard, handleAddLike, handleRemoveLike);
	return card.generateCard();
}

/** Данные профиля */
const editUserProfile = new UserInfo({
	nameSelector: '.profile__title',
	jobSelector: '.profile__subtitle',
	avatarSelector: '.profile__avatar'
})

/** Поменять аватарку */
const popupEditUserAvatar = new PopupWithForm({
	popupSelector: '.popup-avatar',
	submitForm: (data) => {
		return api.editProfileAvatar(data)
			.then(res => {
				editUserProfile.setUserAvatar(res)
			})
			.catch((err) => {
				console.log(err);
			})
	}
})
popupEditUserAvatar.setEventListeners();

/** Удалить карточку */
const popupDeleteCard = new PopupDelete({
	popupSelector: '.popup-delete',
	submitForm: (cardId, card) => {
		return api.deleteCard(cardId)
			.then(() => {
				card.handleDeleteCard();
			})
			.catch((err) => {
				console.log(err);
			})
	}
})
popupDeleteCard.setEventListeners();

/** Редактировать профиль */
const popupFormProfileSubmit = new PopupWithForm({
	popupSelector: '.popup-profile',
	submitForm: (data) => {
		return api.editInfoProfile(data)
			.then(res => {
				editUserProfile.setUserInfo(res);
			})
			.catch((err) => {
				console.log(err);
			})
	}
})
popupFormProfileSubmit.setEventListeners();

/** Отрендерить список карточек */
const cardList = new Section({
	renderer: (data) => {
		const card = createCard(data);
		cardList.addItem(card);
	}
}, '.cards');

/** Добавить новую карточку в список */
const popupFormCardSubmit = new PopupWithForm({
	popupSelector: '.popup-card',
	submitForm: (data) => {
		return api.addCard(data)
			.then(res => {
				const card = createCard(res);
				cardList.addItem(card);
			})
			.catch((err) => {
				console.log(err);
			})
	}
})
popupFormCardSubmit.setEventListeners();

/** Функции лайка */
const handleAddLike = (cardId, card) => {
	api.addLikeCard(cardId)
		.then(res => {
			card.handleButtonLike();
			card.countLikes.textContent = res.likes.length;
		})
		.catch((err) => {
			console.log(err);
		});
}

const handleRemoveLike = (cardId, card) => {
	api.removeLikeCard(cardId)
		.then(res => {
			card.handleButtonLike();
			card.countLikes.textContent = res.likes.length;
		})
		.catch((err) => {
			console.log(err);
		});
}

/** Обработчики событий */
buttonAddCard.addEventListener('click', handleOpenAddCard);
buttonOpenProfile.addEventListener('click', handleOpenProfile);
buttonEditAvatar.addEventListener('click', handleOpenEditAvatar);