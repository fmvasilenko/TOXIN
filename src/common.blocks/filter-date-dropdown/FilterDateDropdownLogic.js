/* eslint-disable class-methods-use-this */
import FilterDateDropdownStateItem from './FilterDateDropdownStateItem';

class FilterDateDropdownLogic {
  constructor(container) {
    this.classes = require('./filter-date-dropdown.classes.json');
    this.vocabulary = require('./filter-date-dropdown.config.json').vocabulary;
    this.DOM = this._findDOMNodes(container);
    this.state = this._getInitialState();

    this._defineSubscriptions();
    this._bindEventListeners();
    this._render();
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

  setCalendarClickSubscriber(subscriber) {
    this.calendarClickSubscriber = subscriber;
  }

  closeCalendar() {
    this.state.calendarDropped.value = false;
  }

  _defineSubscriptions() {
    this.calendarClickSubscriber = () => {};

    this.state.calendarDropped.addSubscriber(this._toggleCalendar.bind(this));
    this.state.arrivalDate.addSubscriber(this._render.bind(this));
    this.state.leavingDate.addSubscriber(this._render.bind(this));
  }

  _findDOMNodes(container) {
    return {
      field: container.querySelector(`.js-${this.classes.field}`),
      input: container.querySelector(`.js-${this.classes.input}`),
      arrivalDateInput: container.querySelector(`.js-${this.classes.arrivalDateInput}`),
      leavingDateInput: container.querySelector(`.js-${this.classes.leavingDateInput}`),
      calendar: container.querySelector(`.js-${this.classes.calendar}`),
    };
  }

  _getInitialState() {
    const arrivalDate = this.DOM.arrivalDateInput.value ? new Date(this.DOM.arrivalDateInput.value) : null;
    const leavingDate = this.DOM.leavingDateInput.value ? new Date(this.DOM.leavingDateInput.value) : null;

    return {
      calendarDropped: new FilterDateDropdownStateItem(false),
      arrivalDate: new FilterDateDropdownStateItem(arrivalDate),
      leavingDate: new FilterDateDropdownStateItem(leavingDate),
    };
  }

  _bindEventListeners() {
    document.addEventListener('click', this._clickHandler.bind(this));
  }

  _clickHandler(event) {
    if (event.target.closest(`.js-${this.classes.field}`) === this.DOM.field) this._fieldClickHandler();
    else if (event.target.closest(`.js-${this.classes.calendar}`) === this.DOM.calendar) this.calendarClickSubscriber(event);
    else this.closeCalendar();
  }

  _fieldClickHandler() {
    this.state.calendarDropped.value = !this.state.calendarDropped.value;
  }

  _toggleCalendar() {
    if (this.state.calendarDropped.value) this.DOM.calendar.classList.add(this.classes.calendarDropped);
    else this.DOM.calendar.classList.remove(this.classes.calendarDropped);
  }

  _render() {
    const arrivalDate = this.state.arrivalDate.value;
    const leavingDate = this.state.leavingDate.value;

    this.DOM.input.value = `${this._convertDateForFieldInput(arrivalDate)} - ${this._convertDateForFieldInput(leavingDate)}`;
    this.DOM.arrivalDateInput.value = this._convertDateForDateInput(arrivalDate);
    this.DOM.leavingDateInput.value = this._convertDateForDateInput(leavingDate);
  }

  _convertDateForFieldInput(date) {
    if (date) return `${date.getDate()} ${this.vocabulary.months[date.getMonth()]}`;
    return '__';
  }

  _convertDateForDateInput(date) {
    if (date) return `${date.getFullYear()}-${this._twoDigits(date.getMonth() + 1)}-${this._twoDigits(date.getDate())}`;
    return '';
  }

  _twoDigits(num) {
    return (`0${num}`).slice(-2);
  }
}

export default FilterDateDropdownLogic;
