/** Переменные */
const container = document.querySelector('.content');
const popupFormProfile = document.querySelector('.popup__content-profile');
const popupUserName = popupFormProfile.querySelector('.popup__input_user_name');
const popupUserJob = popupFormProfile.querySelector('.popup__input_user_job');
const buttonOpenProfile = container.querySelector('.button_type_edit');
const popupFormCard = document.querySelector('.popup__content-card');
const buttonAddCard = container.querySelector('.button_type_add');
const buttonEditAvatar = container.querySelector('.button_type_avatar');
const popupFormEditAvatar = document.querySelector('.popup__content-avatar');

/**  Конфигурация свойств для валидации форм */
const validationConfig = {
	formSelector: '.popup__content',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__submit',
	inactiveButtonClass: 'popup__submit_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible'
};

export {
	popupFormProfile,
	popupFormCard,
	popupFormEditAvatar,
	buttonOpenProfile,
	buttonAddCard,
	buttonEditAvatar,
	validationConfig
};