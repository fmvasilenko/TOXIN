/* eslint-disable no-param-reassign */
class RateButton {
  constructor(container, rateOnChangeFunction = () => {}) {
    this.classes = require('./rate-button.classes.json');
    this.vocabulary = require('./rate-button.config.json').vocabulary;
    this.container = container;
    this.rateOnChangeFunction = rateOnChangeFunction;
    this.DOM = this.findDOMNodes();
    this.rate = this.getInitialRate();
    this.bindEventListeners();
  }

  findDOMNodes() {
    return {
      stars: this.container.querySelectorAll(`.${this.classes.star}`),
    };
  }

  getInitialRate() {
    return this.container.querySelector(`.${this.classes.input}:checked`).value;
  }

  bindEventListeners() {
    this.container.addEventListener('click', this.clickHandler.bind(this));
  }

  clickHandler(event) {
    if (event.target.tagName === 'INPUT') {
      this.rate = event.target.value;
      this.rateOnChangeFunction(this.rate);
      this.render();
    }
  }

  render() {
    this.DOM.stars.forEach((star, index) => {
      if (index < this.rate) star.innerHTML = this.vocabulary.checkedStar;
      else star.innerHTML = this.vocabulary.uncheckedStar;
    });
  }
}

export default RateButton;
