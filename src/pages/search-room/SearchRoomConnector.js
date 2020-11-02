import Sidebar from '@blocks/sidebar/Sidebar';
import Suite from '@blocks/suite/Suite';

class SearchRoomConnector {
  constructor(container) {
    this.classes = require('./search-room.classes.json');
    this.DOM = this._findDOMNodes(container);

    this.sidebar = new Sidebar(this.DOM.sidebar);
    this.suites = this._getSuites();
  }

  _findDOMNodes(container) {
    return {
      suites: container.querySelectorAll(`.js-${this.classes.suite}`),
      sidebar: container.querySelector(`.js-${this.classes.sidebar}`),
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

export default SearchRoomConnector;
