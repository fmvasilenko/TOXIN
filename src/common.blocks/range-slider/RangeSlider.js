import 'fsd4-slider';
import RangeSliderStateItem from './RangeSliderStateItem';

class RangeSlider {
  constructor(container) {
    this.classes = require('./range-slider.classes.json');
    this.config = require('./range-slider.config.json');
    this.DOM = this.findDOMNodes(container);
    this.state = this.getInitialState();
    this.slider = this.createSlider();
    this.changesSubscriber = () => {};
    this.update(this.state.firstValue.get(), this.state.secondValue.get());
  }

  getFirstValue() {
    return this.state.firstValue.get();
  }

  getSecondValue() {
    return this.state.secondValue.get();
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
      leftHandleValue: this.state.firstValue.get(),
      rightHandleValue: this.state.secondValue.get(),
      step: this.config.step,
    }, this.update.bind(this));
  }

  update(leftHandleValue, rightHandleValue) {
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

export default RangeSlider;
