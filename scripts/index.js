let container = document.querySelector('.content');
let popup = document.querySelector('.popup');
let buttonEdit = container.querySelector('.button_edit');
let buttonClose = popup.querySelector('.button_close');

function toggleButtonOpen() {
	popup.classList.toggle('popup_opened');
}

function handleButtonEditClick() {
	toggleButtonOpen();
}
function handleButtonCloseClick() {
	toggleButtonOpen();
}

buttonEdit.addEventListener('click', handleButtonEditClick);
buttonClose.addEventListener('click', handleButtonCloseClick);

let popupForm = popup.querySelector('.popup__content');
let popupUserName = popupForm.querySelector('.popup__input_user_name');
let popupUserJob = popupForm.querySelector('.popup__input_user_job');
let popupButtonSave = popupForm.querySelector('.button_save');


function handleFormSubmit(evt) {
	evt.preventDefault();

	let userName = popupUserName.value;
	let userJob = popupUserJob.value;

	let profileName = container.querySelector('.profile__title');
	let profileJob = container.querySelector('.profile__subtitle');

	profileName.textContent = userName;
	profileJob.textContent = userJob;
}
popupForm.addEventListener('submit', handleFormSubmit);

function handlePopupButtonSaveClick() {
	popup.classList.remove('popup_opened');
}

popupButtonSave.addEventListener('click', handlePopupButtonSaveClick);
