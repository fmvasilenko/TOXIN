import DateDropdown from '@blocks/date-dropdown/DateDropdown';
import Dropdown from '@blocks/dropdown/Dropdown';

class SearchFormConnector {
  constructor(container) {
    this.dateDropdown = new DateDropdown(container);
    this.dropdown = new Dropdown(container);
  }

  getArrivalDate() {
    return this.dateDropdown.getArrivalDate();
  }

  setArrivalDate(date) {
    this.dateDropdown.setArrivalDate(date);
  }

  setArrivalDateSubscriber(subscriber) {
    this.dateDropdown.setArrivalDateSubscriber(subscriber);
  }

  getLeavingDate() {
    return this.dateDropdown.getLeavingDate();
  }

  setLeavingDate(date) {
    this.dateDropdown.setLeavingDate(date);
  }

  setLeavingDateSubscriber(subscriber) {
    this.dateDropdown.setLeavingDateSubscriber(subscriber);
  }

  getTotalGuestsNumber() {
    return this.dropdown.getTotalNumber();
  }

  setTotalGuestsNumberSubscriber(subscriber) {
    this.dropdown.setTotalNumberSubscriber(subscriber);
  }
}

export default SearchFormConnector;
