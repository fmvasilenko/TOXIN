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
    return this.state.rate.get();
  }

  setRate(value) {
    if (value > this.DOM.stars.length) this.state.rate.set(this.DOM.stars.length);
    else if (value <= 0) this.state.rate.set(1);
    else this.state.rate.set(value);
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
    this.rateExternalSubscriber(this.state.rate.get());
  }

  findDOMNodes(container) {
    return {
      stars: container.querySelectorAll(`.${this.classes.star}`),
    };
  }

  getInitialState(container) {
    const rateInput = container.querySelector(`.${this.classes.input}:checked`);
    const rate = rateInput ? parseInt(rateInput.value, 10) : 0;

    return {
      rate: new StateItem(rate),
    };
  }

  bindEventListeners(container) {
    container.addEventListener('click', this.clickHandler.bind(this));
  }

  clickHandler(event) {
    if (event.target.tagName === 'INPUT') this.state.rate.set(parseInt(event.target.value, 10));
  }

  render() {
    this.DOM.stars.forEach((star, index) => {
      if (index < this.state.rate.get()) star.innerHTML = this.vocabulary.checkedStar;
      else star.innerHTML = this.vocabulary.uncheckedStar;
    });
  }
}

export default RateButtonLogic;
