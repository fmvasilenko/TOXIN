/* eslint-disable no-param-reassign */
import StateItem from './StateItem';

class RateButtonLogic {
  constructor(container) {
    this.classes = require('./rate-button.classes.json');
    this.vocabulary = require('./rate-button.config.json').vocabulary;
    this.DOM = this._findDOMNodes(container);
    this.state = this._getInitialState(container);
    this._defineSubscriptions();
    this._bindEventListeners(container);
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

  _defineSubscriptions() {
    this.rateExternalSubscriber = () => {};

    this.state.rate.addSubscriber(this._render.bind(this));
    this.state.rate.addSubscriber(this._rateSubscriber.bind(this));
  }

  _rateSubscriber() {
    this.rateExternalSubscriber(this.state.rate.value);
  }

  _findDOMNodes(container) {
    return {
      stars: container.querySelectorAll(`.js-${this.classes.star}`),
    };
  }

  _getInitialState(container) {
    const rateInput = container.querySelector(`.js-${this.classes.input}:checked`);
    const rate = rateInput ? parseInt(rateInput.value, 10) : 0;

    return {
      rate: new StateItem(rate),
    };
  }

  _bindEventListeners(container) {
    container.addEventListener('click', this._clickHandler.bind(this));
  }

  _clickHandler(event) {
    if (event.target.tagName === 'INPUT') this.state.rate.value = parseInt(event.target.value, 10);
  }

  _render() {
    this.DOM.stars.forEach((star, index) => {
      if (index < this.state.rate.value) star.innerHTML = this.vocabulary.checkedStar;
      else star.innerHTML = this.vocabulary.uncheckedStar;
    });
  }
}

export default RateButtonLogic;
