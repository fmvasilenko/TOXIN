class StateItem {
  constructor(value, checkFunction = (givenValue) => givenValue) {
    this.value = value;
    this.checkFunction = checkFunction;
    this.subscribers = [];
  }

  set(givenValue) {
    this.value = this.checkFunction(givenValue);
    this.runSubscribers();
  }

  get() {
    return this.value;
  }

  addSubscriber(subscriber) {
    this.subscribers.push(subscriber);
  }

  runSubscribers() {
    this.subscribers.forEach((subscriber) => {
      subscriber(this.value);
    });
  }
}

export default StateItem;
