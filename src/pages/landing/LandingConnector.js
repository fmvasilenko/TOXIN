import SearchForm from '@blocks/search-form/SearchForm';

class LandingConnector {
  constructor(container) {
    this.classes = require('./landing.classes.json');
    this.DOM = this._findDOMNodes(container);

    this.searchForm = new SearchForm(this.DOM.searchForm);
  }

  _findDOMNodes(container) {
    return {
      searchForm: container.querySelector(`.js-${this.classes.searchForm}`),
    };
  }
}

export default LandingConnector;
