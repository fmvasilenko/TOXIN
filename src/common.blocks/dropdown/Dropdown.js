class Dropdown {
  constructor(container) {
    this.classes = require('./dropdown.classes.json');
    this.DOM = this.findDOMNodes(container);
    this.state = this.getInitialState();
    this.bindEventListeners();
  }

  findDOMNodes(container) {
    return {
      field: container.querySelector(`.${this.classes.field}`),
      list: container.querySelector(`.${this.classes.list}`),
    };
  }

  getInitialState() {
    return {
      listDropped: false,
    };
  }

  bindEventListeners() {
    this.DOM.field.addEventListener('click', this.clickHandler.bind(this));
  }

  clickHandler() {
    this.state.listDropped = !this.state.listDropped;
    this.toggleList();
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
}

export default Dropdown;
