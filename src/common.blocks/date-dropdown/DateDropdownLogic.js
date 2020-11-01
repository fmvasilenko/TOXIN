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
    return this.state.arrivalDate.value;
  }

  getLeavingDate() {
    return this.state.leavingDate.value;
  }

  setArrivalDate(date) {
    this.state.arrivalDate.value = date;
  }

  setLeavingDate(date) {
    this.state.leavingDate.value = date;
  }

  setPickingDateSubscriber(subscriber) {
    this.pickingDateExternalSubscriber = subscriber;
  }

  setCalendarClickSubscriber(subscriber) {
    this.calendarClickSubscriber = subscriber;
  }

  closeCalendar() {
    this.state.calendarDropped.value = false;
  }

  defineSubscriptions() {
    this.pickingDateExternalSubscriber = () => {};
    this.calendarClickSubscriber = () => {};

    this.state.calendarDropped.addSubscriber(this.renderCalendar.bind(this));
    this.state.arrivalDate.addSubscriber(this.displayArrivalDate.bind(this));
    this.state.leavingDate.addSubscriber(this.displayLeavingDate.bind(this));
    this.state.arrivalDate.addSubscriber(this.clearPickingDate.bind(this));
    this.state.leavingDate.addSubscriber(this.clearPickingDate.bind(this));
    this.state.pickingDate.addSubscriber(this.pickingDateSubscriber.bind(this));
  }

  pickingDateSubscriber() {
    this.pickingDateExternalSubscriber(this.state.pickingDate.value);
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
    document.addEventListener('click', this.clickHandler.bind(this));
  }

  clickHandler(event) {
    if (event.target.closest(`.${this.classes.field}`) === this.DOM.arrivalDate) this.arrivalDateClickHandler();
    else if (event.target.closest(`.${this.classes.field}`) === this.DOM.leavingDate) this.leavingDateClickHandler();
    else if (event.target.closest(`.${this.classes.calendar}`) === this.DOM.calendar) this.calendarClickSubscriber(event);
    else if (event.target.closest(`.${this.classes.root}`) !== this.DOM.root) this.closeCalendar();
  }

  arrivalDateClickHandler() {
    this.state.pickingDate.value = 'arrivalDate';
    this.state.calendarDropped.value = !this.state.calendarDropped.value;
  }

  leavingDateClickHandler() {
    this.state.pickingDate.value = 'leavingDate';
    this.state.calendarDropped.value = !this.state.calendarDropped.value;
  }

  clearPickingDate() {
    this.state.pickingDate.value = '';
  }

  renderCalendar() {
    if (this.state.calendarDropped.value) this.DOM.calendar.classList.add(this.classes.calendarDropped);
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
