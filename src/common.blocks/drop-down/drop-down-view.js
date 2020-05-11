import ComponentView from "@frontend/componentView";

export default class DropdownView extends ComponentView {

  constructor(controller) {
    super(controller);

    this.CLASSES = this.CONTROLLER.CLASSES;
    this.DOM = this.CONTROLLER.DOM;
    this.VOCABULARY = this.CONTROLLER.VOCABULARY;

    this.setInitialState();
  }

  setState() {
    this.state = {
      expanded: {
        subscribers: [
          this.toggleList.bind(this)
        ]
      },
      optionValues: {
        subscribers: [
          this.display.bind(this)
        ]
      },
      optionWordForms: {},
      displayType: {},
      optionsSum: {},
      wordForm: {}
    }
  }

  setInitialState() {
    this.display();
  }

  toggleList() {
    if (this.expanded) {
      this.DOM.LIST.addClass(this.CLASSES.LIST_DROPPPED);
      this.DOM.FIELD.addClass(this.CLASSES.FIELD_DROPPED);
    }
    else {
      this.DOM.LIST.removeClass(this.CLASSES.LIST_DROPPPED);
      this.DOM.FIELD.removeClass(this.CLASSES.FIELD_DROPPED);
    }
  }

  display() {
    switch (this.displayType) {
      case "total": {
        this.displayTotal();
        break;
      }
      case "values": {
        this.displayValues();
        break;
      }
    }
  }

  displayTotal() {
    if (this.optionsSum) this.DOM.INPUT.val(`${this.optionsSum} ${this.wordForm}`);
    else this.DOM.INPUT.val(this.VOCABULARY.DEFAULT_VALUE);
  }

  displayValues() {
    let str = "";

    this.optionValues.forEach( function(value, index) {
      if (value > 0) {
        str += str !== "" ? ", " : "";
        str += `${value} ${this.optionWordForms[index]}`;
      }
    }.bind(this));

    this.DOM.INPUT.val(str);
  }

}