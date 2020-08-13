/* eslint-disable prefer-destructuring */
import ComponentModel from '@frontend/ComponentModel';

class DropdownOptionModel extends ComponentModel {
  constructor(controller) {
    super(controller);

    this.VOCABULARY = this.CONTROLLER.VOCABULARY;
    this.INDEX = this.CONTROLLER.INDEX;
    this.setInitialState();
  }

  setState() {
    this.state = {
      optionValues: {
        subscribers: [
          this.checkDecreaseButton.bind(this),
          this.changeWordForm.bind(this),
          this.changeOptionWordForm.bind(this),
        ],
      },
      optionWordForms: {},
      decreaseButtonDisabled: {},
    };
  }

  setInitialState() {
    this.checkDecreaseButton();
    this.changeWordForm();
    this.changeOptionWordForm();
  }

  checkDecreaseButton() {
    if (this.optionValues[this.INDEX] > 0) this.decreaseButtonDisabled = false;
    else this.decreaseButtonDisabled = true;
  }

  changeWordForm() {
    if (!this.VOCABULARY.WORD_FORMS) {
      this.VOCABULARY.WORD_FORMS = null;
      return false;
    }

    let n = this.optionValues[this.INDEX];
    n %= 100;

    if (n < 10 || n > 20) {
      n %= 10;

      if (n === 1) this.form = this.VOCABULARY.WORD_FORMS[0];
      else if (n > 1 && n < 5) this.form = this.VOCABULARY.WORD_FORMS[1];
      else this.form = this.VOCABULARY.WORD_FORMS[2];
    } else this.form = this.VOCABULARY.WORD_FORMS[2];

    return true;
  }

  changeOptionWordForm() {
    const forms = this.optionWordForms;
    forms[this.INDEX] = this.form;
    this.optionWordForms = forms;
  }
}

export default DropdownOptionModel;
