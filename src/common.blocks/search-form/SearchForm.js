import SearchFormConnector from './SearchFormConnector';

class SearchForm {
  constructor(container) {
    const searchForm = new SearchFormConnector(container);

    this.getArrivalDate = () => searchForm.getArrivalDate();

    this.setArrivalDate = (date) => searchForm.setArrivalDate(date);

    this.setArrivalDateSubscriber = (subscriber) => searchForm.setArrivalDateSubscriber(subscriber);

    this.getLeavingDate = () => searchForm.getLeavingDate();

    this.setLeavingDate = (date) => searchForm.setLeavingDate(date);

    this.setLeavingDateSubscriber = (subscriber) => searchForm.setLeavingDateSubscriber(subscriber);

    this.getTotalGuestsNumber = () => searchForm.getTotalGuestsNumber();

    this.setTotalGuestsNumberSubscriber = (subscriber) => searchForm.setTotalGuestsNumberSubscriber(subscriber);
  }
}

export default SearchForm;
