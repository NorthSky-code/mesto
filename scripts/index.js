// Переменные
const container = document.querySelector('.content');
const cardContainer = container.querySelector('.cards');
const popup = document.querySelector('.popup');
const popupList = document.querySelectorAll('.popup');
const templateCard = document.querySelector('.card-template').content.querySelector('.card');

const profileName = container.querySelector('.profile__title');
const profileJob = container.querySelector('.profile__subtitle');

const popupFormProfile = document.querySelector('.popup__content');
const popupUserName = popupFormProfile.querySelector('.popup__input_user_name');
const popupUserJob = popupFormProfile.querySelector('.popup__input_user_job');

const popupProfile = document.querySelector('.popup-profile');
const buttonProfile = container.querySelector('.button_type_edit');
const buttonSubmitProfile = popupFormProfile.querySelector('.button_type_save');

const buttonsPopupClose = document.querySelectorAll('.button_type_close');

const popupFormCard = document.querySelector('.popup__content-card');
const popupLinkCard = document.querySelector('.popup__input_image_link');
const popupNameCard = document.querySelector('.popup__input_image_name');

const popupAddCard = document.querySelector('.popup-card');
const buttonAddCard = container.querySelector('.button_type_add');
const buttonSubmitCard = popupFormCard.querySelector('.button_type_create');

const popupImageBox = document.querySelector('.popup-image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

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
};

const handleClosePopup = (popup) => {
	popup.classList.remove('popup_opened');
};

//Функция закрытия модального окна кликом на фон и клавишой 'Escape'
popupList.forEach((popup) => {
	document.addEventListener('keydown', (evt) => {
		if (evt.key === 'Escape') {
			handleClosePopup(popup);
		}
	});
	popup.addEventListener('click', (evt) => {
		if (evt.target === evt.currentTarget) {
			handleClosePopup(popup);
		}
	});
});

//Открытие и закрытие модального окна
buttonProfile.addEventListener('click', () => {
	handleOpenPopup(popupProfile);
	popupUserName.value = profileName.textContent;
	popupUserJob.value = profileJob.textContent;
});

buttonAddCard.addEventListener('click', () => {
	handleOpenPopup(popupAddCard);
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
	evt.target.reset();
};

// Функция для создание карточки
const addCard = (link, name) => {
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

	evt.target.reset();
}

// Отправка формы
popupFormProfile.addEventListener('submit', handleFormProfileSubmit);
popupFormCard.addEventListener('submit', handleFormCardSubmit);