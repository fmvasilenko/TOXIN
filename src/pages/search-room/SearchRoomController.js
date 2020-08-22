import Component from '@frontend/Component';
import Sidebar from '@blocks/sidebar/Sidebar';
import Suite from '@blocks/suite/Suite';

class SearchroomController extends Component {
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

export default SearchroomController;
