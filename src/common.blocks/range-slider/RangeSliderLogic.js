/* eslint-disable class-methods-use-this */
import 'fsd4-slider';
import RangeSliderStateItem from './RangeSliderStateItem';

class RangeSliderLogic {
  constructor(container) {
    this.classes = require('./range-slider.classes.json');
    this.config = require('./range-slider.config.json');
    this.DOM = this._findDOMNodes(container);
    this.state = this._getInitialState();
    this.slider = this._createSlider();
    this.changesSubscriber = () => {};
    this._update(this.state.firstValue.value, this.state.secondValue.value);
  }

  getFirstValue() {
    return this.state.firstValue.value;
  }

  getSecondValue() {
    return this.state.secondValue.value;
  }

  setFirstValue(value) {
    this.slider.config.leftHandleValue(value);
  }

  setSecondValue(value) {
    this.slider.config.rightHandleValue(value);
  }

  setChangesSubscriber(subscriber = () => {}) {
    this.changesSubscriber = subscriber;
  }

  _findDOMNodes(container) {
    return {
      line: container.querySelector(`.js-${this.classes.line}`),
      range: container.querySelector(`.js-${this.classes.range}`),
      firstValue: container.querySelector(`input[name=${this.config.firstValueName}]`),
      secondValue: container.querySelector(`input[name=${this.config.secondValueName}]`),
    };
  }

  _getInitialState() {
    return {
      firstValue: new RangeSliderStateItem(5000),
      secondValue: new RangeSliderStateItem(10000),
    };
  }

  _createSlider() {
    return $(this.DOM.line).slider({
      limitsDisplayed: false,
      valueLabelDisplayed: false,
      isRange: true,
      minValue: this.config.minValue,
      maxValue: this.config.maxValue,
      leftHandleValue: this.state.firstValue.value,
      rightHandleValue: this.state.secondValue.value,
      step: this.config.step,
    }, this._update.bind(this));
  }

  _update(leftHandleValue, rightHandleValue) {
    this.state.firstValue.value = leftHandleValue;
    this.state.secondValue.value = rightHandleValue;
    this._updateRange(leftHandleValue, rightHandleValue);
    this._updateInputs(leftHandleValue, rightHandleValue);
    this.changesSubscriber(leftHandleValue, rightHandleValue);
  }

  _updateRange(leftHandleValue, rightHandleValue) {
    const firstValue = `${leftHandleValue}`.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    const secondValue = `${rightHandleValue}`.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

    const range = `${firstValue + this.config.currencySign} - ${secondValue + this.config.currencySign}`;

    this.DOM.range.innerHTML = range;
  }

  _updateInputs(leftHandleValue, rightHandleValue) {
    this.DOM.firstValue.value = `${leftHandleValue}`;
    this.DOM.secondValue.value = `${rightHandleValue}`;
  }
}

export default RangeSliderLogic;
