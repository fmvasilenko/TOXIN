/* eslint-disable class-methods-use-this */
import Calendar from '@blocks/calendar/Calendar';

class DateDropdown {
  constructor(container) {
    this.classes = require('./date-dropdown.classes.json');
    this.DOM = this.findDOMNodes(container);
    this.state = this.getInitialState();
    this.calendar = new Calendar(this.DOM.calendar);
    this.defineSubscriptions();
    this.bindEventListeners();
  }

  getArrivalDate() {
    return this.calendar.getArrivalDate();
  }

  getLeavingDate() {
    return this.calendar.getLeavingDate();
  }

  setArrivalDateSubscriber(subscriber) {
    this.arrivalDateExternalSubscriber = subscriber;
  }

  setLeavingDateSubscriber(subscriber) {
    this.leavingDateExternalSubscriber = subscriber;
  }

  defineSubscriptions() {
    this.arrivalDateExternalSubscriber = () => {};
    this.leavingDateExternalSubscriber = () => {};

    this.calendar.setSubmitSubscriber(this.closeCalendar.bind(this));
    this.calendar.setArrivalDateSubscriber(this.arrivalDateSubscriber.bind(this));
    this.calendar.setLeavingDateSubscriber(this.leavingDateSubscriber.bind(this));
  }

  arrivalDateSubscriber() {
    this.displayArrivalDate(this.calendar.getArrivalDate());
    this.arrivalDateExternalSubscriber(this.calendar.getArrivalDate());
  }

  leavingDateSubscriber() {
    this.displayLeavingDate(this.calendar.getLeavingDate());
    this.leavingDateExternalSubscriber(this.calendar.getLeavingDate());
  }

  findDOMNodes(container) {
    return {
      root: container.querySelector(`.${this.classes.root}`),
      calendar: container.querySelector(`.${this.classes.calendar}`),
      arrivalDate: container.querySelectorAll(`.${this.classes.field}`)[0],
      leavingDate: container.querySelectorAll(`.${this.classes.field}`)[1],
      arrivalDateInput: container.querySelector(`.${this.classes.dateInput}[name="arrivalDate"]`),
      leavingDateInput: container.querySelector(`.${this.classes.dateInput}[name="leavingDate"]`),
    };
  }

  getInitialState() {
    return {
      calendarDropped: false,
    };
  }

  bindEventListeners() {
    this.DOM.arrivalDate.addEventListener('click', this.arrivalDateClickHandler.bind(this));
    this.DOM.leavingDate.addEventListener('click', this.leavingDateClickHandler.bind(this));
    document.addEventListener('click', this.outOfElementClickHandler.bind(this));
  }

  arrivalDateClickHandler() {
    this.calendar.setPickingDate('arrivalDate');
    this.toggleCalendar();
  }

  leavingDateClickHandler() {
    this.calendar.setPickingDate('leavingDate');
    this.toggleCalendar();
  }

  outOfElementClickHandler(event) {
    // if (!event.target.closest(`.${this.classes.root}`)) this.closeCalendar();
  }

  toggleCalendar() {
    this.state.calendarDropped = !this.state.calendarDropped;

    if (this.state.calendarDropped) this.DOM.calendar.classList.add(this.classes.calendarDropped);
    else this.DOM.calendar.classList.remove(this.classes.calendarDropped);
  }

  closeCalendar() {
    this.state.calendarDropped = false;
    this.DOM.calendar.classList.remove(this.classes.calendarDropped);
  }

  displayArrivalDate(date) {
    this.DOM.arrivalDateInput.value = this.convertDate(date);
  }

  displayLeavingDate(date) {
    this.DOM.leavingDateInput.value = this.convertDate(date);
  }

  convertDate(date) {
    if (date === null) return '';
    return `${date.getFullYear()}-${this.twoDigits(date.getMonth() + 1)}-${this.twoDigits(date.getDate())}`;
  }

  twoDigits(num) {
    return (`0${num}`).slice(-2);
  }
}

export default DateDropdown;
