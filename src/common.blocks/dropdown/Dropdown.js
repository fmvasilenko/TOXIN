import DropdownOption from '../dropdown-option/DropdownOption';

class Dropdown {
  constructor(container) {
    this.classes = require('./dropdown.classes.json');
    this.DOM = this.findDOMNodes(container);
    this.displayType = this.DOM.root.dataset.displayType;
    this.wordForms = this.DOM.input.dataset.wordForms.split(',');
    this.defaultValue = this.DOM.input.value;
    this.state = this.getInitialState();
    this.guestsNumberSubscriber = () => {};
    this.bindEventListeners();

    this.options = this.getOptions();
    this.render();
  }

  getGuestsNumber() {
    return this.getTotalGuestsNumber();
  }

  setGuestsNumberSubscriber(subscriber) {
    this.guestsNumberSubscriber = subscriber;
  }

  findDOMNodes(container) {
    return {
      root: container.querySelector(`.${this.classes.root}`),
      field: container.querySelector(`.${this.classes.field}`),
      input: container.querySelector(`.${this.classes.input}`),
      list: container.querySelector(`.${this.classes.list}`),
      clearButton: container.querySelector(`.${this.classes.button}[data-button-type="clearButton"]`).querySelector('button'),
      submitButton: container.querySelector(`.${this.classes.button}[data-button-type="submitButton"]`).querySelector('button'),
    };
  }

  getInitialState() {
    return {
      listDropped: false,
    };
  }

  bindEventListeners() {
    this.DOM.field.addEventListener('click', this.clickHandler.bind(this));
    this.DOM.clearButton.addEventListener('click', this.clearButtonClickHandler.bind(this));
    this.DOM.submitButton.addEventListener('click', this.closeList.bind(this));
    document.addEventListener('click', this.outOfElementClickHandler.bind(this));
  }

  clickHandler() {
    this.state.listDropped = !this.state.listDropped;
    this.toggleList();
  }

  clearButtonClickHandler() {
    this.options.forEach((options) => {
      options.setValue(0);
    });
  }

  closeList() {
    this.state.listDropped = false;
    this.toggleList();
  }

  outOfElementClickHandler(event) {
    if (!event.target.closest(`.${this.classes.root}`)) this.closeList();
  }

  toggleList() {
    if (this.state.listDropped) {
      this.DOM.field.classList.add(this.classes.fieldDropped);
      this.DOM.list.classList.add(this.classes.listDropped);
    } else {
      this.DOM.field.classList.remove(this.classes.fieldDropped);
      this.DOM.list.classList.remove(this.classes.listDropped);
    }
  }

  getOptions() {
    const options = [];

    this.DOM.list.querySelectorAll(`.${this.classes.optionContainer}`).forEach((optionContainer) => {
      options.push(new DropdownOption(optionContainer, this.optionsSubscriber.bind(this)));
    });

    return options;
  }

  optionsSubscriber() {
    this.render();
    this.guestsNumberSubscriber(this.getTotalGuestsNumber());
  }

  render() {
    if (this.displayType === 'total') this.renderTotal();
    else if (this.displayType === 'values') this.renderValues();

    if (this.options.reduce((sum, option) => sum + option.getState().value, 0) > 0) {
      this.DOM.clearButton.classList.remove(this.classes.buttonHidden);
    } else this.DOM.clearButton.classList.add(this.classes.buttonHidden);
  }

  renderTotal() {
    const summary = this.options.reduce((sum, option) => (option.getState().countedSeparately ? sum : sum + option.getState().value), 0);
    let str = summary > 0 ? `${summary} ${this.getWordForm(summary)}` : '';

    this.options.forEach((option) => {
      const { countedSeparately, value, wordForm } = option.getState();
      if (countedSeparately && value > 0) {
        if (str === '') str += `${value} ${wordForm}`;
        else str += `, ${value} ${wordForm}`;
      }
    });

    this.DOM.input.value = str || this.defaultValue;
  }

  renderValues() {
    let str = '';

    this.options.forEach((option) => {
      const { value, wordForm } = option.getState();
      if (value > 0) {
        if (str === '') str += `${value} ${wordForm}`;
        else str += `, ${value} ${wordForm}`;
      }
    });

    this.DOM.input.value = str || this.defaultValue;
  }

  getWordForm(value) {
    if (!this.wordForms) return '';

    let n = value % 100;

    if (n < 10 || n > 20) {
      n %= 10;

      if (n === 1) return this.wordForms[0];
      if (n > 1 && n < 5) return this.wordForms[1];
    }

    return this.wordForms[2];
  }

  getTotalGuestsNumber() {
    return this.options.reduce((sum, option) => sum + option.getState().value, 0);
  }
}

export default Dropdown;
