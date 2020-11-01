/* eslint-disable no-param-reassign */
import StateItem from './StateItem';

class RateButtonLogic {
  constructor(container) {
    this.classes = require('./rate-button.classes.json');
    this.vocabulary = require('./rate-button.config.json').vocabulary;
    this.DOM = this.findDOMNodes(container);
    this.state = this.getInitialState(container);
    this.defineSubscriptions();
    this.bindEventListeners(container);
  }

  getRate() {
    return this.state.rate.value;
  }

  setRate(value) {
    if (value > this.DOM.stars.length) this.state.rate.value = this.DOM.stars.length;
    else if (value <= 0) this.state.rate.value = 1;
    else this.state.rate.value = value;
  }

  setRateSubscriber(subscriber) {
    this.rateExternalSubscriber = subscriber;
  }

  defineSubscriptions() {
    this.rateExternalSubscriber = () => {};

    this.state.rate.addSubscriber(this.render.bind(this));
    this.state.rate.addSubscriber(this.rateSubscriber.bind(this));
  }

  rateSubscriber() {
    this.rateExternalSubscriber(this.state.rate.value);
  }

  findDOMNodes(container) {
    return {
      stars: container.querySelectorAll(`.js-${this.classes.star}`),
    };
  }

  getInitialState(container) {
    const rateInput = container.querySelector(`.js-${this.classes.input}:checked`);
    const rate = rateInput ? parseInt(rateInput.value, 10) : 0;

    return {
      rate: new StateItem(rate),
    };
  }

  bindEventListeners(container) {
    container.addEventListener('click', this.clickHandler.bind(this));
  }

  clickHandler(event) {
    if (event.target.tagName === 'INPUT') this.state.rate.value = parseInt(event.target.value, 10);
  }

  render() {
    this.DOM.stars.forEach((star, index) => {
      if (index < this.state.rate.value) star.innerHTML = this.vocabulary.checkedStar;
      else star.innerHTML = this.vocabulary.uncheckedStar;
    });
  }
}

export default RateButtonLogic;
