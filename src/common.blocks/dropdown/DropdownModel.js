/* eslint-disable prefer-destructuring */
import ComponentModel from '@frontend/ComponentModel';

class DropdownModel extends ComponentModel {
  constructor(controller) {
    super(controller);

    this.VOCABULARY = this.CONTROLLER.VOCABULARY;
    this.setInitialState();
  }

  setState() {
    this.state = {
      options: {
        subscribers: [
          this.calcSum.bind(this),
        ],
      },
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
    if (this.options.length) {
      this.optionsSum = this.options.reduce((sum, option) => {
        if (!option.countedSeparately) return sum + option.value;
        return sum;
      }, 0);
    } else this.optionsSum = 0;
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
    } else this.wordForm = this.VOCABULARY.WORD_FORMS[2];

    return true;
  }
}

export default DropdownModel;
