import RateButtonLogic from './RateButtonLogic';

class RateButton {
  constructor(container) {
    const rateButton = new RateButtonLogic(container);

    this.getRate = () => rateButton.getRate();

    this.setRate = (value) => rateButton.setRate(value);

    this.setRateSubscriber = (subscriber) => rateButton.setRateSubscriber(subscriber);
  }
}

export default RateButton;
