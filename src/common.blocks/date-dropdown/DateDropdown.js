import DateDropdownConnector from './DateDropdownConnector';

class DateDropdown {
  constructor(container) {
    const dateDropdown = new DateDropdownConnector(container);

    this.setArrivalDate = (date) => dateDropdown.setArrivalDate(date);

    this.setLeavingDate = (date) => dateDropdown.setLeavingDate(date);

    this.getArrivalDate = () => dateDropdown.getArrivalDate();

    this.getLeavingDate = () => dateDropdown.getLeavingDate();

    this.setArrivalDateSubscriber = (subscriber) => dateDropdown.setArrivalDateSubscriber(subscriber);

    this.setLeavingDateSubscriber = (subscriber) => dateDropdown.setLeavingDateSubscriber(subscriber);
  }
}

export default DateDropdown;
