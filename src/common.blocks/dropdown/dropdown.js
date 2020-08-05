import Component from '@frontend/Component';
import DropdownModel from './DropdownModel';
import DropdownView from './DropdownView';
import DropdownOption from './__option/DropdownOption';

class Dropdown extends Component {
  constructor(root, parent) {
    super({ root, parent });

    this.setDOM();
    this.setVocabulary();
    this.setInitialState();

    this.MODEL = new DropdownModel(this);
    this.VIEW = new DropdownView(this);
  }

  setState() {
    this.state = {
      optionValues: {
        value: [],
      },
      optionWordForms: {
        value: [],
      },
      expanded: {
        value: false,
      },
      displayType: {
        value: 'total',
      },
      optionsSum: {
        value: 0,
      },
      wordForm: {},
    };
  }

  setClosers() {
    this.closers = [
      this.closeList.bind(this),
    ];
  }

  setConsts() {
    this.setDOM();
    this.setVocabulary();
  }

  setClasses() {
    this.CLASSES = {
      OPTION: 'js-drop-down__option',
      FIELD: 'js-drop-down__field',
      FIELD_DROPPED: 'drop-down__field_drop',
      ICON: 'js-drop-down__expand-more',
      INPUT: 'js-drop-down__field-input',
      LIST: 'js-drop-down__list',
      LIST_DROPPPED: 'drop-down__list_drop',
      CLEAR_BUTTON: 'js-drop-down__clear-button',
      SUBMIT_BUTTON: 'js-drop-down__submit-button',
      BUTTON_HIDDEN: 'button_hidden',
    };
  }

  setDOM() {
    this.DOM = {
      FIELD: this.root.querySelector(`.${this.CLASSES.FIELD}`),
      ICON: this.root.querySelector(`.${this.CLASSES.ICON}`),
      INPUT: this.root.querySelector(`.${this.CLASSES.INPUT}`),
      LIST: this.root.querySelector(`.${this.CLASSES.LIST}`),
      CLEAR_BUTTON: this.root.querySelector(`.${this.CLASSES.CLEAR_BUTTON}`).querySelector('button'),
      SUBMIT_BUTTON: this.root.querySelector(`.${this.CLASSES.SUBMIT_BUTTON}`).querySelector('button'),
    };
  }

  setVocabulary() {
    let forms = this.DOM.INPUT.hasAttribute('forms') ? this.DOM.INPUT.getAttribute('forms') : null;
    forms = forms ? forms.split(',') : null;

    this.VOCABULARY = {
      WORD_FORMS: forms,
      DEFAULT_VALUE: this.DOM.INPUT.value,
    };
  }

  setChildren() {
    this.children = [];
    const options = this.root.querySelectorAll(`.${this.CLASSES.OPTION}`);

    options.forEach((option, index) => {
      this.children[index] = new DropdownOption(option, this, index);
    });
  }

  setInitialState() {
    this.displayType = this.root.hasAttribute('display_type') ? this.root.getAttribute('display_type') : 'total';
  }

  clickHandler(event) {
    if (event.target.closest(`.${this.CLASSES.FIELD}`) === this.DOM.FIELD) {
      this.expanded = !this.expanded;
    } else if (event.target.closest(`.${this.CLASSES.CLEAR_BUTTON}`) === this.DOM.CLEAR_BUTTON.parentNode) {
      if (this.DOM.CLEAR_BUTTON !== undefined) this.optionValues = this.optionValues.map(() => 0);
    } else if (event.target.closest(`.${this.CLASSES.SUBMIT_BUTTON}`) === this.DOM.SUBMIT_BUTTON.parentNode) {
      this.expanded = false;
    }
  }

  closeList() {
    this.expanded = false;
  }
}

export default Dropdown;
