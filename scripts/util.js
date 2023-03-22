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

export { handleOpenPopup, handleClosePopup, handleClosePopupByEsc };