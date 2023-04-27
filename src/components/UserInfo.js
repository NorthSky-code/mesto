export default class UserInfo {
	constructor({ nameSelector, jobSelector, avatarSelector }) {
		this._name = document.querySelector(nameSelector);
		this._job = document.querySelector(jobSelector);
		this._avatar = document.querySelector(avatarSelector);
	}

	getUserInfo() {
		this._info = {};
		this._info.name = this._name.textContent;
		this._info.job = this._job.textContent;
		return this._info;
	}

	setUserInfo(item) {
		this._name.textContent = item.name;
		this._job.textContent = item.about;
		this._userId = item._id;
	}

	setUserAvatar(item) {
		this._avatar.src = item.avatar;
	}
}