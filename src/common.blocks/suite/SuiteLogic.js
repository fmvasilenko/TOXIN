import SuiteStateItem from './SuiteStateItem';

class SuiteLogic {
  constructor(container) {
    this.classes = require('./suite.classes.json');
    this.DOM = this.findDOMNodes(container);
    this.state = this.getInitialState(container);
    this.imagesNumber = this.DOM.dots.length - 1;
    this.checkImagesNumber();
    this.state.imageDisplayed.addSubscriber(this.changeImage.bind(this));
    this.bindEventListeners();
  }

  findDOMNodes(container) {
    return {
      leftArrow: container.querySelector(`.${this.classes.leftArrow}`),
      rightArrow: container.querySelector(`.${this.classes.rightArrow}`),
      dots: container.querySelectorAll(`.${this.classes.dot}`),
      imagesInputs: container.querySelectorAll(`.${this.classes.imageInput}`),
    };
  }

  getInitialState(container) {
    const imageDisplayed = container.querySelector(`.${this.classes.imageInput}:checked`);

    return {
      imageDisplayed: new SuiteStateItem(parseInt(imageDisplayed ? imageDisplayed.value : 0, 10)),
    };
  }

  checkImagesNumber() {
    if (this.imagesNumber === 0) {
      this.DOM.leftArrow.remove();
      this.DOM.rightArrow.remove();
      this.DOM.dots.forEach((dot) => {
        dot.remove();
      });
    }
  }

  bindEventListeners() {
    this.DOM.leftArrow.addEventListener('click', this.leftArrowClickHandler.bind(this));
    this.DOM.rightArrow.addEventListener('click', this.rightArrowClickHandler.bind(this));
  }

  leftArrowClickHandler() {
    if (this.state.imageDisplayed.value === 0) this.state.imageDisplayed.value = this.imagesNumber;
    else this.state.imageDisplayed.value -= 1;
  }

  rightArrowClickHandler() {
    if (this.state.imageDisplayed.value === this.imagesNumber) this.state.imageDisplayed.value = 0;
    else this.state.imageDisplayed.value += 1;
  }

  changeImage() {
    this.DOM.imagesInputs[this.state.imageDisplayed.value].checked = true;
  }
}

export default SuiteLogic;
