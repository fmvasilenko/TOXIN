/* eslint-disable class-methods-use-this */
import FilterDateDropdownStateItem from './FilterDateDropdownStateItem';

class FilterDateDropdownLogic {
  constructor(container) {
    this.classes = require('./filter-date-dropdown.classes.json');
    this.vocabulary = require('./filter-date-dropdown.config.json').vocabulary;
    this.DOM = this.findDOMNodes(container);
    this.state = this.getInitialState();

    this.defineSubscriptions();
    this.bindEventListeners();
    this.render();
  }

  closeCalendar() {
    this.state.calendarDropped.set(false);
  }

  setArrivalDate(date) {
    this.state.arrivalDate.set(date);
  }

  setLeavingDate(date) {
    this.state.leavingDate.set(date);
  }

  getArrivalDate() {
    return this.state.arrivalDate.get();
  }

  getLeavingDate() {
    return this.state.leavingDate.get();
  }

  defineSubscriptions() {
    this.state.calendarDropped.addSubscriber(this.toggleCalendar.bind(this));
    this.state.arrivalDate.addSubscriber(this.render.bind(this));
    this.state.leavingDate.addSubscriber(this.render.bind(this));
  }

  findDOMNodes(container) {
    return {
      field: container.querySelector(`.${this.classes.field}`),
      input: container.querySelector(`.${this.classes.input}`),
      arrivalDateInput: container.querySelector(`.${this.classes.arrivalDateInput}`),
      leavingDateInput: container.querySelector(`.${this.classes.leavingDateInput}`),
      calendar: container.querySelector(`.${this.classes.calendar}`),
    };
  }

  getInitialState() {
    const arrivalDate = this.DOM.arrivalDateInput.value ? new Date(this.DOM.arrivalDateInput.value) : null;
    const leavingDate = this.DOM.leavingDateInput.value ? new Date(this.DOM.leavingDateInput.value) : null;

    return {
      calendarDropped: new FilterDateDropdownStateItem(false),
      arrivalDate: new FilterDateDropdownStateItem(arrivalDate),
      leavingDate: new FilterDateDropdownStateItem(leavingDate),
    };
  }

  bindEventListeners() {
    this.DOM.field.addEventListener('click', this.fieldClickHandler.bind(this));
  }

  fieldClickHandler() {
    this.state.calendarDropped.set(!this.state.calendarDropped.get());
  }

  toggleCalendar() {
    if (this.state.calendarDropped.get()) this.DOM.calendar.classList.add(this.classes.calendarDropped);
    else this.DOM.calendar.classList.remove(this.classes.calendarDropped);
  }

  render() {
    const arrivalDate = this.state.arrivalDate.get();
    const leavingDate = this.state.leavingDate.get();

    this.DOM.input.value = `${this.convertDateForFieldInput(arrivalDate)} - ${this.convertDateForFieldInput(leavingDate)}`;
    this.DOM.arrivalDateInput.value = this.convertDateForDateInput(arrivalDate);
    this.DOM.leavingDateInput.value = this.convertDateForDateInput(leavingDate);
  }

  convertDateForFieldInput(date) {
    if (date) return `${date.getDate()} ${this.vocabulary.months[date.getMonth()]}`;
    return '__';
  }

  convertDateForDateInput(date) {
    if (date) return `${date.getFullYear()}-${this.twoDigits(date.getMonth() + 1)}-${this.twoDigits(date.getDate())}`;
    return '';
  }

  twoDigits(num) {
    return (`0${num}`).slice(-2);
  }
}

export default FilterDateDropdownLogic;
