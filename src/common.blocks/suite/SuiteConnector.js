import RateButton from '../rate-button/RateButton';
import SuiteLogic from './SuiteLogic';

class SuiteConnector {
  constructor(container) {
    this.classes = require('./suite.classes.json');
    this.DOM = this._findDOMNodes(container);
    this.suiteLogic = new SuiteLogic(container);
    this.rate = new RateButton(this.DOM.rate);
  }

  _findDOMNodes(container) {
    return {
      rate: container.querySelector(`.js-${this.classes.rate}`),
    };
  }
}

export default SuiteConnector;
