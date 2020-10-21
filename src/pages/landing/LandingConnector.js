import SearchForm from '@blocks/search-form/SearchForm';

class LandingConnector {
  constructor(container) {
    this.classes = require('./landing.classes.json');
    this.DOM = this.findDOMNodes(container);

    this.searchForm = new SearchForm(this.DOM.searchForm);
  }

  findDOMNodes(container) {
    return {
      searchForm: container.querySelector(`.${this.classes.searchForm}`),
    };
  }
}

export default LandingConnector;
