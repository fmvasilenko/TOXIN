import Component from '@frontend/Component';
import DropdownOptionView from './DropdownOptionView';
import DropdownOptionModel from './DropdownOptionModel';

class DropdownOption extends Component {
  constructor(root, parent, index) {
    super({ root, parent });

    this.INDEX = index;
    this.setDOM();
    this.setVocabulary();
    this.setInitialState();
    this.MODEL = new DropdownOptionModel(this);
    this.VIEW = new DropdownOptionView(this);
  }

  setState() {
    this.state = {
      optionValues: {
        value: [],
        isGlobal: true,
      },
      optionWordForms: {
        value: [],
        isGlobal: true,
      },
      decreaseButtonDisabled: {
        value: false,
        subscribers: [],
      },
    };
  }

  setClasses() {
    this.CLASSES = {
      INPUT: 'js-dropdown-option__input',
      BUTTON: 'js-dropdown-option__button',
    };
  }

  setDOM() {
    this.DOM = {
      INPUT: this.root.querySelector(`.${this.CLASSES.INPUT}`),
      DECREASE_BUTTON: this.root.querySelector(`.${this.CLASSES.BUTTON}[name="decreaseButton"]`),
      INCREASE_BUTTON: this.root.querySelector(`.${this.CLASSES.BUTTON}[name="increaseButton"]`),
    };
  }

  setVocabulary() {
    let forms = this.DOM.INPUT.getAttribute('forms');
    forms = forms ? forms.split(',') : null;

    this.VOCABULARY = {
      WORD_FORMS: forms,
    };
  }

  setInitialState() {
    this.optionValues[this.INDEX] = this.DOM.INPUT.value ? parseInt(this.DOM.INPUT.value, 10) : 0;
  }

  clickHandler(event) {
    if (event.target.closest(`.${this.CLASSES.BUTTON}`) === this.DOM.INCREASE_BUTTON) {
      const optionValues = this.optionValues;
      optionValues[this.INDEX]++;
      this.optionValues = optionValues;
    }
    else if (event.target.closest(`.${this.CLASSES.BUTTON}`) === this.DOM.DECREASE_BUTTON) {
      if (this.optionValues[this.INDEX] > 0) {
        let optionValues = this.optionValues;
        optionValues[this.INDEX]--;
        this.optionValues = optionValues;
      }
    }
  }
}

export default DropdownOption;
