import ComponentModel from '@frontend/componentModel';

class DropdownModel extends ComponentModel {
  constructor(controller) {
    super(controller);

    this.VOCABULARY = this.CONTROLLER.VOCABULARY;
    this.setInitialState();
  }

  setState() {
    this.state = {
      optionValues: {
        subscribers: [
          this.calcSum.bind(this),
        ],
      },
      optionWordForms: {},
      optionsSum: {
        subscribers: [
          this.changeWordForm.bind(this),
        ],
      },
      wordForm: {},
    };
  }

  setInitialState() {
    this.calcSum();
  }

  calcSum() {
    if (this.optionValues.length) this.optionsSum = this.optionValues.reduce((sum, value) => sum + value);
    else this.optionsSum = 0;
  }

  changeWordForm() {
    if (!this.VOCABULARY.WORD_FORMS) {
      this.wordForm = null;
      return false;
    }

    let n = this.optionsSum;
    n %= 100;

    if (n < 10 || n > 20) {
      n %= 10;

      if (n === 1) this.wordForm = this.VOCABULARY.WORD_FORMS[0];
      else if (n > 1 && n < 5) this.wordForm = this.VOCABULARY.WORD_FORMS[1];
      else this.wordForm = this.VOCABULARY.WORD_FORMS[2];
    }
    else this.wordForm = this.VOCABULARY.WORD_FORMS[2];

    return true;
  }
}

export default DropdownModel;
