import 'jquery';
import '../../scss/main.scss';

import Component from '@frontend/component';
import SearchForm from '@blocks/search-form/search-form';
import Receipt from '@blocks/receipt/receipt';
import Calendar from '@blocks/calendar/calendar';
import Suite from '@blocks/suite/suite';

class Cards extends Component {
  constructor() {
    super({ root: document, parent: null });
  }

  setChildren() {
    this.children = [
      new SearchForm(this.root.querySelector('.js-search-form'), this),
      new Receipt(this.root.querySelector('.js-receipt'), this),
      new Calendar(this.root.querySelector('.js-cards__calendar').querySelector('.js-calendar'), this),
    ];
    const suites = this.initSuite();

    this.children = this.children.concat(suites);
  }

  initSuite() {
    const suites = [];

    this.root.querySelectorAll('.js-suite').forEach((element, index) => {
      suites[index] = new Suite(element, this);
    });

    return suites;
  }
}

const cards = new Cards();
