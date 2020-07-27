import 'jquery';
import '../../scss/main.scss';

import Component from '@frontend/component';
import Sidebar from '@blocks/sidebar/sidebar';
import Suite from '@blocks/suite/suite';

class Searchroom extends Component {
  constructor() {
    // eslint-disable-next-line no-undef
    super({ root: document, parent: null });
  }

  setChildren() {
    this.children = [
      new Sidebar(this.root.querySelector('.sidebar'), this),
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

// eslint-disable-next-line no-unused-vars
const searchroom = new Searchroom();
