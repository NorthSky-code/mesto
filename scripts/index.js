let container = document.querySelector('.content');
let popup = document.querySelector('.popup');
let buttonEdit = container.querySelector('.button_type_edit');
let profileName = container.querySelector('.profile__title');
let profileJob = container.querySelector('.profile__subtitle');
let buttonClose = popup.querySelector('.button_type_close');
let popupForm = popup.querySelector('.popup__content');
let popupUserName = popupForm.querySelector('.popup__input_user_name');
let popupUserJob = popupForm.querySelector('.popup__input_user_job');
let popupButtonSave = popupForm.querySelector('.button_type_save');

// Открыть модальное окно "Редактировать профиль"
function handleOpenPopupClick() {
	popup.classList.add('popup_opened');
	popupUserName.value = profileName.textContent;
	popupUserJob.value = profileJob.textContent;
};
function handleClosePopupClick() {
	popup.classList.remove('popup_opened');
};

buttonEdit.addEventListener('click', handleOpenPopupClick);
buttonClose.addEventListener('click', handleClosePopupClick);

// Сохранить изменение в модальном окне с автозакрытием после сохранения
function handleFormSubmit(evt) {
	evt.preventDefault();

	profileName.textContent = popupUserName.value;
	profileJob.textContent = popupUserJob.value;

	handleClosePopupClick();
}

popupForm.addEventListener('submit', handleFormSubmit);