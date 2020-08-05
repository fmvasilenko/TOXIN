import ComponentView from '@frontend/ComponentView';

class DropdownView extends ComponentView {
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
          this.toggleList.bind(this),
        ],
      },
      optionValues: {
        subscribers: [
          this.display.bind(this),
        ],
      },
      optionWordForms: {},
      displayType: {},
      optionsSum: {
        subscribers: [
          this.renderClearButton.bind(this),
        ],
      },
      wordForm: {},
    };
  }

  setInitialState() {
    this.display();
    this.renderClearButton();
  }

  toggleList() {
    if (this.expanded) {
      this.DOM.LIST.classList.add(this.CLASSES.LIST_DROPPPED);
      this.DOM.FIELD.classList.add(this.CLASSES.FIELD_DROPPED);
    } else {
      this.DOM.LIST.classList.remove(this.CLASSES.LIST_DROPPPED);
      this.DOM.FIELD.classList.remove(this.CLASSES.FIELD_DROPPED);
    }
  }

  display() {
    switch (this.displayType) {
      case 'total': {
        this.displayTotal();
        break;
      }
      case 'values': {
        this.displayValues();
        break;
      }
      default: {
        this.displayTotal();
      }
    }
  }

  displayTotal() {
    if (this.optionsSum) this.DOM.INPUT.value = `${this.optionsSum} ${this.wordForm}`;
    else this.DOM.INPUT.value = this.VOCABULARY.DEFAULT_VALUE;
  }

  displayValues() {
    let str = '';

    this.optionValues.forEach((value, index) => {
      if (value > 0) {
        str += str !== '' ? ', ' : '';
        str += `${value} ${this.optionWordForms[index]}`;
      }
    });

    this.DOM.INPUT.value = str;
  }

  renderClearButton() {
    if (this.displayType !== 'total') return;

    if (this.optionsSum > 0) {
      this.DOM.CLEAR_BUTTON.classList.remove(this.CLASSES.BUTTON_HIDDEN);
    } else {
      this.DOM.CLEAR_BUTTON.classList.add(this.CLASSES.BUTTON_HIDDEN);
    }
  }
}

export default DropdownView;
