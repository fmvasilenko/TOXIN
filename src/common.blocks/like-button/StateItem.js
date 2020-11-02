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
    this._runSubscribers();
  }

  addSubscriber(subscriber) {
    this.subscribers.push(subscriber);
  }

  _runSubscribers() {
    this.subscribers.forEach((subscriber) => {
      subscriber(this.currentValue);
    });
  }
}

export default StateItem;
