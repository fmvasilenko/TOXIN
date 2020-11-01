import 'fsd4-slider';
import RangeSliderStateItem from './RangeSliderStateItem';

class RangeSliderLogic {
  constructor(container) {
    this.classes = require('./range-slider.classes.json');
    this.config = require('./range-slider.config.json');
    this.DOM = this.findDOMNodes(container);
    this.state = this.getInitialState();
    this.slider = this.createSlider();
    this.changesSubscriber = () => {};
    this.update(this.state.firstValue.value, this.state.secondValue.value);
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

  findDOMNodes(container) {
    return {
      line: container.querySelector(`.${this.classes.line}`),
      range: container.querySelector(`.${this.classes.range}`),
      firstValue: container.querySelector(`.${this.classes.firstValue}`),
      secondValue: container.querySelector(`.${this.classes.secondValue}`),
    };
  }

  getInitialState() {
    return {
      firstValue: new RangeSliderStateItem(5000),
      secondValue: new RangeSliderStateItem(10000),
    };
  }

  createSlider() {
    return $(this.DOM.line).slider({
      limitsDisplayed: false,
      valueLabelDisplayed: false,
      isRange: true,
      minValue: this.config.minValue,
      maxValue: this.config.maxValue,
      leftHandleValue: this.state.firstValue.value,
      rightHandleValue: this.state.secondValue.value,
      step: this.config.step,
    }, this.update.bind(this));
  }

  update(leftHandleValue, rightHandleValue) {
    this.state.firstValue.value = leftHandleValue;
    this.state.secondValue.value = rightHandleValue;
    this.updateRange(leftHandleValue, rightHandleValue);
    this.updateInputs(leftHandleValue, rightHandleValue);
    this.changesSubscriber(leftHandleValue, rightHandleValue);
  }

  updateRange(leftHandleValue, rightHandleValue) {
    const firstValue = `${leftHandleValue}`.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    const secondValue = `${rightHandleValue}`.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

    const range = `${firstValue + this.config.currencySign} - ${secondValue + this.config.currencySign}`;

    this.DOM.range.innerHTML = range;
  }

  updateInputs(leftHandleValue, rightHandleValue) {
    this.DOM.firstValue.value = `${leftHandleValue}`;
    this.DOM.secondValue.value = `${rightHandleValue}`;
  }
}

export default RangeSliderLogic;
