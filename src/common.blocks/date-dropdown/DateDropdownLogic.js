/* eslint-disable class-methods-use-this */
import DateDropdownStateItem from './DateDropdownStateItem';

class DateDropdown {
  constructor(container) {
    this.classes = require('./date-dropdown.classes.json');
    this.DOM = this.findDOMNodes(container);
    this.state = this.getInitialState();
    this.defineSubscriptions();
    this.bindEventListeners();
  }

  getArrivalDate() {
    return this.state.arrivalDate.get();
  }

  getLeavingDate() {
    return this.state.leavingDate.get();
  }

  setArrivalDate(date) {
    this.state.arrivalDate.set(date);
  }

  setLeavingDate(date) {
    this.state.leavingDate.set(date);
  }

  setPickingDateSubscriber(subscriber) {
    this.pickingDateExternalSubscriber = subscriber;
  }

  closeCalendar() {
    this.state.calendarDropped.set(false);
  }

  defineSubscriptions() {
    this.pickingDateExternalSubscriber = () => {};

    this.state.calendarDropped.addSubscriber(this.renderCalendar.bind(this));
    this.state.arrivalDate.addSubscriber(this.displayArrivalDate.bind(this));
    this.state.leavingDate.addSubscriber(this.displayLeavingDate.bind(this));
    this.state.arrivalDate.addSubscriber(this.clearPickingDate.bind(this));
    this.state.leavingDate.addSubscriber(this.clearPickingDate.bind(this));
    this.state.pickingDate.addSubscriber(this.pickingDateSubscriber.bind(this));
  }

  pickingDateSubscriber() {
    this.pickingDateExternalSubscriber(this.state.pickingDate.get());
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
    const arrivalDate = this.DOM.arrivalDateInput.value ? new Date(this.DOM.arrivalDateInput.value) : null;
    const leavingDate = this.DOM.leavingDateInput.value ? new Date(this.DOM.leavingDateInput.value) : null;

    return {
      calendarDropped: new DateDropdownStateItem(false),
      arrivalDate: new DateDropdownStateItem(arrivalDate),
      leavingDate: new DateDropdownStateItem(leavingDate),
      pickingDate: new DateDropdownStateItem(''),
    };
  }

  bindEventListeners() {
    this.DOM.arrivalDate.addEventListener('click', this.arrivalDateClickHandler.bind(this));
    this.DOM.leavingDate.addEventListener('click', this.leavingDateClickHandler.bind(this));
  }

  arrivalDateClickHandler() {
    this.state.pickingDate.set('arrivalDate');
    this.state.calendarDropped.set(!this.state.calendarDropped.get());
  }

  leavingDateClickHandler() {
    this.state.pickingDate.set('leavingDate');
    this.state.calendarDropped.set(!this.state.calendarDropped.get());
  }

  clearPickingDate() {
    this.state.pickingDate.set('');
  }

  renderCalendar() {
    if (this.state.calendarDropped.get()) this.DOM.calendar.classList.add(this.classes.calendarDropped);
    else this.DOM.calendar.classList.remove(this.classes.calendarDropped);
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
