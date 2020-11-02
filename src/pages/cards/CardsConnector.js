import SearchForm from '@blocks/search-form/SearchForm';
import Receipt from '@blocks/receipt/Receipt';
import Calendar from '@blocks/calendar/Calendar';
import Suite from '@blocks/suite/Suite';
import CardsLogic from './CardsLogic';

class CardsConnector {
  constructor(container) {
    this.classes = require('./cards.classes.json');
    this.DOM = this._findDOMNodes(container);

    this.cardsLogic = new CardsLogic(container);
    this.searchForm = new SearchForm(this.DOM.searchForm);
    this.recipt = new Receipt(this.DOM.receipt);
    this.calendar = new Calendar(this.DOM.calendar);
    this.suites = this._getSuites();

    this._defineSubscriptions();
  }

  _defineSubscriptions() {
    this.cardsLogic.setCalendarClickSubscriber(this.calendar.clickHandler);
  }

  _findDOMNodes(container) {
    return {
      searchForm: container.querySelector(`.js-${this.classes.searchForm}`),
      receipt: container.querySelector(`.js-${this.classes.receipt}`),
      calendar: container.querySelector(`.js-${this.classes.calendar}`),
      suites: container.querySelectorAll(`.js-${this.classes.suite}`),
    };
  }

  _getSuites() {
    const suites = [];

    this.DOM.suites.forEach((suiteContainer) => {
      suites.push(new Suite(suiteContainer));
    });

    return suites;
  }
}

export default CardsConnector;
