import Component from '@frontend/Component';
import 'fsd4-slider';

class RangeSlider extends Component {
  constructor(root, parent = {}) {
    super({ root, parent });

    this.config = require('./range-slider.config.json');

    this.setDOM();
    this.setInitialState();
  }

  setState() {
    this.state = {
      valueFrom: {
        value: 0,
      },
      valueTo: {
        value: 10000,
      },
    };
  }

  setClasses() {
    this.CLASSES = {
      LINE: 'js-range-slider__line',
      RANGE: 'js-range-slider__range',
      FIRST_VALUE: 'js-range-slider__first-value',
      SECOND_VALUE: 'js-range-slider__second-value',
    };
  }

  setDOM() {
    this.DOM = {
      LINE: this.root.querySelector(`.${this.CLASSES.LINE}`),
      RANGE: this.root.querySelector(`.${this.CLASSES.RANGE}`),
      FIRST_VALUE: this.root.querySelector(`.${this.CLASSES.FIRST_VALUE}`),
      SECOND_VALUE: this.root.querySelector(`.${this.CLASSES.SECOND_VALUE}`),
    };
  }

  setInitialState() {
    this.valueFrom = this.config.firstValue;
    this.valueTo = this.config.secondValue;

    $(this.DOM.LINE).slider({
      limitsDisplayed: false,
      valueLabelDisplayed: false,
      isRange: true,
      minValue: this.config.minValue,
      maxValue: this.config.maxValue,
      leftHandleValue: this.valueFrom,
      rightHandleValue: this.valueTo,
      step: this.config.step,
    }, this.update.bind(this));

    this.update(this.valueFrom, this.valueTo);
  }

  update(leftHandleValue, rightHandleValue) {
    this.updateRange(leftHandleValue, rightHandleValue);
    this.updateInputs(leftHandleValue, rightHandleValue);
  }

  updateRange(leftHandleValue, rightHandleValue) {
    const firstValue = `${leftHandleValue}`.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
    const secondValue = `${rightHandleValue}`.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');

    const range = `${firstValue + this.config.currencySign} - ${secondValue + this.config.currencySign}`;

    this.DOM.RANGE.innerHTML = range;
  }

  updateInputs(leftHandleValue, rightHandleValue) {
    this.DOM.FIRST_VALUE.value = `${leftHandleValue}`;
    this.DOM.SECOND_VALUE.value = `${rightHandleValue}`;
  }
}

export default RangeSlider;
