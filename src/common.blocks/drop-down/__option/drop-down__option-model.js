import ComponentModel from "@frontend/componentModel";

export default class DropdownOptionModel extends ComponentModel {

  constructor(controller) {
    super(controller);

    this.VOCABULARY = this.CONTROLLER.VOCABULARY;
    this.INDEX = this.CONTROLLER.INDEX;
    this.setInitialState();
  }

  setState() {
    this.state = {
      optionValues: {},
      optionWordForms: {},
      value: {
        subscribers: [
          this.checkDecreaseButton.bind(this),
          this.changeWordForm.bind(this),
          this.changeOptionWordForm.bind(this),
          this.changeOptionValue.bind(this)
        ]
      },
      decreaseButtonDisabled: {}
    }
  }

  setInitialState() {
    this.checkDecreaseButton();
    this.changeWordForm();
    this.changeOptionWordForm();
    this.changeOptionValue();
  }

  checkDecreaseButton() {
    if (this.value > 0) this.decreaseButtonDisabled = false;
    else this.decreaseButtonDisabled = true;
  }

  changeWordForm() {
    if (!this.VOCABULARY.WORD_FORMS) {
      this.VOCABULARY.WORD_FORMS = null;
      return false;
    }

    let n = this.value;
    n %= 100;

    if(n < 10 || n > 20) {
      n %= 10;

      if(n == 1) this.form = this.VOCABULARY.WORD_FORMS[0];
      else if (n > 1 && n < 5) this.form = this.VOCABULARY.WORD_FORMS[1];
      else this.form = this.VOCABULARY.WORD_FORMS[2];
    }
    else this.form = this.VOCABULARY.WORD_FORMS[2];

    return true;
  }

  changeOptionValue() {
    let values = this.optionValues;
    values[this.INDEX] = this.value;
    this.optionValues = values;
  }

  changeOptionWordForm() {
    let forms = this.optionWordForms;
    forms[this.INDEX] = this.form;
    this.optionWordForms = forms;
  }

}