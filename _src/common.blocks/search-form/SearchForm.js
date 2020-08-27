import Component from '@frontend/Component';
import DateDropdown from '@blocks/date-dropdown/DateDropdown';
import Dropdown from '@blocks/dropdown/Dropdown';

class SearchForm extends Component {
  constructor(root, parent = {}) {
    super({ root, parent });
  }

  setClasses() {
    this.CLASSES = {
      DROPDOWN: 'js-dropdown',
      DATE_DROPDOWN: 'js-date-dropdown',
    };
  }

  setChildren() {
    this.children = [
      new DateDropdown(this.root.querySelector(`.${this.CLASSES.DATE_DROPDOWN}`), this),
      new Dropdown(this.root.querySelector(`.${this.CLASSES.DROPDOWN}`), this),
    ];
  }
}

export default SearchForm;
