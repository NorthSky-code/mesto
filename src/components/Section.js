export default class Section {
	constructor({ items, renderer }, containerSelector) {
		this._renderedItems = items;
		this._renderer = renderer;
		this._container = document.querySelector(containerSelector);
	}

	renderItems() {
		this._renderedItems.forEach(items => {
			this._renderer(items);
		});
	}

	addItem(element) {
		this._container.prepend(element);
	}
}