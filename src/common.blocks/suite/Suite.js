import RateButton from '../rate-button/RateButton';
import SuiteLogic from './SuiteLogic';

class Suite {
  constructor(container) {
    this.classes = require('./suite.classes.json');
    this.DOM = this.findDOMNodes(container);
    this.suiteLogic = new SuiteLogic(container);
    this.rate = new RateButton(this.DOM.rate);
  }

  findDOMNodes(container) {
    return {
      rate: container.querySelector(`.${this.classes.rate}`),
    };
  }
}

export default Suite;
