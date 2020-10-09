import FilterDateDropdownConnector from './FilterDateDropdownConnector';

class FilterDateDropdown {
  constructor(container) {
    const filterDateDropdownConnector = new FilterDateDropdownConnector(container);

    this.getArrivalDate = () => filterDateDropdownConnector.getArrivalDate();

    this.getLeavingDate = () => filterDateDropdownConnector.getLeavingDate();

    this.setArrivalDate = (date) => filterDateDropdownConnector.setArrivalDate(date);

    this.setLeavingDate = (date) => filterDateDropdownConnector.setLeavingDate(date);

    this.setArrivalDateSubscriber = (subscriber) => filterDateDropdownConnector.setArrivalDateSubscriber(subscriber);

    this.setLeavingDateSubscriber = (subscriber) => filterDateDropdownConnector.setLeavingDateSubscriber(subscriber);
  }
}

export default FilterDateDropdown;
