class DropdownOption {
  constructor(container, valueOnChangeFunction = () => {}) {
    this.classes = require('./dropdown-option.classes.json');
    this.DOM = this._findDOMNodes(container);
    this.wordForms = this.DOM.root.dataset.wordForms.split(',');
    this.state = this._getInitialState();
    this._bindEventListeners();
    this.valueOnChangeFunction = valueOnChangeFunction;
  }

  setValue(value) {
    if (value >= 0) {
      this.state.value = value;
      this.state.wordForm = this._getWordForm(this.state.value);
      this.valueOnChangeFunction(this.state);
      this._render();
    }
  }

  getState() {
    return this.state;
  }

  _findDOMNodes(container) {
    return {
      root: container.querySelector(`.js-${this.classes.root}`),
      input: container.querySelector(`.js-${this.classes.input}`),
      decreaseButton: container.querySelector(`.js-${this.classes.button}[name="decreaseButton"]`),
      increaseButton: container.querySelector(`.js-${this.classes.button}[name="increaseButton"]`),
    };
  }

  _getInitialState() {
    return {
      value: parseInt(this.DOM.input.value, 10),
      wordForm: this._getWordForm(parseInt(this.DOM.input.value, 10)),
      countedSeparately: this.DOM.root.getAttribute('data-counted-separately') === 'true',
    };
  }

  _bindEventListeners() {
    this.DOM.decreaseButton.addEventListener('click', this._decreaseButtonClickHandler.bind(this));
    this.DOM.increaseButton.addEventListener('click', this._increaseButtonClickHandler.bind(this));
  }

  _decreaseButtonClickHandler() {
    if (this.state.value > 0) this.state.value -= 1;
    this.state.wordForm = this._getWordForm(this.state.value);
    this.valueOnChangeFunction(this.state);
    this._render();
  }

  _increaseButtonClickHandler() {
    this.state.value += 1;
    this.state.wordForm = this._getWordForm(this.state.value);
    this.valueOnChangeFunction(this.state);
    this._render();
  }

  _render() {
    this.DOM.input.value = this.state.value;
    if (this.state.value === 0) this.DOM.decreaseButton.disabled = true;
    else this.DOM.decreaseButton.disabled = false;
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

export default DropdownOption;
