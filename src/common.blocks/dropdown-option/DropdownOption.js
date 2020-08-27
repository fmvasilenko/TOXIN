import Component from '@frontend/Component';

class DropdownOption extends Component {
  constructor(root, parent, index) {
    super({ root, parent });

    this.INDEX = index;
    this.setDOM();
    this.setVocabulary();
    this.setInitialState();
  }

  setState() {
    this.state = {
      options: {
        value: [],
        isGlobal: true,
        subscribers: [
          this.updateInput.bind(this),
          this.checkDecreaseButton.bind(this),
        ],
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
    let forms = this.root.getAttribute('data-word-forms');
    forms = forms ? forms.split(',') : null;

    this.VOCABULARY = {
      WORD_FORMS: forms,
    };
  }

  setInitialState() {
    const value = this.DOM.INPUT.value ? parseInt(this.DOM.INPUT.value, 10) : 0;
    this.updateOption(value, this.getWordForm(value));

    this.options[this.INDEX].countedSeparately = this.root.getAttribute('data-counted-separately') === 'true';
  }

  clickHandler(event) {
    if (event.target.closest(`.${this.CLASSES.BUTTON}`) === this.DOM.INCREASE_BUTTON) {
      this.increaseValue();
    } else if (event.target.closest(`.${this.CLASSES.BUTTON}`) === this.DOM.DECREASE_BUTTON) {
      this.decreaseValue();
    }
  }

  increaseValue() {
    let value = this.getCurrentValue();

    value += 1;
    this.updateOption(value, this.getWordForm(value));
  }

  decreaseValue() {
    let value = this.getCurrentValue();

    if (value > 0) value -= 1;
    this.updateOption(value, this.getWordForm(value));
  }

  getCurrentValue() {
    return this.options[this.INDEX].value;
  }

  updateInput() {
    this.DOM.INPUT.value = this.options[this.INDEX].value;
  }

  checkDecreaseButton() {
    if (this.options[this.INDEX].value <= 0) this.DOM.DECREASE_BUTTON.disabled = true;
    else this.DOM.DECREASE_BUTTON.disabled = false;
  }

  updateOption(value, wordForm) {
    const options = this.options;
    if (!options[this.INDEX]) options[this.INDEX] = {};
    options[this.INDEX].value = value;
    options[this.INDEX].wordForm = wordForm;
    this.options = options;
  }

  getWordForm(value) {
    if (!this.VOCABULARY.WORD_FORMS) return '';

    let n = value % 100;

    if (n < 10 || n > 20) {
      n %= 10;

      if (n === 1) return this.VOCABULARY.WORD_FORMS[0];
      if (n > 1 && n < 5) return this.VOCABULARY.WORD_FORMS[1];
    }

    return this.VOCABULARY.WORD_FORMS[2];
  }
}

export default DropdownOption;
