import ComponentView from "@frontend/componentView";

export default class DropdownOptionView extends ComponentView {

  constructor(controller) {
    super(controller);

    this.INDEX = this.CONTROLLER.INDEX;
    this.CLASSES = this.CONTROLLER.CLASSES;
    this.DOM = this.CONTROLLER.DOM;
    this.VOCABULARY = this.CONTROLLER.VOCABULARY;
  }

  setState() {
    this.state = {
      optionValues: {
        subscribers: [
          this.changeInput.bind(this)
        ]
      },
      decreaseButtonDisabled: {
        subscribers: [
          this.toggleDecreaseButton.bind(this)
        ]
      }
    }
  }

  changeInput() {
    this.DOM.INPUT.val(this.optionValues[this.INDEX]);
  }

  toggleDecreaseButton() {
    if (this.decreaseButtonDisabled) this.DOM.DECREASE_BUTTON.attr("disabled", true);
    else this.DOM.DECREASE_BUTTON.attr("disabled", false);
  }

}