class StateItem {
  constructor(value, checkFunction = (givenValue) => givenValue) {
    this.currentValue = value;
    this.checkFunction = checkFunction;
    this.subscribers = [];
  }

  get value() {
    return this.currentValue;
  }

  set value(givenValue) {
    this.currentValue = this.checkFunction(givenValue);
    this.runSubscribers();
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

export default StateItem;
