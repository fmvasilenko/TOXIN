/* eslint-disable class-methods-use-this */
import DateDropdownStateItem from './DateDropdownStateItem';

class DateDropdown {
  constructor(container) {
    this.classes = require('./date-dropdown.classes.json');
    this.DOM = this._findDOMNodes(container);
    this.state = this._getInitialState();
    this._defineSubscriptions();
    this._bindEventListeners();
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

  _defineSubscriptions() {
    this.pickingDateExternalSubscriber = () => {};
    this.calendarClickSubscriber = () => {};

    this.state.calendarDropped.addSubscriber(this._renderCalendar.bind(this));
    this.state.arrivalDate.addSubscriber(this._displayArrivalDate.bind(this));
    this.state.leavingDate.addSubscriber(this._displayLeavingDate.bind(this));
    this.state.arrivalDate.addSubscriber(this._clearPickingDate.bind(this));
    this.state.leavingDate.addSubscriber(this._clearPickingDate.bind(this));
    this.state.pickingDate.addSubscriber(this._pickingDateSubscriber.bind(this));
  }

  _pickingDateSubscriber() {
    this.pickingDateExternalSubscriber(this.state.pickingDate.value);
  }

  _findDOMNodes(container) {
    return {
      root: container.querySelector(`.js-${this.classes.root}`),
      calendar: container.querySelector(`.js-${this.classes.calendar}`),
      arrivalDate: container.querySelectorAll(`.js-${this.classes.field}`)[0],
      leavingDate: container.querySelectorAll(`.js-${this.classes.field}`)[1],
      arrivalDateInput: container.querySelector(`.js-${this.classes.input}[name="arrivalDate"]`),
      leavingDateInput: container.querySelector(`.js-${this.classes.input}[name="leavingDate"]`),
    };
  }

  _getInitialState() {
    const arrivalDate = this.DOM.arrivalDateInput.value ? new Date(this.DOM.arrivalDateInput.value) : null;
    const leavingDate = this.DOM.leavingDateInput.value ? new Date(this.DOM.leavingDateInput.value) : null;

    return {
      calendarDropped: new DateDropdownStateItem(false),
      arrivalDate: new DateDropdownStateItem(arrivalDate),
      leavingDate: new DateDropdownStateItem(leavingDate),
      pickingDate: new DateDropdownStateItem(''),
    };
  }

  _bindEventListeners() {
    document.addEventListener('click', this._clickHandler.bind(this));
  }

  _clickHandler(event) {
    if (event.target.closest(`.js-${this.classes.field}`) === this.DOM.arrivalDate) this._arrivalDateClickHandler();
    else if (event.target.closest(`.js-${this.classes.field}`) === this.DOM.leavingDate) this._leavingDateClickHandler();
    else if (event.target.closest(`.js-${this.classes.calendar}`) === this.DOM.calendar) this.calendarClickSubscriber(event);
    else if (event.target.closest(`.js-${this.classes.root}`) !== this.DOM.root) this.closeCalendar();
  }

  _arrivalDateClickHandler() {
    this.state.pickingDate.value = 'arrivalDate';
    this.state.calendarDropped.value = !this.state.calendarDropped.value;
  }

  _leavingDateClickHandler() {
    this.state.pickingDate.value = 'leavingDate';
    this.state.calendarDropped.value = !this.state.calendarDropped.value;
  }

  _clearPickingDate() {
    this.state.pickingDate.value = '';
  }

  _renderCalendar() {
    if (this.state.calendarDropped.value) this.DOM.calendar.classList.add(this.classes.calendarDropped);
    else this.DOM.calendar.classList.remove(this.classes.calendarDropped);
  }

  _displayArrivalDate(date) {
    this.DOM.arrivalDateInput.value = this._convertDate(date);
  }

  _displayLeavingDate(date) {
    this.DOM.leavingDateInput.value = this._convertDate(date);
  }

  _convertDate(date) {
    if (date === null) return '';
    return `${date.getFullYear()}-${this._twoDigits(date.getMonth() + 1)}-${this._twoDigits(date.getDate())}`;
  }

  _twoDigits(num) {
    return (`0${num}`).slice(-2);
  }
}

export default DateDropdown;
