class CardsLogic {
  constructor(container) {
    this.classes = require('./cards.classes.json');
    this.DOM = this._findDOMNodes(container);
    this.calendarClickSubscriber = () => {};
    this._bindEventListeners();
  }

  setCalendarClickSubscriber(subscriber) {
    this.calendarClickSubscriber = subscriber;
  }

  _findDOMNodes(container) {
    return {
      calendar: container.querySelector(`.js-${this.classes.calendar}`),
    };
  }

  _bindEventListeners() {
    this.DOM.calendar.addEventListener('click', this._calendarClickHandler.bind(this));
  }

  _calendarClickHandler(event) {
    this.calendarClickSubscriber(event);
  }
}

export default CardsLogic;
