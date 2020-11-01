class SuiteStateItem {
  constructor(value, checkFunction = (givenValue) => givenValue) {
    this.currentValue = value;
    this.checkFunction = checkFunction;
    this.subscribers = [];
  }

  set value(givenValue) {
    this.currentValue = this.checkFunction(givenValue);
    this.runSubscribers();
  }

  get value() {
    return this.currentValue;
  }

  addSubscriber(subscriber) {
    this.subscribers.push(subscriber);
  }

  runSubscribers() {
    this.subscribers.forEach((subscriber) => {
      subscriber(this.currentValue);
    });
  }
}

export default SuiteStateItem;
