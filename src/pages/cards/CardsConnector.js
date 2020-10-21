import SearchForm from '@blocks/search-form/SearchForm';
import Receipt from '@blocks/receipt/Receipt';
import Calendar from '@blocks/calendar/Calendar';
import Suite from '@blocks/suite/Suite';

class CardsConnector {
  constructor(container) {
    this.classes = require('./cards.classes.json');
    this.DOM = this.findDOMNodes(container);

    this.searchForm = new SearchForm(this.DOM.searchForm);
    this.recipt = new Receipt(this.DOM.receipt);
    this.calendar = new Calendar(this.DOM.calendar);
    this.suites = this.getSuites();
  }

  findDOMNodes(container) {
    return {
      searchForm: container.querySelector(`.${this.classes.searchForm}`),
      receipt: container.querySelector(`.${this.classes.receipt}`),
      calendar: container.querySelector(`.${this.classes.calendar}`),
      suites: container.querySelectorAll(`.${this.classes.suite}`),
    };
  }

  getSuites() {
    const suites = [];

    this.DOM.suites.forEach((suiteContainer) => {
      suites.push(new Suite(suiteContainer));
    });

    return suites;
  }
}

export default CardsConnector;
