import 'jquery';
import 'jquery-ui';
import 'jquery-ui-touch-punch';
import '../../scss/main.scss';

import Component from '@frontend/Component';
import SearchForm from '@blocks/search-form/SearchForm';

class Landing extends Component {
  constructor() {
    // eslint-disable-next-line no-undef
    super({ root: document, parent: null });
  }

  setChildren() {
    this.children = [
      new SearchForm(this.root.querySelector('.js-search-form'), this),
    ];
  }
}

// eslint-disable-next-line no-unused-vars
const landing = new Landing();
