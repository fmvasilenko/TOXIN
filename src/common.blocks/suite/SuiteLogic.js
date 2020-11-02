import SuiteStateItem from './SuiteStateItem';

class SuiteLogic {
  constructor(container) {
    this.classes = require('./suite.classes.json');
    this.DOM = this._findDOMNodes(container);
    this.state = this._getInitialState(container);
    this.imagesNumber = this.DOM.dots.length - 1;
    this._checkImagesNumber();
    this.state.imageDisplayed.addSubscriber(this._changeImage.bind(this));
    this._bindEventListeners();
  }

  _findDOMNodes(container) {
    return {
      leftArrow: container.querySelector(`.js-${this.classes.leftArrow}`),
      rightArrow: container.querySelector(`.js-${this.classes.rightArrow}`),
      dots: container.querySelectorAll(`.js-${this.classes.dot}`),
      imagesInputs: container.querySelectorAll(`.js-${this.classes.imageInput}`),
    };
  }

  _getInitialState(container) {
    const imageDisplayed = container.querySelector(`.${this.classes.imageInput}:checked`);

    return {
      imageDisplayed: new SuiteStateItem(parseInt(imageDisplayed ? imageDisplayed.value : 0, 10)),
    };
  }

  _checkImagesNumber() {
    if (this.imagesNumber === 0) {
      this.DOM.leftArrow.remove();
      this.DOM.rightArrow.remove();
      this.DOM.dots.forEach((dot) => {
        dot.remove();
      });
    }
  }

  _bindEventListeners() {
    this.DOM.leftArrow.addEventListener('click', this._leftArrowClickHandler.bind(this));
    this.DOM.rightArrow.addEventListener('click', this._rightArrowClickHandler.bind(this));
  }

  _leftArrowClickHandler() {
    if (this.state.imageDisplayed.value === 0) this.state.imageDisplayed.value = this.imagesNumber;
    else this.state.imageDisplayed.value -= 1;
  }

  _rightArrowClickHandler() {
    if (this.state.imageDisplayed.value === this.imagesNumber) this.state.imageDisplayed.value = 0;
    else this.state.imageDisplayed.value += 1;
  }

  _changeImage() {
    this.DOM.imagesInputs[this.state.imageDisplayed.value].checked = true;
  }
}

export default SuiteLogic;
