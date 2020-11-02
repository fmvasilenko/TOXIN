class RoomDetailsLogic {
  constructor(container) {
    this.classes = require('./room-details.classes.json');
    this.DOM = this._findDOMNodes(container);
    this._bindEventListeners();
  }

  _findDOMNodes(container) {
    return {
      coverImage: container.querySelector(`.js-${this.classes.coverImage}`),
      miniImages: container.querySelector(`.js-${this.classes.miniImages}`),
    };
  }

  _bindEventListeners() {
    if (this.DOM.miniImages) this.DOM.miniImages.addEventListener('click', this._miniImagesClickHandler.bind(this));
  }

  _miniImagesClickHandler(event) {
    const { target } = event;

    if (target.tagName === 'IMG') {
      const coverImageSrc = this.DOM.coverImage.src;
      this.DOM.coverImage.src = target.src;
      target.src = coverImageSrc;

      const coverImageAlt = this.DOM.coverImage.alt;
      this.DOM.coverImage.alt = target.alt;
      target.alt = coverImageAlt;
    }
  }
}

export default RoomDetailsLogic;
