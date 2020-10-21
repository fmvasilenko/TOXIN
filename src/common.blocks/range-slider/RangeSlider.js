import RangeSliderLogic from './RangeSliderLogic';

class RangeSlider {
  constructor(container) {
    const rangeSlider = new RangeSliderLogic(container);

    this.getFirstValue = () => rangeSlider.getFirstValue();

    this.getSecondValue = () => rangeSlider.getSecondValue();

    this.setFirstValue = (value) => rangeSlider.setFirstValue(value);

    this.setSecondValue = (value) => rangeSlider.setSecondValue(value);

    this.setChangesSubscriber = (subscriber) => rangeSlider.setChangesSubscriber(subscriber);
  }
}

export default RangeSlider;
