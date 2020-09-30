class MemoryCell {
  constructor(value, checkFunction) {
    this.value = value;
    this.subscribers = [];
    this.checkFunction = checkFunction;
  }

  get() {
    return this.value;
  }

  set(value) {
    this.value = this.checkFunction(value) || value;
    this.runSubscribers(value);
  }

  addSubscriber(subscriber) {
    this.subscribers.push(subscriber);
  }

  runSubscribers(value) {
    this.subscribers.forEach((subscriber) => {
      subscriber(value);
    });
  }
}

export default MemoryCell;
