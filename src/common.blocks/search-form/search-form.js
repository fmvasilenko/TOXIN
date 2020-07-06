import Component from '@frontend/component';
import DateDropdown from '@blocks/date-dropdown/date-dropdown';
import Dropdown from '@blocks/dropdown/dropdown';

class SearchForm extends Component {
  constructor(root, parent = {}) {
    super({ root, parent });
  }

  setClasses() {
    this.CLASSES = {
      DROPDOWN: 'js-drop-down',
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
