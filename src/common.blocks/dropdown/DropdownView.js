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
      options: {
        subscribers: [
          this.display.bind(this),
        ],
      },
      expanded: {
        subscribers: [
          this.toggleList.bind(this),
        ],
      },
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
    let str = '';

    if (this.optionsSum) str += `${this.optionsSum} ${this.wordForm}`;

    this.options.forEach((option) => {
      if (option.countedSeparately && option.value > 0) {
        if (str !== '') str += ', ';
        str += `${option.value} ${option.wordForm}`;
      }
    });

    if (str !== '') this.DOM.INPUT.value = str;
    else this.DOM.INPUT.value = this.VOCABULARY.DEFAULT_VALUE;
  }

  displayValues() {
    let str = '';

    this.options.forEach((option) => {
      if (option.value > 0) {
        str += str !== '' ? ', ' : '';
        str += `${option.value} ${option.wordForm}`;
      }
    });

    this.DOM.INPUT.value = str;
  }

  renderClearButton() {
    if (this.displayType !== 'total') return;

    const optionsSum = this.options.reduce((sum, option) => sum + option.value, 0);

    if (optionsSum > 0) {
      this.DOM.CLEAR_BUTTON.classList.remove(this.CLASSES.BUTTON_HIDDEN);
    } else {
      this.DOM.CLEAR_BUTTON.classList.add(this.CLASSES.BUTTON_HIDDEN);
    }
  }
}

export default DropdownView;
