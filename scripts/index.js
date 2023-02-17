// Переменные
const container = document.querySelector('.content');
const cardContainer = container.querySelector('.cards');
const popup = document.querySelector('.popup');

const profileName = container.querySelector('.profile__title');
const profileJob = container.querySelector('.profile__subtitle');

const popupFormProfile = document.querySelector('.popup__content');
const popupUserName = popupFormProfile.querySelector('.popup__input_user_name');
const popupUserJob = popupFormProfile.querySelector('.popup__input_user_job');

const popupProfile = document.querySelector('.popup-profile');
const buttonProfile = container.querySelector('.button_type_edit');
const buttonProfileClose = document.querySelector('.button_close_profile');
const buttonSubmitProfile = popupFormProfile.querySelector('.button__submit_type_save');

const popupFormCard = document.querySelector('.popup__content-card');
const popupLinkCard = document.querySelector('.popup__input_image_link');
const popupNameCard = document.querySelector('.popup__input_image_name');

const popupAddCard = document.querySelector('.popup-card');
const buttonAddCard = container.querySelector('.button_type_add');
const buttonAddCardClose = document.querySelector('.button_close_add');
const buttonSubmitCard = popupFormCard.querySelector('.button__submit_type_create');

const popupImageBox = document.querySelector('.popup-image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const buttonImageClose = document.querySelector('.button_close_image');

// Массив данных для карточек
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

// Функция открытие и закрытие модального окна
const handleOpenPopup = (popup) => {
	popup.classList.add('popup_opened');
	popupUserName.value = profileName.textContent;
	popupUserJob.value = profileJob.textContent;
};

const handleClosePopup = (popup) => {
	popup.classList.remove('popup_opened');
};

//Открытие и закрытие модального окна
buttonProfile.addEventListener('click', () => {
	handleOpenPopup(popupProfile);
});
buttonProfileClose.addEventListener('click', () => {
	handleClosePopup(popupProfile);
});

buttonAddCard.addEventListener('click', () => {
	handleOpenPopup(popupAddCard);
});
buttonAddCardClose.addEventListener('click', () => {
	handleClosePopup(popupAddCard);
});

// Сохранить изменение в модальном окне с автозакрытием после сохранения
const handleFormProfileSubmit = (evt) => {
	evt.preventDefault();
	profileName.textContent = popupUserName.value;
	profileJob.textContent = popupUserJob.value;
	handleClosePopup(popupProfile);
}

// Функция для создание карточки
const addCard = (link, name) => {
	const templateCard = document.querySelector('.card-template').content;
	const cardElement = templateCard.querySelector('.card').cloneNode(true);
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

	buttonImageClose.addEventListener('click', () => {
		handleClosePopup(popupImageBox);
	});

	return cardElement;
};

// Добавление карточек в DOM
const renderCard = (link, name) => {
	cardContainer.append(addCard(link, name));
};

initialCards.forEach((element) => {
	renderCard(element.link, element.name);
});

// Создать карточку с переданными данными
const handleFormCardSubmit = (evt) => {
	evt.preventDefault();
	cardContainer.prepend(addCard(popupLinkCard.value, popupNameCard.value));
	handleClosePopup(popupAddCard);

	popupLinkCard.value = '';
	popupNameCard.value = '';
}

// Отправка формы
popupFormProfile.addEventListener('submit', handleFormProfileSubmit);
popupFormCard.addEventListener('submit', handleFormCardSubmit);