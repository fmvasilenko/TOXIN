class CalendarStateItem {
  constructor(value, checkFunction = (givenValue) => givenValue) {
    this.currentValue = value;
    this.checkFunction = checkFunction;
    this.subscribers = [];
  }

  set value(givenValue) {
    this.currentValue = this.checkFunction(givenValue);
    this._runSubscribers();
  }

  get value() {
    return this.currentValue;
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

export default CalendarStateItem;
