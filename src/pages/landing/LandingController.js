import Component from '@frontend/Component';
import SearchForm from '@blocks/search-form/SearchForm';

class LandingController extends Component {
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

export default LandingController;
