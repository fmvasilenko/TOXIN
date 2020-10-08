import Calendar from '@blocks/calendar/Calendar';
import FilterDateDropdownLogic from './FilterDateDropdownLogic';

class FilterDateDropdown {
  constructor(container) {
    this.classes = require('./filter-date-dropdown.classes.json');

    this.filterDateDropdown = new FilterDateDropdownLogic(container);
    this.calendar = new Calendar(this.findCalendarContainer(container));

    this.arrivalDateExternalSubscriber = () => {};
    this.leavingDateExternalSubscriber = () => {};
    this.defineSubscriptions();
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

  findCalendarContainer(container) {
    return container.querySelector(`.${this.classes.calendar}`);
  }

  defineSubscriptions() {
    this.calendar.setArrivalDateSubscriber(this.arrivalDateSubscriber.bind(this));
    this.calendar.setLeavingDateSubscriber(this.leavingDateSubscriber.bind(this));
    this.calendar.setSubmitSubscriber(this.filterDateDropdown.closeCalendar.bind(this.filterDateDropdown));
  }

  arrivalDateSubscriber(date) {
    this.filterDateDropdown.setArrivalDate(date);
    this.arrivalDateExternalSubscriber(date);
  }

  leavingDateSubscriber(date) {
    this.filterDateDropdown.setLeavingDate(date);
    this.leavingDateExternalSubscriber(date);
  }
}

export default FilterDateDropdown;
