import Calendar from '@blocks/calendar/Calendar';
import FilterDateDropdownLogic from './FilterDateDropdownLogic';

class FilterDateDropdown {
  constructor(container) {
    this.classes = require('./filter-date-dropdown.classes.json');

    this.filterDateDropdown = new FilterDateDropdownLogic(container);
    this.calendar = new Calendar(this.findCalendarContainer(container));

    this.defineSubscriptions();
  }

  getArrivalDate() {
    return this.filterDateDropdown.getArrivalDate();
  }

  getLeavingDate() {
    return this.filterDateDropdown.getLeavingDate();
  }

  setArrivalDate() {

  }

  setLeavingDate() {

  }

  setArrivalDateSubscriber() {

  }

  setLeavingDateSubscriber() {
    
  }

  findCalendarContainer(container) {
    return container.querySelector(`.${this.classes.calendar}`);
  }

  defineSubscriptions() {
    this.calendar.setArrivalDateSubscriber(this.filterDateDropdown.setArrivalDate.bind(this.filterDateDropdown));
    this.calendar.setLeavingDateSubscriber(this.filterDateDropdown.setLeavingDate.bind(this.filterDateDropdown));
    this.calendar.setSubmitSubscriber(this.filterDateDropdown.closeCalendar.bind(this.filterDateDropdown));
  }
}

export default FilterDateDropdown;
