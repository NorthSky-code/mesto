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

/** Переменные */
const container = document.querySelector('.content');
const popupFormProfile = document.querySelector('.popup__content-profile');
const popupUserName = popupFormProfile.querySelector('.popup__input_user_name');
const popupUserJob = popupFormProfile.querySelector('.popup__input_user_job');
const buttonOpenProfile = container.querySelector('.button_type_edit');
const popupFormCard = document.querySelector('.popup__content-card');
const buttonAddCard = container.querySelector('.button_type_add');

export {
	initialCards,
	popupFormProfile,
	popupUserName,
	popupUserJob,
	buttonOpenProfile,
	popupFormCard,
	buttonAddCard
};