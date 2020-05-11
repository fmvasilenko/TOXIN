import Component from "@frontend/component";

export default class DropdownOption extends Component {

  constructor(rootElement, parent = {}, index) {
    super(parent);

    this.root = rootElement;
    this.index = index;
    this.setConsts();
    this.setInitialState();
    this.bindEventListeners();
  }

  setState() {
    this.state = {
      optionValues: {
        value: [],
        isGlobal: true
      },
      optionWordForms: {
        value: [],
        isGlobal: true
      },
      value: {
        value: 0,
        subscribers: [
          this.changeInput.bind(this),
          this.checkDecreaseButton.bind(this),
          this.changeWordForm.bind(this),
          this.changeOptionWordForm.bind(this),
          this.changeOptionValue.bind(this)
        ]
      },
      decreaseButtonDisabled: {
        value: false,
        subscribers: [
          this.toggleDecreaseButton.bind(this)
        ]
      }
    }
  }

  setConsts() {
    this.CLASSES = {
      INPUT: "drop-down__input",
      DECREASE_BUTTON: "js-drop-down__button_decrease",
      INCREASE_BUTTON: "js-drop-down__button_increase"
    }
  }

  setInitialState() {
    this.input = this.root.find(`.${this.CLASSES.INPUT}`);
    this.decreaseButton = this.root.find(`.${this.CLASSES.DECREASE_BUTTON}`);
    this.increaseButton = this.root.find(`.${this.CLASSES.INCREASE_BUTTON}`);

    let forms = this.input.attr("forms");
    this.forms = forms ? forms.split(",") : null;

    this.value = this.input.val() ? parseInt(this.input.val()) : 0;
  }

  bindEventListeners() {
    this.decreaseButton.click(this.decreaseButtonClickHandler.bind(this));
    this.increaseButton.click(this.increaseButtonClickHandler.bind(this));
  }

  decreaseButtonClickHandler() {
    if (this.value > 0) this.value--;
  }

  increaseButtonClickHandler() {
    this.value++;
  }

  changeInput() {
    this.input.val(this.value);
  }

  checkDecreaseButton() {
    if (this.value > 0) this.decreaseButtonDisabled = false;
    else this.decreaseButtonDisabled = true;
  }

  changeWordForm() {
    if (!this.forms) {
      this.form = null;
      return false;
    }

    let n = this.value;
    n %= 100;

    if(n < 10 || n > 20) {
      n %= 10;

      if(n == 1) this.form = this.forms[0];
      else if (n > 1 && n < 5) this.form = this.forms[1];
      else this.form = this.forms[2];
    }
    else this.form = this.forms[2];

    return true;
  }

  changeOptionValue() {
    let values = this.optionValues;
    values[this.index] = this.value;
    this.optionValues = values;
  }

  changeOptionWordForm() {
    let forms = this.optionWordForms;
    forms[this.index] = this.form;
    this.optionWordForms = forms;
  }

  toggleDecreaseButton() {
    if (this.decreaseButtonDisabled) this.decreaseButton.attr("disabled", true);
    else this.decreaseButton.attr("disabled", false);
  }
}