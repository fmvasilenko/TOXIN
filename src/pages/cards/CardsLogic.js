class CardsLogic {
  constructor(container) {
    this.classes = require('./cards.classes.json');
    this.DOM = this.findDOMNodes(container);
    this.calendarClickSubscriber = () => {};
    this.bindEventListeners();
  }

  setCalendarClickSubscriber(subscriber) {
    this.calendarClickSubscriber = subscriber;
  }

  findDOMNodes(container) {
    return {
      calendar: container.querySelector(`.js-${this.classes.calendar}`),
    };
  }

  bindEventListeners() {
    this.DOM.calendar.addEventListener('click', this.calendarClickHandler.bind(this));
  }

  calendarClickHandler(event) {
    this.calendarClickSubscriber(event);
  }
}

export default CardsLogic;
