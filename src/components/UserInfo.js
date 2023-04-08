export default class UserInfo {
	constructor({ nameSelector, jobSelector }) {
		this._name = document.querySelector(nameSelector);
		this._job = document.querySelector(jobSelector)
	}

	getUserInfo() {
		this._info = {};
		this._info.name = this._name.textContent;
		this._info.job = this._job.textContent;
		return this._info;
	}

	setUserInfo(item) {
		this._name.textContent = item.name;
		this._job.textContent = item.job;
	}
}