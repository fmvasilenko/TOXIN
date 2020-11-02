import Calendar from '@blocks/calendar/Calendar';
import FilterDateDropdownLogic from './FilterDateDropdownLogic';

class FilterDateDropdownConnector {
  constructor(container) {
    this.filterDateDropdown = new FilterDateDropdownLogic(container);
    this.calendar = new Calendar(container);
    this._defineSubscriptions();
    this._setInitialState();
  }

  getArrivalDate() {
    return this.filterDateDropdown.getArrivalDate();
  }

  getLeavingDate() {
    return this.filterDateDropdown.getLeavingDate();
  }

  setArrivalDate(date) {
    this.calendar.setArrivalDate(date);
  }

  setLeavingDate(date) {
    this.calendar.setLeavingDate(date);
  }

  setArrivalDateSubscriber(subscriber) {
    this.arrivalDateExternalSubscriber = subscriber;
  }

  setLeavingDateSubscriber(subscriber) {
    this.leavingDateExternalSubscriber = subscriber;
  }

  _defineSubscriptions() {
    this.arrivalDateExternalSubscriber = () => {};
    this.leavingDateExternalSubscriber = () => {};

    this.calendar.setArrivalDateSubscriber(this._arrivalDateSubscriber.bind(this));
    this.calendar.setLeavingDateSubscriber(this._leavingDateSubscriber.bind(this));
    this.calendar.setSubmitSubscriber(this.filterDateDropdown.closeCalendar.bind(this.filterDateDropdown));
    this.filterDateDropdown.setCalendarClickSubscriber(this.calendar.clickHandler);
  }

  _arrivalDateSubscriber(date) {
    this.filterDateDropdown.setArrivalDate(date);
    this.arrivalDateExternalSubscriber(date);
  }

  _leavingDateSubscriber(date) {
    this.filterDateDropdown.setLeavingDate(date);
    this.leavingDateExternalSubscriber(date);
  }

  _setInitialState() {
    this.calendar.setArrivalDate(this.filterDateDropdown.getArrivalDate());
    this.calendar.setLeavingDate(this.filterDateDropdown.getLeavingDate());
  }
}

export default FilterDateDropdownConnector;
