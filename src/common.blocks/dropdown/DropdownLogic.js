/* eslint-disable class-methods-use-this */
import DropdownOption from '../dropdown-option/DropdownOption';

class DropdownLogic {
  constructor(container) {
    this.classes = require('./dropdown.classes.json');
    this.DOM = this._findDOMNodes(container);
    this.displayType = this.DOM.root.dataset.displayType;
    this.wordForms = this.DOM.input.dataset.wordForms.split(',');
    this.defaultValue = this.DOM.input.value;
    this.state = this._getInitialState();
    this.guestsNumberSubscriber = () => {};
    this._bindEventListeners();

    this.options = this._getOptions();
    this._render();
  }

  getTotalNumber() {
    return this.options.reduce((sum, option) => sum + option.getState().value, 0);
  }

  setTotalNumberSubscriber(subscriber) {
    this.guestsNumberSubscriber = subscriber;
  }

  _findDOMNodes(container) {
    return {
      root: container.querySelector(`.js-${this.classes.root}`),
      field: container.querySelector(`.js-${this.classes.field}`),
      input: container.querySelector(`.js-${this.classes.input}`),
      list: container.querySelector(`.js-${this.classes.list}`),
      clearButton: container.querySelector(`.js-${this.classes.button}[data-button-type="clearButton"]`).querySelector('button'),
      submitButton: container.querySelector(`.js-${this.classes.button}[data-button-type="submitButton"]`).querySelector('button'),
    };
  }

  _getInitialState() {
    return {
      listDropped: false,
    };
  }

  _bindEventListeners() {
    this.DOM.field.addEventListener('click', this._clickHandler.bind(this));
    this.DOM.clearButton.addEventListener('click', this._clearButtonClickHandler.bind(this));
    this.DOM.submitButton.addEventListener('click', this._closeList.bind(this));
    document.addEventListener('click', this._outOfElementClickHandler.bind(this));
  }

  _clickHandler() {
    this.state.listDropped = !this.state.listDropped;
    this._toggleList();
  }

  _clearButtonClickHandler() {
    this.options.forEach((options) => {
      options.setValue(0);
    });
  }

  _closeList() {
    this.state.listDropped = false;
    this._toggleList();
  }

  _outOfElementClickHandler(event) {
    if (!event.target.closest(`.js-${this.classes.root}`)) this._closeList();
  }

  _toggleList() {
    if (this.state.listDropped) {
      this.DOM.field.classList.add(this.classes.fieldDropped);
      this.DOM.list.classList.add(this.classes.listDropped);
    } else {
      this.DOM.field.classList.remove(this.classes.fieldDropped);
      this.DOM.list.classList.remove(this.classes.listDropped);
    }
  }

  _getOptions() {
    const options = [];

    this.DOM.list.querySelectorAll(`.${this.classes.optionContainer}`).forEach((optionContainer) => {
      options.push(new DropdownOption(optionContainer, this._optionsSubscriber.bind(this)));
    });

    return options;
  }

  _optionsSubscriber() {
    this._render();
    this.guestsNumberSubscriber(this.getTotalNumber());
  }

  _render() {
    if (this.displayType === 'total') this._renderTotal();
    else if (this.displayType === 'values') this._renderValues();

    if (this.options.reduce((sum, option) => sum + option.getState().value, 0) > 0) {
      this.DOM.clearButton.classList.remove(this.classes.buttonHidden);
    } else this.DOM.clearButton.classList.add(this.classes.buttonHidden);
  }

  _renderTotal() {
    const summary = this.options.reduce((sum, option) => (option.getState().countedSeparately ? sum : sum + option.getState().value), 0);
    let str = summary > 0 ? `${summary} ${this._getWordForm(summary)}` : '';

    this.options.forEach((option) => {
      const { countedSeparately, value, wordForm } = option.getState();
      if (countedSeparately && value > 0) {
        if (str === '') str += `${value} ${wordForm}`;
        else str += `, ${value} ${wordForm}`;
      }
    });

    this.DOM.input.value = str || this.defaultValue;
  }

  _renderValues() {
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

  _getWordForm(value) {
    if (!this.wordForms) return '';

    let n = value % 100;

    if (n < 10 || n > 20) {
      n %= 10;

      if (n === 1) return this.wordForms[0];
      if (n > 1 && n < 5) return this.wordForms[1];
    }

    return this.wordForms[2];
  }
}

export default DropdownLogic;
